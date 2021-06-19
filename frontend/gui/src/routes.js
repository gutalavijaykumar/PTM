import React from 'react';
import { Route } from 'react-router-dom'
import ProjectList from './containers/ProjectListView';
import ProjectDetail from './containers/ProjectDetailView';
import ProjectCreate from './containers/ProjectCreateView';
import ProjectEdit from './containers/ProjectEditView';
import Home from './containers/Home';
import TaskDetail from './containers/TaskDetailView';
import TaskEdit from './containers/TaskEditView';
import TaskCreate from './containers/TaskCreateView';

const BaseRouter = () => {
    return (
        <div>
            <Route exact path='/' component={Home} />
            <Route exact path='/projects' component={ProjectList} />
            <Route exact path='/project/create/' component={ProjectCreate} />
            <Route exact path='/project/:projectID' component={ProjectDetail} />
            <Route exact path='/project/:projectID/edit' component={ProjectEdit} />
            <Route exact path='/project/:projectID/task/create' component={TaskCreate} />
            <Route exact path='/project/:projectID/task/:taskID' component={TaskDetail} />
            <Route exact path='/project/:projectID/task/:taskID/edit' component={TaskEdit} />


        </div>
    );

};

export default BaseRouter;