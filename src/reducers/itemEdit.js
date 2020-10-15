import * as types from './../constains/actionType';

var initialState = {

};

var myReducer = (state = initialState , action) => {
    switch(action.type){
        case types.EDIT_ITEM :
            return action.task;
        default: return state;
    }
}

export default myReducer;
