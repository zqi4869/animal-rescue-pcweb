import React, { useState } from 'react';
import './Profile.css';
import { SaveOutlined, } from '@ant-design/icons';
import Uploader from "../../components/Uploader.jsx";
import { Col, Row, Card, Button, Form, Input, message } from 'antd';
const { Meta } = Card;
import { fetchPut, getImageUri } from "../../utils/request.js";
import { getLoginUser, saveLoginUser } from "../../utils/store.js";

const HomePage = () => {
  const [loginUser, setLoginUser] = useState(getLoginUser());

  const onFinish = (form) => {
    const newUser = {
      ...loginUser,
      ...form,
    }
    fetchPut(`/user/update`, newUser, () => {
      message.success('Update profile successfully')
      saveLoginUser(newUser)
    })
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
            cover={<img src={getImageUri(loginUser.avatar)} />}>
            <Meta title={loginUser.first_name} description={'Role: ' + loginUser.role} />
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
            >
              <Input />
            </Form.Item>

            <Form.Item label="City" name="city">
              <Input />
            </Form.Item>

            <Form.Item label="Phone" name="phone">
              <Input />
            </Form.Item>

            <Form.Item label="Avatar">
              <Uploader onUploadSuccess={onUploadSuccess} />
            </Form.Item>

            <Form.Item label="Address" name="address">
              <Input />
            </Form.Item>

            <Form.Item
              label="New password"
              name="newPassword"
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
