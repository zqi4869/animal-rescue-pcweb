import React, { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import {getImageUri} from '../utils/request.js';

const Uploader = ({ value, onUploadSuccess }) => {
  const [uploadImageName, setUploadImageName] = useState(null);

  const uploadProps = {
    name: 'file',
    action: getImageUri('user/pc/upload'),
    headers: {
      // authorization: 'authorization-text',
    },
    maxCount: 1,
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        const imageName = info.file.response.data
        onUploadSuccess(imageName)
        setUploadImageName(imageName)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <Upload {...uploadProps}>
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
  );
};
export default Uploader;
