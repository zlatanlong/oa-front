import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Space, Input } from 'antd';
import moment from 'moment';
import http from '../../utils/axios';

const TeamCreated = (props) => {
  const [teams, setTeams] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateRecord, setUpdateRecord] = useState({});
  const [updateTeamName, setUpdateTeamName] = useState('');

  useEffect(() => {
    getCreatedTeams()
  }, []);

  const getCreatedTeams = () => {
    http.post('/team/createdList').then(
      res => {
        if (res.data.code === 0) { setTeams(res.data.data) }
      }
    ).catch(err => { console.log(err) })
  }

  const handleOk = e => {
    http.post('/team/update', {
      id: updateRecord.id,
      teamName: updateTeamName
    }).then(
      res => {
        if (res.data.code === 0) {
          getCreatedTeams()
        }
      }
    ).catch(err => { console.log(err) })
    setShowUpdateModal(false)
  };

  const handleCancel = e => {
    setShowUpdateModal(false)
  };

  const columns = [
    { title: '小组', dataIndex: 'teamName' },
    { title: '创建时间', dataIndex: 'createTime', render: text => <span>{moment(text).format('YYYY-MM-DD')}</span> },
    { title: '修改时间', dataIndex: 'updateTime', render: text => <span>{text ? moment(text).format('YYYY-MM-DD') : '暂无'}</span> },
    {
      title: '操作', dataIndex: 'operation', render: (text, record) => {
        return (
          <Space>
            <Button onClick={() => { props.history.push(`/team/info/${record.id}`) }} type='primary'>成员详情</Button>
            <Button onClick={() => { setShowUpdateModal(true); setUpdateRecord(record); setUpdateTeamName(record.teamName) }}>修改组名</Button>
          </Space>
        )
      },
    }
  ]

  return (
    <div>
      <Modal
        title='组名：'
        visible={showUpdateModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input value={updateTeamName} onChange={e => setUpdateTeamName(e.target.value)} />
      </Modal>
      <Table columns={columns} dataSource={teams} rowKey={record => record.id} />
    </div>
  );
}

export default TeamCreated;
