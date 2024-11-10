import React, { useState, useEffect } from 'react';
import './Animals.css';
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Uploader from "../../components/Uploader.jsx";
import { Col, Row, Card, Button, Form, Input, message, Space, Table, Tag } from 'antd';
const { Column } = Table;
import { fetchGet, getImageUri } from "../../utils/request.js";

const AnimalsPage = () => {
  const [form] = Form.useForm();
  const [loginUser, setLoginUser] = useState();
  const [tableData, setTableData] = useState([]);

  const onQuery = () => {
    const { no} = form.getFieldsValue()
    fetchGet('/animal/all', data => {
      if(no) {
        setTableData(data.filter(item => item.no.includes(no)))
      }else{
        setTableData(data)
      }
    });
  };

  useEffect(() => {
    onQuery()
  }, []);

  return (
    <>
      <Form layout="inline" form={form}>
        <Form.Item label="No" name="no">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button icon={<SearchOutlined />} color="default" variant="solid" onClick={onQuery}>Query</Button>
        </Form.Item>
      </Form>

      <br />

      <Table dataSource={tableData} rowKey="id">
        <Column title="No." dataIndex="no" key="no"/>
        <Column
          title="Cover Image"
          dataIndex="cover_url"
          key="cover_url"
          render={(url) => <img className="cover-img" src={getImageUri(url)} />}
        />
        <Column title="Name" dataIndex="name" key="name"/>
        <Column title="Age" dataIndex="age" key="age"/>
        <Column title="Gender" dataIndex="gender" key="gender"/>
        <Column title="City" dataIndex="city" key="city"/>
        <Column
          title="Label"
          dataIndex="label"
          key="label"
          render={(label) => (
            <>
              {label.split(' ').map((tag) => {
                return (
                  <Tag color='volcano' key={tag}>
                    {tag}
                  </Tag>
                );
              })}
            </>
          )}
        />
        <Column title="Remark" dataIndex="remark" key="remark"/>
        <Column title="Story" dataIndex="story" key="story" />
        <Column
          title="Adopted"
          dataIndex="adopted"
          key="adopted"
          render={(adopted) => (
            <>
              {
                adopted ?
                  <Tag color='green' style={{fontWeight: 'bold'}}>Yes</Tag> :
                  <Tag color='volcano' style={{fontWeight: 'bold'}}>No</Tag>
              }
            </>
          )}
        />
        <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <Space>
              <Button icon={<EditOutlined />} color="primary" variant="solid" size="small">Edit</Button>
              <Button icon={<DeleteOutlined />} color="danger" variant="solid" size="small">Delete</Button>
            </Space>
          )}
        />
      </Table>
    </>
  );
};

export default AnimalsPage;
