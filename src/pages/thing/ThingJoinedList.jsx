import React, { useEffect, useState } from 'react';
import http from '../../utils/axios';
import { Card } from 'antd';
import TableAndPage from '../../components/TableAndPage.jsx';
import moment from 'moment';

const ThingJoinedList = () => {
  const [pageTotal, setPageTotal] = useState(0);
  const [queryData, setQueryData] = useState({});
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    getJoinedThings(1, 10);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatDate = date => {
    if (date === null) {
      return '无';
    }
    return moment(date).format('YYYY-MM-DD hh:mm:ss');
  };

  const map01toNY = text => {
    return text === '1' ? '是' : '否';
  };

  const columns = [
    {
      title: '标题',
      dataIndex: 'title'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      render: formatDate
    },
    {
      title: '发起人',
      dataIndex: 'realName'
    },
    {
      title: '标签',
      dataIndex: 'tagName'
    },
    {
      title: '阅读',
      dataIndex: 'hasRead',
      render: map01toNY
    },
    {
      title: '完成',
      dataIndex: 'hasFinish',
      render: map01toNY
    },
    // {
    //   title: '开始时间',
    //   dataIndex: 'startTime',
    //   render: formatDate
    // },
    {
      title: '截止时间',
      dataIndex: 'endTime',
      render: formatDate
    }
  ];

  const getJoinedThings = (pageCurrent, pageSize) => {
    http
      .post('/thing/joinedList', {
        pageCurrent,
        pageSize,
        data: queryData
      })
      .then(res => {
        if (res.data.code === 0) {
          setPageTotal(res.data.data.total);
          const tempData = res.data.data.records.map(record => ({
            ...record.thing,
            hasFinish: record.hasFinish,
            hasRead: record.hasRead
          }));
          setDataSource(tempData);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <Card>
      <TableAndPage
        pageTotal={pageTotal}
        dataSource={dataSource}
        columns={columns}
        getPageData={(pageCurrent, pageSize) => {
          getJoinedThings(pageCurrent, pageSize);
        }}
      />
    </Card>
  );
};

export default ThingJoinedList;
