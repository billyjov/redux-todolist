import axios from 'axios';

export const API_ROOT = 'http://localhost:2000/api'

const requests = {
    del: url =>
        axios.delete(`${API_ROOT}${url}`).then(res => res),
    get: url =>
        axios.get(`${API_ROOT}${url}`).then(res => res),
    put: (url, body) =>
        axios.put(`${API_ROOT}${url}`, body).then(res => res),
    post: (url, body) =>
        axios.post(`${API_ROOT}${url}`, body).then(res => res.data)
};

const Tasks = {
    getAll: () =>
        requests.get('/tasks'),
    getById: (taskId) =>
        requests.get(`/tasks/${taskId}`),
    create: (task) =>
        requests.post('/tasks', task),
    update: (task) =>
        requests.put(`/tasks/${task.id}`, task),
    delete: (taskId) =>
        requests.del(`/tasks/${taskId}`),
};


export default { Tasks }
