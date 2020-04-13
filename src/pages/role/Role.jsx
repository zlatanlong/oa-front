import React, { useState, useEffect } from 'react';
import { Card, Tag, Transfer, Switch } from 'antd';
import http from '../../utils/axios';
import style from './roleList.css';

const mockData = [];
for (let i = 0; i < 20; i++) {
  mockData.push({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`
  });
}

const Role = (props) => {
  const [role, setRole] = useState({ permissionList: [] });
  const [allPermissions, setAllPermissions] = useState([]);
  const [targetKeys, setTargetKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  // role
  useEffect(() => {
    http.post('/role/getRole', {
      id: props.match.params.id
    }).then(
      res => {
        if (res.data.code === 0) {
          setRole(res.data.data)
        }
      }
    ).catch(err => { console.log(err) })
  }, []);
  // allPermissions其中可选的
  useEffect(() => {
    http.post('/permissions').then(
      res => {
        if (res.data.code === 0) {
          setAllPermissions(res.data.data)
        }
      }
    ).catch(err => { console.log(err) })
  }, []);

  const handleChange = (nextTargetKeys, direction, moveKeys) => {
    setTargetKeys(nextTargetKeys);
  };

  const handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  return (
    <div>
      <Card title={role.roleName} className={style.myCard}>
        {role.permissionList.map(permission => {
          return (<Tag key={permission.id} color='processing' className={style.myTag}>{permission.permissionName}</Tag>)
        })}
      </Card>
      <Card title='可选权限' className={style.myCard}>
        {allPermissions.map(permission => {
          return (<Tag key={permission.id} color='purple' className={style.myTag}>{permission.permissionName}</Tag>)
        })}
      </Card>
      <Transfer
        dataSource={mockData}
        titles={['可选权限', '已有权限']}
        targetKeys={targetKeys}
        selectedKeys={selectedKeys}
        onChange={handleChange}
        onSelectChange={handleSelectChange}
        render={item => { return (<Tag>{item.title}</Tag>) }}
        locale={{ itemUnit: '项', itemsUnit: '项' }}
      />
    </div>
  );
}

export default Role;
