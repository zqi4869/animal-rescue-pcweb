import React, { useState, useEffect } from 'react';
import './Animals.css';
import { SaveOutlined, } from '@ant-design/icons';
import Uploader from "../../components/Uploader.jsx";
import { Col, Row, Card, Button, Form, Input, message, Space, Table, Tag } from 'antd';
const { Column } = Table;
const { Meta } = Card;
import { fetchGet, getImageUri } from "../../utils/request.js";
const data = [
  {
    "id": "6720a282ea8893dbf002d4a4",
    "gender": "Male",
    "name": "Small kity",
    "no": "100001",
    "age": "3个月",
    "city": "成都",
    "label": "上门领养 按时疫苗 适龄绝育",
    "remark": "家猫的崽崽",
    "story": "它是在2年前，在xxx出生的，性格温顺，可以自己吃饭睡觉啥的。它喜欢玩耍，喜欢跟小朋友一起玩，也喜欢跟其他小猫玩。它很聪明，也很可爱，可爱到你会想把它抱起来亲一口。它喜欢玩耍，喜欢跟小朋友一起玩，也喜欢跟其他小猫玩。",
    "cover_url": "animal-1.png",
    "story_img_url": "animal-1.png",
    "adopted": true
  }
];

const AnimalsPage = () => {
  const [form] = Form.useForm();
  const [loginUser, setLoginUser] = useState();

  const onQuery = () => {
    const no = form.getFieldsValue('no')
    // fetchGet('/animal/all', data => {
    //   console.log(data)
    // });
  };

  useEffect(() => {
    // query()
  }, []);

  return (
    <>
      <Form layout="inline" form={form}>
        <Form.Item label="No" name="no">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button color="default" variant="solid" onClick={onQuery}>Query</Button>
        </Form.Item>
      </Form>

      <br />

      <Table dataSource={data} rowKey="id">
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
                adopted ? <Tag color='green'>Yes</Tag> : <Tag color='volcano'>No</Tag>
              }
            </>
          )}
        />
        <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <Button color="primary" variant="solid" size="small">Edit</Button>
              <Button color="danger" variant="solid" size="small">Delete</Button>
            </Space>
          )}
        />
      </Table>
    </>
  );
};

export default AnimalsPage;
