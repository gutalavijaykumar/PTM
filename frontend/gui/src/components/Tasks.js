import React from 'react';
import axios from 'axios';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Link, Switch, Redirect, Route } from 'react-router-dom';
import { List, Avatar, Button, Skeleton, Modal } from 'antd';

function Tasks(props) {

    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [modalText, setModalText] = React.useState('Are you Sure, deleting this Project');
    const tasks_list = []

    const showModal = () => {
        setVisible(true);
      };

    const handleOk = (projectID) => {
        setModalText(`<Link to='/projects' >Deleted Successfully...</Link`);
        console.log("projectid ======>",projectID)
        setConfirmLoading(true);
        setTimeout(() => {
        setVisible(false);
        setConfirmLoading(false);

        }, 2000);

        axios.delete(`http://127.0.0.1:8000/project/${projectID}/delete`)
        .then( res => {
            console.log(res.data);

        })

    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
      };


    if (props.tasks){
        if (props.tasks[0]) {
            if (props.tasks[0].id) {
                    const tasks_detail_list = props.tasks
                }
            else {
                props.tasks.forEach((task) => {
                    tasks_list.push(<Button>{task}</Button>)
            })
        }
        
        }
    }
    
    return ( !props.tasks ? ('') : ( (tasks_list.length) !== 0 ?
        (
            <div>
                <div>
                    {tasks_list}
                </div> 
            </div>
                        
            ) : (

            <div>
                <div>
                    <Link to={`/project/${props.id}/task/create`} params={{projectID:props.id}}>
                        <Button type="primary" icon={<PlusCircleOutlined />} size={"large"}>
                            Add Task
                        </Button>
                    </Link>
                </div>
                <br></br>
                <div>
                    <Link to={`/project/${props.id}/edit`}>
                        <Button type="primary" icon={<PlusCircleOutlined />} size={"large"}>
                            Edit Project
                        </Button>
                    </Link>
                </div>


                <List
                className="task-list"
                itemLayout="horizontal"
                dataSource={props.tasks}
                renderItem={item => (
                <List.Item>
                    <Skeleton avatar title={false} loading={item.loading} active>
                    <List.Item.Meta
                        title={<Route><Link to={`${props.id}/task/${item.id}`}>{item.name}</Link></Route>}
                        description={item.description}/>
                    </Skeleton>
                </List.Item>

                )}
            />
            <div>
                <Button type="default" onClick={showModal} icon={< DeleteOutlined />} size={"small"}>
                        Delete project
                    </Button>
                    <Modal
                        title="Delete Project"
                        visible={visible}
                        onOk={() => handleOk(props.id)}
                        okType= 'danger'
                        confirmLoading={confirmLoading}
                        onCancel={handleCancel}>
                        <p>{modalText}</p>
                    </Modal>
            </div>
          </div>

        )
    ));
}

export default Tasks;