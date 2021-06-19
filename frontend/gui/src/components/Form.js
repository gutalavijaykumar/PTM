import React, { useState, useEffect } from 'react';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { Form, Input, InputNumber, Button, Upload } from 'antd';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import Project from './Project';

const FormItem = Form.Item;

class ProjectForm extends React.Component {

    handleFormSubmit = (values, requestType, projectID=null) => {
        console.log(values)
        switch (requestType) {
            case 'post':
                axios.post('http://127.0.0.1:8000/project/create/',{
                    name : values.projectname,
                    description : values.description,
                    avatar : values.avatar,
                    duration : values.duration
                }, {headers: {'content-type': 'application/json'}})
                .then(res=> {
                    console.log(res);
                    <Route exact path="/">
                    {res ? <Redirect to="/projects" /> : <Project />}
                  </Route>
                })
                .catch(err => console.log(err))

            case 'put':
                axios.put(`http://127.0.0.1:8000/project/${projectID}/update/`,{
                    name : values.projectname,
                    description : values.description,
                    avatar : values.avatar,
                    duration : values.duration
                })
                .then(res=> {
                    console.log(res);
                    <Route exact path="/">
                    {res ? <Redirect to="/projects" /> : <Project />}
                  </Route>
                })
                .catch(err => console.log(err))
            }
            alert('Form was submitted');
        }

    normFile = (e) => {
        console.log('Upload event:', e);
      
        if (Array.isArray(e)) {
          return e;
        }
      
        return e && e.fileList;
      };

    formItemLayout = {
        labelCol: {
          span: 6,
        },
        wrapperCol: {
          span: 14,
        },
      };

      
    render() {
        return (
            <div>
                <Form
                    name="project_form"
                    // onSubmit={this.handleFormSubmit}
                    {...this.formItemLayout}
                    onFinish={ (event) => this.handleFormSubmit(
                        event,
                        this.props.requestType,
                        this.props.projectID)
                    }
                >
                <FormItem
                    label="Project Name"
                    rules={[
                    {
                        required: true,
                        message: 'Please enter a project name',
                    },
                    ]}
                    name="projectname"
                >
                    <Input placeholder="Enter project name here" />
                </FormItem>

                <FormItem
                    label="Description"
                    rules={[
                    {
                        required: true,
                        message: 'Please add a short description',
                    },
                    ]}
                    name="description"
                >
                    <Input.TextArea placeholder="Enter description of project here."  />
                </FormItem>

                <Form.Item
                    name="avatar"
                    label="Upload Project Avatar "
                >
                    <Upload name="logo" listType="picture">
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                </Form.Item>

                <Form.Item name="duration" label="Duration in Days." rules={[{ type: 'number', min: 0, max: 99 }]}>
                    <InputNumber  />
                </Form.Item>

                <FormItem>
                    <Button type="primary" htmlType="submit">
                    Submit
                    </Button>
                </FormItem>

                </Form>
            </div>
        )
    }
};

export default ProjectForm;
