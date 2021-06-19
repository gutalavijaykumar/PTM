import React from 'react';
import ProjectForm from '../components/Form'

class ProjectEdit extends React.Component{
    projectID = this.props.match.params.projectID;

    render() {
        return (
            <div>
                <ProjectForm 
                requestType="put"
                projectID={this.projectID} required={false} />
            </div>
            
        )
    }
}

export default ProjectEdit;