import React from 'react';
import axios from 'axios';
import Project from '../components/Project';
import ProjectForm from '../components/Form'

class ProjectDetail extends React.Component{

    state = {
        project: []
    };

    componentDidMount(){
        const projectID = this.props.match.params.projectID
        axios.get(`http://127.0.0.1:8000/project/${projectID}/`)
        .then( res => {
            this.setState({
                project: res.data
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
                <Project data={[this.state.project]} />
            </div>
            
        )
    }
}

export default ProjectDetail;