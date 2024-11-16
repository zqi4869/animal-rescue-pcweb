import React, { useState, useEffect } from 'react';
import './Animals.css';
import { SearchOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import Uploader from "../../components/Uploader.jsx";
import { Radio, Modal, Button, Form, Input, Checkbox, Space, Table, Tag } from 'antd';

const { Column } = Table;
import { fetchGet, getImageUri, fetchPost } from "../../utils/request.js";

const AnimalsPage = () => {
  const [queryForm] = Form.useForm();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initFormValues, setInitFormValues] = useState({});
  const [loginUser, setLoginUser] = useState();
  const [tableData, setTableData] = useState([]);
  const [animalId, setAnimalId] = useState(null);

  const onQuery = () => {
    const { no } = queryForm.getFieldsValue()
    fetchGet('/animal/all', data => {
      if (no) {
        setTableData(data.filter(item => item.no.includes(no)))
      } else {
        setTableData(data)
      }
    });
  };

  const openDialog = () => {
    setAnimalId(null);
    setInitFormValues({});
    form.resetFields();
    setIsModalOpen(true);
  };

  const onEdit = (row) => {
    setAnimalId(row.id);
    setInitFormValues(row);
    form.resetFields();
    setIsModalOpen(true);
  };

  const onDelete = (row) => {
    fetchPost('/animal/delete/' + row.id, {}, () => {
      setIsModalOpen(false);
      onQuery();
    });
  };

  const onSubmit = () => {

    fetchPost('/animal/save', {
      ...form.getFieldsValue(),
      id: animalId
    }, () => {
      setIsModalOpen(false);
      onQuery();
    });
  };

  const rules = [{ required: true, }]

  useEffect(() => {
    onQuery()
  }, []);

  return (
    <>
      <Modal title="Basic animal information"
             open={isModalOpen}
             onOk={onSubmit}
             onCancel={() => setIsModalOpen(false)}>
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 5,
          }}
          initialValues={initFormValues}
          autoComplete="off"
        >
          <Form.Item label="No" name="no" rules={rules}>
            <Input/>
          </Form.Item>
          <Form.Item label="Name" name="name" rules={rules}>
            <Input/>
          </Form.Item>
          <Form.Item label="Cover image" name="cover_url" rules={rules}>
            <Uploader onUploadSuccess={(imgName) => form.setFieldsValue({cover_url: imgName})}/>
          </Form.Item>
          <Form.Item label="Age" name="age" rules={rules}>
            <Input/>
          </Form.Item>
          <Form.Item label="Gender" name="gender" rules={rules}>
            <Radio.Group>
              <Radio value="Male"> Male </Radio>
              <Radio value="Female"> Female </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="City" name="city" rules={rules}>
            <Input/>
          </Form.Item>
          <Form.Item label="Label" name="label" rules={rules}>
            <Input placeholder="Multiple label # separated"/>
          </Form.Item>
          <Form.Item label="Remark" name="remark">
            <Input.TextArea rows={2}/>
          </Form.Item>
          <Form.Item label="Story" name="story">
            <Input.TextArea rows={4}/>
          </Form.Item>
          <Form.Item label="Story image" name="story_img_url">
            <Uploader onUploadSuccess={(imgName) => form.setFieldsValue({story_img_url: imgName})}/>
          </Form.Item>
        </Form>
      </Modal>

      <Form layout="inline" form={queryForm}>
        <Form.Item label="No" name="no">
          <Input/>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button icon={<SearchOutlined/>} color="default" variant="solid" onClick={onQuery}>Query</Button>
            <Button icon={<PlusOutlined/>} color="default" variant="solid" onClick={openDialog}>Add</Button>
          </Space>
        </Form.Item>
      </Form>

      <br/>

      <Table dataSource={tableData} rowKey="id">
        <Column title="No." dataIndex="no" key="no"/>
        <Column
          title="Cover Image"
          dataIndex="cover_url"
          key="cover_url"
          render={(url) => <img className="cover-img" src={getImageUri(url)}/>}
        />
        <Column title="Name" dataIndex="name" key="name"/>
        <Column title="Age" dataIndex="age" key="age"/>
        <Column title="Gender" dataIndex="gender" key="gender"/>
        <Column title="City" dataIndex="city" key="city"/>
        <Column
          title="Label"
          dataIndex="label"
          key="label"
          width={160}
          render={(label) => (
            <>
              {label.split('#').map((tag) => {
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
        <Column
          title="Story"
          dataIndex="story"
          key="story"
          render={(text) => (
            <div style={{ width:"200px", wordBreak:"break-all" }}>{text}</div>
          )}
        />
        <Column
          title="Adopted"
          dataIndex="adopted"
          key="adopted"
          render={(adopted) => (
            <>
              {
                adopted ?
                  <Tag color='green' style={{ fontWeight: 'bold' }}>Yes</Tag> :
                  <Tag color='volcano' style={{ fontWeight: 'bold' }}>No</Tag>
              }
            </>
          )}
        />
        <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <Space>
              <Button icon={<EditOutlined/>} color="primary" variant="solid" size="small"
                      onClick={() => onEdit(record)}>Edit</Button>
              <Button icon={<DeleteOutlined/>} color="danger" variant="solid" size="small"
                      onClick={() => onDelete(record)}>Delete</Button>
            </Space>
          )}
        />
      </Table>
    </>
  );
};

export default AnimalsPage;
