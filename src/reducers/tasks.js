import * as types from './../constains/actionType';
var data = JSON.parse(localStorage.getItem('tasks'));
var initialState = data ? data : [];


var s4 = () => {
    return Math.floor((1+ Math.random()) * 0x10000).toString(16).substring(1);
}

var generateId = () => {
    return s4() + s4() + '-' + s4() + '-' + s4() + s4() + '-' + s4()
}

var findIndex = (id, tasks) => {
    var result = -1;
    tasks.forEach((task, index) => {
        if(task.id === id){
            result = index;
        }
    });
    return result;
}

var id = '';
var index = - 1;
var myReducer = (state = initialState , action) => {
    switch(action.type){
        case types.LIST_ALL:
            return state;
        case types.ADD_TASK:
            var task = {
                id : generateId(),
                name : action.task.name,
                status : action.task.status === 'true' ? true : false
            }
            index = findIndex(task.id,state)
            if(!task.id){
                task.id = generateId();
                state.push(task);
            }else{
                id = task.id;
                index = findIndex(id,state);
                console.log(index);
            }
            localStorage.setItem('tasks',JSON.stringify(state));
            return [...state];
        case types.UPDATE_STATUS :
            id = action.id;
            index = findIndex(id,state);
            state[index] = {
                ...state[index],
                status : !state[index].status
            }
            localStorage.setItem('tasks',JSON.stringify(state));
            return [...state];
        case types.DELETE_TASK :
            id = action.id;
            index = findIndex(id, state);
            state.splice(index, 1);
            localStorage.setItem('tasks',JSON.stringify(state));
            return [...state];
        
        default: return state;
    }
}

export default myReducer;