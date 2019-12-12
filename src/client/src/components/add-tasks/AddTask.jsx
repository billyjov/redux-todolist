import React, { Component } from 'react'
import { connect } from 'react-redux';

import taskService from '../../config';
import {
    UPDATE_FIELD_TASK, ADD_TASK
} from '../../constants/action-types';
import { fetchTasks } from '../../actions/task';

const mapStateToProps = state => ({ ...state.task });
const mapDispatchProps = (dispatch) => ({
    onChangeTitle: value =>
        dispatch({ type: UPDATE_FIELD_TASK, key: 'title', value }),
    onSubmit: async (title, actualState) => {
        const res = await taskService.Tasks.create({ title });
        // NOT a best practice yet
        const payload = [...actualState, res.response];
        dispatch({ type: ADD_TASK, payload })
    },
    onSubmitEdit: async (title, id) => {
        const task = { title, id };
        const res = await taskService.Tasks.update(task);
        if (res) {
            dispatch(fetchTasks())
        }
    }
})


class AddTask extends Component {

    state = {};

    constructor(props) {
        super(props)
        this.changeTitle = ev => {
            this.setState({
                title: ev.target.value
            })
        }
        this.submitForm = (title) => ev => {
            ev.preventDefault();
            this.props.onSubmit(title, this.props.data);
        }
        this.state = this.props;
    }

    componentWillReceiveProps(props) {
        if (props.taskToEdit) {
            this.setState({
                id: props.taskToEdit.id,
                title: props.taskToEdit.title,
                data: props.data
            })
        }
    }

    render() {
        const title = this.props.title;

        return (
            <form onSubmit={this.submitForm(title)}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder="title of task"
                        value={this.state.title}
                        onChange={(e) => this.changeTitle(e)}
                    />
                </div>
                <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary">Save Task</button>
                <button onClick={() => this.props.onSubmitEdit(this.state.title, this.state.id, this.state.data)} className="btn btn-warning ml-5">Update Task</button>
            </form>
        )
    }
}


export default connect(mapStateToProps, mapDispatchProps)(AddTask)
