import React from 'react';

import UserSearchResult from '../../components/UserSearchResult';
import { Button } from 'antd';

const UserList = props => {
  const columns = [
    {
      title: '操作',
      render: (txt, record, index) => {
        return (
          <div>
            <Button
              type='primary'
              size='small'
              onClick={() => {
                props.history.push(`/user/edit/${record.id}`);
              }}>
              修改
            </Button>
          </div>
        );
      }
    }
  ];

  return <UserSearchResult extraColumns={columns} tableSelectable={false} />;
};

export default UserList;
