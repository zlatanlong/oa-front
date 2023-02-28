import { Button, Card, Form, Table } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import ThingSearchForm from '../../components/Thing/ThingSearchForm';
import http from '../../utils/axios';
import BreadNav from '../../components/Frame/BreadNav';

const ThingJoinedList = ({ history }) => {
  const [form] = Form.useForm();
  const [pageTotal, setPageTotal] = useState(0);
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    getJoinedThings(pageCurrent, pageSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatDate = (date) => {
    if (date === null) {
      return '无';
    }
    return moment(date).format('M月D日 HH:mm');
  };

  const map01toNY = (text) => {
    return text === '1' ? (
      <span style={{ color: 'green' }}>是</span>
    ) : (
      <span style={{ color: 'red' }}>否</span>
    );
  };

  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      width: '25%',
      render: (text, record) => (
        <Button
          type='link'
          style={{ padding: '0', margin: '0' }}
          onClick={() => history.push(`/thing/joined/${record.id}`)}>
          {text}
        </Button>
      ),
    },
    {
      title: '发起人',
      dataIndex: 'realName',
    },
    {
      title: '标签',
      dataIndex: 'tagName',
    },
    {
      title: '阅读',
      dataIndex: 'hasRead',
      render: map01toNY,
    },
    {
      title: '完成',
      dataIndex: 'hasFinished',
      render: (text, record) => {
        if (record.needFinish === '0') {
          return '不需要';
        }
        return map01toNY(text);
      },
    },
    {
      title: '附件',
      dataIndex: 'needFileReply',
      render: (text) => {
        return text === '1' ? <span style={{ color: 'blue' }}>有</span> : '无';
      },
    },
    {
      title: '问答',
      dataIndex: 'needAnswer',
      render: (text) => {
        return text === '1' ? (
          <span style={{ color: 'orange' }}>有</span>
        ) : (
          '无'
        );
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      render: formatDate,
    },
    {
      title: '截止时间',
      dataIndex: 'endTime',
      render: formatDate,
    },
  ];

  const getJoinedThings = (current, size, data) => {
    setLoading(true);
    http
      .post('/thing/joinedList', {
        pageCurrent: current,
        pageSize: size,
        data,
      })
      .then((res) => {
        if (res.data.code === 0) {
          setPageTotal(res.data.data.total);
          const tempData = res.data.data.records.map((record) => ({
            ...record.thing,
            hasFinished: record.hasFinished,
            hasRead: record.hasRead,
          }));
          setDataSource(tempData);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onFinish = (values) => {
    getJoinedThings(1, 10, values);
    setPageCurrent(1);
    setPageSize(10);
  };

  return (
    <div>
      <BreadNav navs={[{ url: '/thing/joinedlist', name: '日程表' }]} />
      <Card>
        <ThingSearchForm form={form} onFinish={onFinish} />
      </Card>
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
              form.validateFields().then((values) => {
                getJoinedThings(page, pageSize, values);
              });
            },
            onShowSizeChange: (page, size) => {
              setPageCurrent(1);
              setPageSize(size);
              form.validateFields().then((values) => {
                getJoinedThings(1, size, values);
              });
            },
          }}
          columns={columns}
          dataSource={dataSource}
          rowKey={(row) => row.id}
        />
      </Card>
    </div>
  );
};

export default ThingJoinedList;
