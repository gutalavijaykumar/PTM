import React from 'react';
import axios from 'axios';
import Project from '../components/Project';
import ProjectForm from '../components/Form';
import { Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Link, Switch } from 'react-router-dom';

class ProjectList extends React.Component{

    state = {
        projects: []
    };

    componentDidMount(){
    axios.get("http://127.0.0.1:8000/project/")
    .then( res => {
        this.setState({
            projects: res.data
        });
        console.log(res.data)
    })
    };


    render() {
        return (
            <div>
                <div class="new-project">
                <Link to={`project/create`}>
                    <Button type="primary" icon={<PlusCircleOutlined />} size={"large"}>
                        Add Project
                    </Button>
                </Link>   
                </div>
                <Project data={this.state.projects} />
            </div>
        )
    }
}

export default ProjectList;