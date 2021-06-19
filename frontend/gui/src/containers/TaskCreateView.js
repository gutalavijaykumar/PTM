import React from 'react';
import TaskForm from '../components/TaskForm'

class TaskCreate extends React.Component{
    
    state = {
        projectID: []
    };

    componentDidMount(){
        const projectID = this.props.match.params.projectID
        this.setState({
            projectID: projectID
        });        
    };

    render() {
        return (
            <div>
                <TaskForm  requestType="post" projectId={this.state.projectID[0]}  />
            </div>
            
        )
    }
}

export default TaskCreate;