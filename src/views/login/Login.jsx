import React from 'react';
import './Login.css';
import { Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
    let navigate = useNavigate();

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        navigate('/home');
    };

    return (
      <div className="login-container">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}>
          <Form.Item name="username" rules={[{ required: true, message: 'Please input username!' }]}>
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Please input password!' }]}>
            <Input type="password" placeholder="Password"/>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
};

export default LoginPage;
