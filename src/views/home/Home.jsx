import React, { useState } from 'react';
import './Home.css';
import { useNavigate, Outlet, useLocation } from 'react-router-dom'
import Icon, {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FormOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Space } from 'antd';
import HomeImg from '../../assets/home.jpg';
import {getLoginUser} from '../../utils/store.js';

const { Header, Sider, Content } = Layout;

const HomePage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [loginUser, setLoginUser] = useState(getLoginUser());

  const navigate = useNavigate()
  const location = useLocation();

  const HeartSvg = () => (
    <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
      <path d="M581.18 384c-40.36 0-213.64 3.96-325.18 171.9V384c0-105.88-86.12-192-192-192-35.34 0-64 28.66-64 64s28.66 64 64 64c35.28 0 64 28.72 64 64v512c0 70.6 57.4 128 128 128h352c17.68 0 32-14.32 32-32v-32c0-35.34-28.66-64-64-64h-64l256-192v288c0 17.68 14.32 32 32 32h64c17.68 0 32-14.32 32-32V579.72c-20.58 5.34-41.78 9.08-64 9.08-123.62 0-227.04-88.1-250.82-204.8zM896 192h-128l-128-128v268.8c0 106.04 85.96 192 192 192s192-85.96 192-192V64l-128 128z m-144 160c-17.68 0-32-14.32-32-32s14.32-32 32-32 32 14.32 32 32-14.32 32-32 32z m160 0c-17.68 0-32-14.32-32-32s14.32-32 32-32 32 14.32 32 32-14.32 32-32 32z" />
    </svg>
  );

  const clickMenu = (route) => {
    navigate(route)
  };

  const onLogout = () => {
    navigate('/')
  };

  return (
    <Layout className="home-container">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical">
          Animal Rescue
        </div>
        <Menu
          theme="dark"
          mode="inline"
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: <div onClick={() => clickMenu('/home/profile')}>Your Profile</div>,
            },
            {
              key: '2',
              icon: <Icon component={HeartSvg} />,
              label: <div onClick={() => clickMenu('/home/animals')}>Animals</div>,
            },
            {
              key: '3',
              icon: <FormOutlined />,
              label: <div onClick={() => clickMenu('/home/adopt')}>Adopt Order</div>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{
          padding: 0,
          background: colorBgContainer,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingRight: '30px',
        }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <Space>
            <UserOutlined />
            <div>Welcome, <b>{loginUser.first_name}</b></div>
            <a onClick={onLogout}>Logout</a>
          </Space>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: 'auto',
          }}
        >
          {
            location.pathname === '/home' ? <img src={HomeImg} className="home-img"/> : <Outlet />
          }
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomePage;
