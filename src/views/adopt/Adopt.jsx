import React, { useState } from 'react';
import './Adopt.css';
import Icon, {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FormOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import HomeImg from '../../assets/home.jpg';

const { Header, Sider, Content } = Layout;

const HomePage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const HeartSvg = () => (
    <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
      <path d="M581.18 384c-40.36 0-213.64 3.96-325.18 171.9V384c0-105.88-86.12-192-192-192-35.34 0-64 28.66-64 64s28.66 64 64 64c35.28 0 64 28.72 64 64v512c0 70.6 57.4 128 128 128h352c17.68 0 32-14.32 32-32v-32c0-35.34-28.66-64-64-64h-64l256-192v288c0 17.68 14.32 32 32 32h64c17.68 0 32-14.32 32-32V579.72c-20.58 5.34-41.78 9.08-64 9.08-123.62 0-227.04-88.1-250.82-204.8zM896 192h-128l-128-128v268.8c0 106.04 85.96 192 192 192s192-85.96 192-192V64l-128 128z m-144 160c-17.68 0-32-14.32-32-32s14.32-32 32-32 32 14.32 32 32-14.32 32-32 32z m160 0c-17.68 0-32-14.32-32-32s14.32-32 32-32 32 14.32 32 32-14.32 32-32 32z" />
    </svg>
  );

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
              label: 'Your Profile',
            },
            {
              key: '2',
              icon: <Icon component={HeartSvg} />,
              label: 'Animals',
            },
            {
              key: '3',
              icon: <FormOutlined />,
              label: 'Adopt Request',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
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
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <img src={HomeImg} className="home-img"/>
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomePage;
