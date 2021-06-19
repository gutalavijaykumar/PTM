import React from 'react'
import { List, Avatar, Space, Button } from 'antd';
import { MessageOutlined, LikeOutlined, EditOutlined  } from '@ant-design/icons';
import { BrowserRouter as Router, Link, Switch } from 'react-router-dom';
import Tasks from './Tasks'

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const Project = (prop) =>{
    return (
  <div>
      <List
    itemLayout="horizontal"
    size="large"
    pagination={{
      onChange: page => {
        console.log(page);
      },
      pageSize: 3,
    }}
    dataSource={prop.data}
    renderItem={item => (
      <List.Item
        key={item.title}
        actions={[
          <Space>
            <Tasks id={item.id} tasks={item.tasks}/>
          </Space>
        ]}
        extra={
          <img
            width={200}
            alt="logo"
            src={item.avatar}
          />
        }
      >
        <List.Item.Meta
          avatar={<Avatar src={item.avatar} />}
          title={<Link to={`/project/${item.id}`}>{item.name}</Link>}
          description={item.description}
        />

      </List.Item>

    )}
  />

  </div>

    )
}

export default Project;
