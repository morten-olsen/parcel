import React, { useMemo } from 'react';
import { Table } from 'antd';
import config from '../config';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Value',
    dataIndex: 'value',
    key: 'value',
  },
];

const Debug: React.FC = () => {
  const data = useMemo(() => {
    const vals = {
      Repository: config.repo,
      User: config.user,
      'Is Production': config.isProd,
    };

    return Object.entries(vals).map(([name, value]) => ({
      key: name,
      name,
      value: value.toString(),
    }));
  }, []);

  return <Table dataSource={data} columns={columns} />;
};

export default Debug;
