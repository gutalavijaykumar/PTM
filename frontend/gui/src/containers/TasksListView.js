import React from 'react';
import axios from 'axios';
import Project from '../components/Project';
import Task from '../components/Tasks'
import ProjectForm from '../components/Form';
import { Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Link, Switch } from 'react-router-dom';

class TaskList extends React.Component{

    state = {
        projects: []
    };

    componentDidMount(){
    axios.get(`http://127.0.0.1:8000/project/:projectID/task`)
    .then( res => {
        this.setState({
            tasks: res.data
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
                        Add Task
                    </Button>
                </Link>   
                </div>
                <Task data={this.state.projects} />
            </div>
        )
    }
}

export default TaskList;