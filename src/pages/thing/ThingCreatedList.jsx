import { Button, Card, Table } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import http from '../../utils/axios';
import BreadNav from '../../components/Frame/BreadNav';

const ThingCreatedList = ({ history }) => {
  const [pageTotal, setPageTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    getCreatedThings(pageCurrent, pageSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatDate = date => {
    if (date === null) {
      return '无';
    }
    return moment(date).format('M月D日 HH:mm');
  };

  const map01toNY = text => {
    return text === '1' ? <span style={{ color: 'blue' }}>是</span> : '否';
  };

  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      width: '20%',
      render: (text, record) => (
        <Button
          type='link'
          style={{ padding: '0', margin: '0' }}
          onClick={() => history.push(`/thing/created/${record.id}`)}>
          {text}
        </Button>
      )
    },
    {
      title: '标签',
      dataIndex: 'tagName'
    },
    {
      title: '阅读',
      dataIndex: 'hasRead',
      render: (text, record) => {
        let style = {};
        if (record.readCount === record.receiversCount) {
          style = { color: 'green' };
        }
        return (
          <span style={style}>
            {`${record.readCount}/${record.receiversCount}`}
          </span>
        );
      }
    },
    {
      title: '完成',
      dataIndex: 'hasFinished',
      render: (text, record) => {
        if (record.needFinish !== '1') {
          return '';
        }
        return `${record.finishedCount}/${record.receiversCount}`;
      }
    },

    {
      title: '回答',
      dataIndex: 'needAnswer',
      render: map01toNY
    },
    {
      title: '附件',
      dataIndex: 'needFinish',
      render: text => {
        return text === '1' ? <span style={{ color: 'blue' }}>有</span> : '无';
      }
    },
    {
      title: '回复附件',
      dataIndex: 'needFileReply',
      render: map01toNY
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      render: formatDate
    },
    {
      title: '截止时间',
      dataIndex: 'endTime',
      render: formatDate
    }
  ];

  const getCreatedThings = (current, size) => {
    setLoading(true);
    http
      .post('/thing/createdList', {
        pageCurrent: current,
        pageSize: size
      })
      .then(res => {
        if (res.data.code === 0) {
          setPageTotal(res.data.data.total);
          setDataSource(res.data.data.records);
          setLoading(false);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <BreadNav navs={[{ url: '/thing/joinedlist', name: '已创建' }]} />
      <Card>
        <Table
          loading={loading}
          pagination={{
            current: pageCurrent,
            pageSize: pageSize,
            total: pageTotal,
            showTotal: (total, range) =>
              ` 共 ${total} 条，第 ${range[0]}-${range[1]} 条`,
            onChange: (page, pageSize) => {
              setPageCurrent(page);
              getCreatedThings(page, pageSize);
            },
            onShowSizeChange: (page, size) => {
              setPageCurrent(1);
              setPageSize(size);
              getCreatedThings(1, size);
            }
          }}
          columns={columns}
          dataSource={dataSource}
          rowKey={row => row.id}
        />
      </Card>
    </>
  );
};

export default ThingCreatedList;
