import React from 'react';
import ProjectForm from '../components/Form'

class ProjectCreate extends React.Component{

    render() {
        return (
            <div>
                <ProjectForm 
                requestType="post" projectID="null" />
            </div>
            
        )
    }
}

export default ProjectCreate;