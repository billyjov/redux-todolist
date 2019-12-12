import React, { Component } from 'react';
import { connect } from 'react-redux';
import taskService from '../../config';

import { fetchTasks } from '../../actions/task';
import { EDIT_TASKS } from '../../constants/action-types';

class ListTasks extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchTasks();
    }

    render() {
        return (
            <table className="table table-striped mt-5">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Remove</th>
                    </tr>
                </thead>
                <tbody>
                
                    {
                       this.props.data ?
                        this.props.data.map(task => {
                            return (
                                <tr key={task.id}>
                                    <th scope="row">{task.id}</th>
                                    <td>{task.title}</td>
                                    <td>
                                        <button className="btn btn-info" onClick={(e) => this.props.editTask(task, e, this.props.data)}>Edit</button>
                                    </td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => this.props.removeTask(task)}>Remove</button>
                                    </td>
                                </tr>
                            )
                        }) : <tr><td>List is empty</td></tr>
                    }

                </tbody>
            </table>
        );
    }
}

const mapStateToProps = (state= {}) => ({
    data: state.task.data
})

const mapDispatchProps = (dispatch) => ({
    fetchTasks: () => {
        dispatch(fetchTasks())
    },
    editTask: (task, event, data) => {
        dispatch({ type: EDIT_TASKS, payload: task, data: data })
    },
    removeTask: async (task) => {
        const res = await taskService.Tasks.delete(task.id);
        if (res) {
            dispatch(fetchTasks())
        }
    }
})

export default connect(mapStateToProps, mapDispatchProps)(ListTasks);
