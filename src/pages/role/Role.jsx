import React, { useState, useEffect } from 'react';
import { Card, Tag, message } from 'antd';
import http from '../../utils/axios';
import style from './roleList.css';


const Role = (props) => {
  const [roleName, setRoleName] = useState('');
  const [rolePermissions, setRolePermissions] = useState([]);
  const [allPermissions, setAllPermissions] = useState([]);
  // role
  const getRole = () => {
    return http.post('/role/getRole', {
      id: props.match.params.id
    });
  };
  const getPermissions = () => {
    return http.post('/permissions');
  };
  useEffect(() => {
    Promise.all([getRole(), getPermissions()])
      .then((res) => {
        let roleRes = res[0];
        let permissionsRes = res[1];
        if (roleRes.data.code === 0 && permissionsRes.data.code === 0) {
          let rolePerms = roleRes.data.data.permissionList;
          // 从所有权限中剔除该角色已经有的权限
          let tempPerms = permissionsRes.data.data;
          for (let i = 0; i < tempPerms.length; i++) {
            const perm = tempPerms[i];
            rolePerms.forEach(rolePerm => {
              if (perm.id === rolePerm.id) {
                tempPerms.splice(i, 1);
                i--;
              }
            })
          }
          setRoleName(roleRes.data.data.roleName)
          setRolePermissions(rolePerms)
          setAllPermissions(tempPerms)
        }
      }
      ).catch((err) => { console.log(err) })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelPerm = (permission) => {
    http.post('/role/delPermission',
      {
        "roleId": props.match.params.id,
        "permissionId": permission.id
      }
    ).then(
      res => {
        if (res.data.code === 0) {
          // 把权限信息加入可选权限
          setAllPermissions([...allPermissions, permission]);
          // 把权限信息从当前权限中剔除
          for (let i = 0; i < rolePermissions.length; i++) {
            const perm = rolePermissions[i];
            if (perm.id === permission.id) {
              rolePermissions.splice(i, 1);
              i--;
            }
          }
          setRolePermissions([...rolePermissions]);

          message.success('删除成功!')
        }
      }
    ).catch(err => { console.log(err) })
  }
  const handleAddPerm = (permission) => {
    http.post('/role/addPermission',
      {
        "roleId": props.match.params.id,
        "permissionId": permission.id
      }
    ).then(
      res => {
        if (res.data.code === 0) {
          // 把权限信息加入当前角色
          setRolePermissions([...rolePermissions, permission]);
          // 把权限信息从可选权限中剔除
          for (let i = 0; i < allPermissions.length; i++) {
            const perm = allPermissions[i];
            if (perm.id === permission.id) {
              allPermissions.splice(i, 1);
              i--;
            }
          }
          setAllPermissions([...allPermissions]);

          message.success('添加成功!')
        }
      }
    ).catch(err => { console.log(err) })
  }

  return (
    <div>
      <Card title={'当前角色: ' + roleName} className={style.myCard}>
        {rolePermissions.map(permission => {
          if (permission.frontRoute.indexOf('/sys/role') !== -1) {
            return (<Tag key={permission.id} color='red' className={style.myTag} >{permission.permissionName}</Tag>)
          }
          return (<Tag key={permission.id} color='processing' className={style.myTag} onClick={() => handleDelPerm(permission)}>- {permission.permissionName}</Tag>)
        })}
      </Card>
      <Card title='可选权限' className={style.myCard}>
        {allPermissions.map(permission => {
          if (permission.frontRoute.indexOf('/sys/role') !== -1) {
            return (<Tag key={permission.id} color='red' className={style.myTag} >{permission.permissionName}</Tag>)
          }
          return (<Tag key={permission.id} color='purple' className={style.myTag} onClick={() => handleAddPerm(permission)}>+ {permission.permissionName}</Tag>)
        })}
      </Card>
    </div>
  );
}

export default Role;
