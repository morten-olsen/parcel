import React, { useContext, useState } from 'react';
import {
  Card,
  Avatar,
  Button,
  Modal,
} from 'antd';
import { KeyOutlined, GithubOutlined } from '@ant-design/icons'
import GithubContext from '../contexts/Github';

const IconText = ({ icon, text, ...props }) => (
  <Button
    {...props}
    icon={React.createElement(icon)}
  >
    {text}
  </Button>
);

const Profile: React.FC = () => {
  const { user, keys } = useContext(GithubContext);
  const [showKeys, setShowKeys] = useState(false);
  if (!user) {
    return null;
  }
  
  return (
    <>
      <Modal
        visible={showKeys}
        onOk={() => setShowKeys(false)}
        onCancel={() => setShowKeys(false)}
        title="Keys"
      >
        <pre>
          {keys!.join('\n\n')}
        </pre>
      </Modal>
      <Card
        style={{ width: 300, marginTop: 16, alignSelf: 'center' }}
        actions={[(
          <IconText
            key="showkeys"
            text="Show keys"
            icon={KeyOutlined}
            onClick={() => setShowKeys(true)}
          />
        ), (
          <a target="_blank" href={`https://github.com/${user.login}`}>
            <IconText
              key="gotogithub"
              text="Go to Github"
              icon={GithubOutlined}
            />
          </a>
        )]}
      >
        <Card.Meta
          title={user.name}
          avatar={(
            <Avatar src={user.avatar_url} size={80} />
          )}
          description={user.location}
        />
          
      </Card>
    </>
  );
};

export default Profile;
