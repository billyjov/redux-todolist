import {
    ADD_TASK, GET_ALL_TASKS, UPDATE_FIELD_TASK, EDIT_TASKS
} from '../constants/action-types';

export default (state = {}, action) => {
    console.log('action type =>', action.type)
    console.log('state =>', state)
    // TODO make state always available
    switch (action.type) {
        case ADD_TASK:

            return {
                data: action.payload
            };
        case GET_ALL_TASKS:
            return {
                data: action.payload
            };
        case UPDATE_FIELD_TASK:
            return {
                [action.key]: action.value
            };
        case EDIT_TASKS: 
            return {
                data: action.data,
                taskToEdit: action.payload
            }

        default:
            return state;
    }
}


