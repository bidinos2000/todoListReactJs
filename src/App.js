import React, { Component} from 'react';
import './App.css';
import TaskForm from './component/TaskForm';
import Control from './component/Control';
import TaskList from './component/TaskList';
import {connect} from 'react-redux';
import * as actions from './actions/index';
class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            taskEdit : null,
            filter : {
                name : '',
                status : -1
            },
            keyWord : '',
            sortBy : 'name',
            sortValue : 1
        }
    }

    onAddWord = () =>{// add work
        this.props.onToggleForm();
    }

    // onEdit = (idTask) => {
    //     //show form add work
    //     this.setState({
    //         isDisplayForm : true
    //     });
    //     //get infor work edit
    //     var index = this.findIndex(idTask);
    //     var {tasks} = this.state;
    //     var infor = tasks[index];
    //     this.setState({
    //         taskEdit : infor
    //     });
    // }

    onFilter = (filterName, filterStatus) => {
        filterStatus = parseInt(filterStatus);
        this.setState({
            filter : {
                name : filterName.toLowerCase(),
                status : filterStatus
            }
        });
    }

    onSearch = (keyWords) => {
        var key = keyWords;
        this.setState({
            keyWord : key
        });
    }

    onSort = (sortBy, sortValue) => {
        this.setState({
            sortBy : sortBy,
            sortValue : sortValue
        });
    }

    render() {
        var {
            // filter , 
            // keyWord,
            sortBy,
            sortValue
        } = this.state;

        var {isDisplayForm} = this.props
        // if(filter){
        //     if(filter.name){
        //         tasks = tasks.filter((task)=>{
        //             return task.name.toLowerCase().indexOf(filter.name) !== -1;
        //         });
        //     }
            // tasks = tasks.filter((task) => {
            //     if(filter.status === -1){
            //         return task; 
            //     }else{
            //         return task.status === (filter.status === 1 ? true : false);
            //     }
            // });
        // }
        // if(keyWord){
        //     tasks = tasks.filter((task)=>{
        //         return task.name.toLowerCase().indexOf(keyWord) !== -1;
        //     });
        // }

        // if(sortBy === 'name'){
        //     tasks.sort((a,b) => {
        //         if(a.name > b.name) return sortValue;
        //         else if(a.name < b.name) return -sortValue;
        //         else return 0;
        //     });
        // }else{
        //     tasks.sort((a,b) => {
        //         if(a.status > b.status) return -sortValue;
        //         else if(a.status < b.status) return sortValue;
        //         else return 0;
        //     });
        // }
    return (
        <div className="container">
        <div className="text-center">
            <h1>Quản Lý Công Việc</h1>
            <hr/>
        </div>
        <div className="row">
            <div className={isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''}>
            <TaskForm />
            </div>
            <div className={ isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
                <button 
                    type="button" 
                    className="btn btn-primary btn-mb"
                    onClick = {this.onAddWord}
                >
                    <span className="fa fa-plus mr-5"></span>Thêm Công Việc
                </button>
                <Control
                    onSearch = {this.onSearch}
                    onSort = {this.onSort}
                    sortBy = {sortBy}
                    sortValue = {sortValue}
                />
                <div className="row mt-15">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <TaskList
                            onFilter = {this.onFilter}
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        isDisplayForm : state.isDisplayForm
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onToggleForm : () => {
            dispatch(actions.toogleForm());
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
