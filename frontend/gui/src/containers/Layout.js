import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
const { Header, Content, Footer } = Layout;

const CustomLayout = (props) => {
    return (
        <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="light" mode="horizontal" defaultSelectedKeys={['2']}>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
          <Link to='/' ><Breadcrumb.Item>Home</Breadcrumb.Item></Link>
          <Link to='/projects' ><Breadcrumb.Item>Projects</Breadcrumb.Item></Link>
          </Breadcrumb>
            <div className="site-layout-content">
              {props.children}
            </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Project and Task Management</Footer>
      </Layout>
    )
}

export default CustomLayout;