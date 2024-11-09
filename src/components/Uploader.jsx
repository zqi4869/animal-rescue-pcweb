import React, { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';

const Uploader = ({ value, onUploadSuccess }) => {
  const [uploadImageName, setUploadImageName] = useState(null);

  const uploadProps = {
    name: 'file',
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    headers: {
      // authorization: 'authorization-text',
    },
    maxCount: 1,
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
        const imageName = info.file.name
        onUploadSuccess(imageName)
        setUploadImageName(imageName)
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
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
