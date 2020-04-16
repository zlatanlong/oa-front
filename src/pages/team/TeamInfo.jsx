/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import { Divider, Card, Table, Button, Popconfirm, message } from 'antd';
import { userColomns } from '../../utils/table-columns';
import http from '../../utils/axios';

const TeamInfo = (props) => {
  const pageCurrent = useRef(1);
  const pageSize = useRef(10);
  const [teamData, setTeamData] = useState({ membersPage: { total: 0 } });
  const [selectedDelRows, setSelectedDelRows] = useState([]);


  useEffect(() => {
    getPageData()
  }, []);

  const getPageData = () => {
    http.post('/team', {
      pageCurrent: pageCurrent.current,
      pageSize: pageSize.current,
      data: {
        id: props.match.params.id
      }
    }).then(
      res => {
        if (res.data.code === 0) {
          setTeamData(res.data.data)
        }
      }
    ).catch(err => { console.log(err) })
  }

  const handleDelMember = () => {
    let members = selectedDelRows.map(row => ({ id: row.id }))
    http.post('/team/delMember', {
      teamId: props.match.params.id,
      members
    }).then(
      res => {
        if (res.data.code === 0) {
          message.success('已删除！')
          getPageData()
        }
      }
    ).catch(err => { console.log(err) })
  }

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedDelRows(selectedRows)
    }
  };

  const pagination = {
    total: teamData.membersPage.total,
    showTotal: (total, range) => ` 共 ${total} 条，第 ${range[0]}-${range[1]} 条`,
    onChange: (page, pageSize) => { pageCurrent.current = page; getPageData(); },
    onShowSizeChange: (current, size) => { pageSize.current = size; getPageData(); }
  }

  return (
    <div>
      <Card>
        <span>{`${teamData.teamName}成员：`}</span>
        <Popconfirm title='谨慎：确定删除？' onConfirm={() => { handleDelMember() }}>
          <Button style={{ float: "right" }} disabled={selectedDelRows.length === 0} danger={selectedDelRows.length > 0} size="small">{`删除已选择的${selectedDelRows.length}项`}</Button>
        </Popconfirm>
        <Divider />
        <Table columns={userColomns} dataSource={teamData.membersPage.records} pagination={pagination} rowKey={record => record.id}
          rowSelection={rowSelection} />
      </Card>
    </div>
  );
}

export default TeamInfo;
