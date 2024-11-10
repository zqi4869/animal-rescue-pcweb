import React, { useState, useEffect } from 'react';
import './Adopt.css';
import { SendOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Space, Table } from 'antd';
const { Column } = Table;
import { fetchGet, getImageUri } from "../../utils/request.js";

const AdoptPage = () => {
  const [form] = Form.useForm();
  const [loginUser, setLoginUser] = useState();
  const [tableData, setTableData] = useState([]);

  const onQuery = () => {
    const { no } = form.getFieldsValue();
    fetchGet('/adoption/all', data => {
      if(no) {
        setTableData(data.filter(item => item.id.includes(no)))
      }else{
        setTableData(data)
      }
    });
  };

  const onDeliver = () => {
    message.success('Delivered successfully!');
  };

  useEffect(() => {
    onQuery()
  }, []);

  return (
    <>
      <Form layout="inline" form={form}>
        <Form.Item label="Order no" name="no">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button icon={<SearchOutlined />} color="default" variant="solid" onClick={onQuery}>Query</Button>
        </Form.Item>
      </Form>

      <br />

      <Table dataSource={tableData} rowKey="id">
        <Column title="Order no" dataIndex="id" />
        <Column
          title="Animal Image"
          dataIndex="animal"
          key="animal.cover_url"
          render={(animal) => <img className="cover-img" src={getImageUri(animal.cover_url)} />}
        />
        <Column title="Animal no" dataIndex={["animal", "no"]} />
        <Column title="Animal name" dataIndex={["animal", "name"]} />
        <Column
          title="User name"
          dataIndex="user"
          render={(user) => (
            <>
              {user.first_name} {user.last_name}
            </>
          )}
        />
        <Column title="User address" dataIndex={["user", "address"]} />
        <Column title="User phone" dataIndex={["user", "phone"]} />
        <Column title="User city" dataIndex={["user", "city"]} />
        <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <Space>
              <Button icon={<SendOutlined />} color="danger" variant="solid" size="small" onClick={onDeliver}>Deliver</Button>
            </Space>
          )}
        />
      </Table>
    </>
  );
};

export default AdoptPage;
