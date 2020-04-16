import React, { useState, useEffect } from 'react';
import { Descriptions, Tag } from 'antd';
import http from '../../utils/axios.js';


const UserEdit = () => {
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    http.post('/user').then(
      res => {
        if (res.data.code === 0) {
          setUserInfo({ ...res.data.data })
        }
      }
    ).catch(err => { console.log(err) })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Descriptions title="个人信息">
        <Descriptions.Item label="姓名">{userInfo.realName}</Descriptions.Item>
        <Descriptions.Item label="学号">{userInfo.number}</Descriptions.Item>
        <Descriptions.Item label="学院">{userInfo.collegeName}</Descriptions.Item>
        {userInfo.majorName && <Descriptions.Item label="专业">{userInfo.majorName}</Descriptions.Item>}
        {userInfo.className && <Descriptions.Item label="班级">{userInfo.className}</Descriptions.Item>}
        {userInfo.phone && <Descriptions.Item label="手机号">{userInfo.phone}</Descriptions.Item>}
        {userInfo.roleList && <Descriptions.Item label="角色">{userInfo.roleList.map((role) => {
          return <Tag color="success" key={role.id}>{role.roleName}</Tag>
        })}</Descriptions.Item>}
        {userInfo.permissionSet && <Descriptions.Item label="权限">{userInfo.permissionSet.map((permission) => {
          return <Tag color="processing" key={permission.id}>{permission.permissionName}</Tag>
        })}</Descriptions.Item>}
      </Descriptions>
    </div>
  );
}

export default UserEdit;
