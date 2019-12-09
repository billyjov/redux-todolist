import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchTasks } from '../../actions/task';

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

export default connect(mapStateToProps, { fetchTasks })(ListTasks);
