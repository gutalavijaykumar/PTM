import React, { useState, useEffect } from 'react';
import { UploadOutlined, InboxOutlined, DownOutlined  } from '@ant-design/icons';
import { Form, Input, InputNumber, Button, Upload, DatePicker, Select } from 'antd';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import Project from './Project';

const FormItem = Form.Item;
const dateFormat = 'MM/DD/YYYY';

class TaskForm extends React.Component {
    
    handleFormSubmit = (values, requestType, projectID=null, taskID=null) => {
        console.log(values)
        switch (requestType) {
            case 'post':
                axios.post(`http://127.0.0.1:8000/project/${projectID}/task/create`,{
                    name : values.taskname,
                    description : values.description,
                    start_date : values.start_date,
                    end_date : values.end_date,
                    project: projectID
                })
                .then(res=> {
                    console.log(res);
                })
                .catch(err => console.log(err))

            case 'put':
                axios.put(`http://127.0.0.1:8000/project/${projectID}/task/${taskID}update/`,{
                    name : values.taskname,
                    description : values.description,
                    start_date : values.start_date,
                    end_date : values.end_date,
                    project: projectID
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
                    name="task-form"
                    // onSubmit={this.handleFormSubmit}
                    {...this.formItemLayout}
                    onFinish={ (event) => this.handleFormSubmit(
                        event,
                        this.props.requestType,
                        this.props.projectID)
                    }
                >
                <FormItem
                    label="Task Name"
                    rules={[
                    {
                        required: true,
                        message: 'Please enter a task name',
                    },
                    ]}
                    name="taskname"
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
                    <Input.TextArea placeholder="Enter description of Task here."  />
                </FormItem>

                <Form.Item
                    name="start_date"
                    label="Pick Start Date ">
                <DatePicker defaultValue={''} format={dateFormat} />
                </Form.Item>

                <Form.Item
                    name="end_date"
                    label="Pick End Date ">
                <DatePicker defaultValue={''} format={dateFormat} />
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

export default TaskForm;
