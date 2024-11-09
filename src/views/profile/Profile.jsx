import React, { useState } from 'react';
import './Profile.css';
import { SaveOutlined, } from '@ant-design/icons';
import Uploader from "../../components/Uploader.jsx";
import { Col, Row, Card, Button, Form, Input, message } from 'antd';
const { Meta } = Card;
import { fetchPut } from "../../utils/request.js";

const HomePage = () => {
  const [loginUser, setLoginUser] = useState({
    username: 'admin',
    first_name: 'John',
    last_name: 'Doe',
    role: 'admin',
    avatar: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
    city: 'New York',
    phone: '123-456-7890',
  });
  const onFinish = (values) => {
    console.log('Success:', values);
    // fetchPut(`/api/users/${loginUser.username}`, values)
  };
  const onFinishFailed = (errorInfo) => {
    message.error(errorInfo)
  };
  const onUploadSuccess = (imageName) => {
    setLoginUser({...loginUser, avatar: imageName});
  };

  return (
    <>
      <Row gutter={20}>
        <Col span={8} className="avatar-col">
          <Card
            hoverable
            style={{ width: 240, }}
            cover={<img src={loginUser.avatar} />}>
            <Meta title={loginUser.first_name} description={loginUser.role} />
          </Card>
        </Col>
        <Col span={16}>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={loginUser}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item label="Username" name="username">
              <Input disabled/>
            </Form.Item>

            <Form.Item
              label="First Name"
              name="first_name"
              rules={[
                {
                  required: true,
                  message: 'Please input first name!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Last Name"
              name="last_name"
              rules={[
                {
                  required: true,
                  message: 'Please input last name!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="City" name="city">
              <Input />
            </Form.Item>

            <Form.Item label="Phone" name="phone">
              <Input />
            </Form.Item>

            <Form.Item label="Avatar" name="avatar">
              <Uploader onUploadSuccess={onUploadSuccess} />
            </Form.Item>

            <Form.Item
              label="New password"
              name="password"
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default HomePage;
