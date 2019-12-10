import React, { Component } from 'react'
import { connect } from 'react-redux';

import taskService from '../../config';
import {
    UPDATE_FIELD_TASK, ADD_TASK
} from '../../constants/action-types';

const mapStateToProps = state => ({ ...state.task });
const mapDispatchProps = (dispatch) => ({
    onChangeTitle: value =>
        dispatch({ type: UPDATE_FIELD_TASK, key: 'title', value }),
    onSubmit: async (title, actualState) => {
        const res = await taskService.Tasks.create({ title });
        // NOT a best practice yet
        const payload = [...actualState, res.response];
        dispatch({ type: ADD_TASK, payload })
    }
})


class AddTask extends Component {

    constructor(props) {
        super(props)
        this.changeTitle = ev => this.props.onChangeTitle(ev.target.value);
        this.submitForm = (title) => ev => {
            ev.preventDefault();
            this.props.onSubmit(title, this.props.data);
        }
    }

    render() {
        console.log('props: ', this.props)
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
                        value={this.props.title}
                        onChange={this.changeTitle}
                    />
                </div>
                <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary">Save Task</button>
            </form>
        )
    }
}


export default connect(mapStateToProps, mapDispatchProps)(AddTask)
