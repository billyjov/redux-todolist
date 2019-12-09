import {
   GET_ALL_TASKS
} from '../constants/action-types';
import axios from 'axios';
import { API_ROOT } from '../config';

export function fetchTasks() {
    return (dispatch) => {
        return axios.get(`${API_ROOT}/tasks`).then(({ data }) => {
            dispatch(setTaskDetails(data))
        })
    }
}

function setTaskDetails(data) {
    console.log('data sucessfully fetched: ', data)
    return {
        type: GET_ALL_TASKS,
        payload: data
    }
}
