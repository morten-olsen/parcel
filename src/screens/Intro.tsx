import React from 'react';
import { useHistory } from 'react-router';
import Welcome from './Welcome';
import {
  Button,
  Space,
} from 'antd';
import {
  UploadOutlined,
  DownloadOutlined,
  KeyOutlined,
} from '@ant-design/icons';


const Thumb: React.FC = ({
  title,
  Icon,
  link,
  className,
}) => {
  const history = useHistory();
  return (
    <Button
      size="large"
      icon={<Icon />}
      type="link"
      className={className}
      onClick={() => history.push(link)}
    >
      {title}
    </Button>
  );
};

const Intro = () => {
  return (
    <>
      <Welcome />
      <Space style={{ width: '100%' }} align="center" direction="vertical">
        <b>What do you want to do?</b>
        <Thumb
          title="I want to send a text/file"
          link="/send"
          className="send-btn"
          Icon={UploadOutlined}
        /> 
        <Thumb
          link="/key"
          className="want-to-receive-btn"
          title="I want to receive a file"
          Icon={KeyOutlined}
        />
        <Thumb
          link="/receive"
          className="did-receive-btn"
          title="I have received a file"
          Icon={DownloadOutlined}
        />
      </Space>
    </>
  );
};

export default Intro;
