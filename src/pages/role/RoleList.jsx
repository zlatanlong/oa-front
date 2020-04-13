import React, { useState, useEffect } from 'react';
import http from '../../utils/axios';
import { Card, Tag, Button } from 'antd';
import style from './roleList.css';

const RoleList = (props) => {
  const [roleList, setRoleList] = useState([]);
  useEffect(() => {
    http.post('/role/getRoles').then(
      res => {
        if (res.data.code === 0) {
          setRoleList(res.data.data)
        }
      }
    ).catch(err => { console.log(err) })
  }, []);

  return (
    <div>
      {roleList.map(role => {
        return (<Card key={role.id} title={role.roleName} className={style.myCard}
          extra={<Button type='link' onClick={() => { props.history.push(`/sys/role/${role.id}`) }}>管理</Button>} hoverable>
          {role.permissionList.map(permission => {
            return (<Tag key={permission.id} color='processing' className={style.myTag}>{permission.permissionName}</Tag>)
          })}
        </Card>)
      })}
    </div>
  );
}

export default RoleList;
