import React, { Component} from 'react';
import {connect} from 'react-redux';
import * as actions from  './../actions/index';
class TaskForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            id : '',
            name : '',
            status : false
        }
    }

    componentDidMount(){
        if(this.props.itemEdit && this.props.itemEdit.id !== null){
            this.setState({
                id : this.props.itemEdit.id,
                name : this.props.itemEdit.name,
                status : this.props.itemEdit.status,
            });
        }else{
            this.onClear();
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.itemEdit){
            this.setState({
                id : nextProps.itemEdit.id,
                name : nextProps.itemEdit.name,
                status : nextProps.itemEdit.status,
            });
        }
        else{
            this.onClear();
        }
    }

    onClose = () => {
        this.props.onCloseForm();
    }

    onClear = () => {
        this.setState({
            id: '',
            name : '',
            status : false
        });
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if(name === 'status'){
            value = target.value === 'true' ? true : false;
        }
        this.setState ({
            [name] : value  
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onAddTask(this.state);
        this.onCancel();
        this.onClose();
    }

    onCancel = () => {
        this.setState({
            name: '',
            status : false
        })
    }


    render() {
    var {id} = this.state;
    if(!this.props.isDisplayForm) return '';
    return (
        <div className="panel panel-warning">
            <div className="panel-heading">
                <h3 className="panel-title">
                    { id !== '' ? 'Edit Work' : 'Add Work'}
                </h3>
                <span 
                    className="fa fa-camera-retro"
                    onClick = {this.onClose}
                >
                </span>
            </div>
            <div className="panel-body">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name :</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="name"
                            value = {this.state.name}
                            onChange = {this.onChange}
                        />
                    </div>
                    <label>Status :</label>
                    <select 
                        className="form-control" 
                        required="required"
                        name = "status"
                        value= {this.state.status}
                        onChange = {this.onChange}
                    >
                        <option value={true}>Active</option>
                        <option value={false}>Non Active</option>
                    </select>
                    <br/>
                    <div className="text-center">
                        <button type="submit" className="btn btn-warning">Add</button>&nbsp;
                        <button type="submit" className="btn btn-danger" onClick = {this.onCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        isDisplayForm : state.isDisplayForm,
        itemEdit : state.itemEdit
    }
};

const mapDispatchtoProps = (dispatch, props) => {
    return {
        onAddTask : (task) => {
            dispatch(actions.addTask(task));
        },
        onCloseForm : () => {
            dispatch(actions.closeForm());
        },
    }
}
export default connect(mapStateToProps,mapDispatchtoProps)(TaskForm);
