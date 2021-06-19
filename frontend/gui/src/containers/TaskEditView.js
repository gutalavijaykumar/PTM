import React from 'react';
import TaskForm from '../components/Form'

class TaskEdit extends React.Component{
    projectID = this.props.match.params.projectID;

    render() {
        return (
            <div>
                <TaskForm 
                requestType="put"
                projectID={this.projectID} required={false} />
            </div>
            
        )
    }
}

export default TaskEdit;