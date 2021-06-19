import React from 'react';
import axios from 'axios';
import Tasks from '../components/Tasks'

class TaskDetail extends React.Component{

    state = {
        task: []
    };

    componentDidMount(){
        const projectID = this.props.match.params.projectID
        const taskID = this.props.match.params.taskID

        axios.get(`http://127.0.0.1:8000/project/${projectID}/task/${taskID}`)
        .then( res => {
            this.setState({
                task: res.data
            });
            console.log(res)
        })
        .catch( err => {
            console.log(err)
        })
        
    };


    render() {
        return (
            <div>
                <Tasks data={[this.state.task]} />
            </div>
            
        )
    }
}

export default TaskDetail;