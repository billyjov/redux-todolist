import {
    ADD_TASK, GET_ALL_TASKS
} from '../constants/action-types';

export default (state = {}, action) => {
    console.log('action type =>', action.type)
    switch (action.type) {
        case ADD_TASK:

            return {
                ...state
            };
        case GET_ALL_TASKS:
            return {
                data: action.payload
            };

        default:
            return state;
    }
}


