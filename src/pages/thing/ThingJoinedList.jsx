import React, { useEffect, useState } from 'react';
import http from '../../utils/axios';
import { Card, Form, Row, Col, Radio, Button } from 'antd';
import TableAndPage from '../../components/TableAndPage.jsx';
import moment from 'moment';

const ThingJoinedList = ({ history }) => {
  const [form] = Form.useForm();
  const [pageTotal, setPageTotal] = useState(0);
  const [queryData, setQueryData] = useState({});
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getJoinedThings(1, 10);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatDate = date => {
    if (date === null) {
      return '无';
    }
    return moment(date).format('M月D日 HH:mm');
  };

  const map01toNY = text => {
    return text === '1' ? '是' : <span style={{ color: 'red' }}>否</span>;
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
      )
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
      dataIndex: 'hasFinished',
      render: (text, record) => {
        if (record.needFinish === '0') {
          return '不需要';
        }
        return map01toNY(text);
      }
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

  const getJoinedThings = (pageCurrent, pageSize, data) => {
    setLoading(true);
    console.log('queryData', queryData);
    http
      .post('/thing/joinedList', {
        pageCurrent,
        pageSize,
        data
      })
      .then(res => {
        if (res.data.code === 0) {
          setPageTotal(res.data.data.total);
          const tempData = res.data.data.records.map(record => ({
            ...record.thing,
            hasFinished: record.hasFinished,
            hasRead: record.hasRead
          }));
          setDataSource(tempData);
          setLoading(false);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onFinish = values => {
    setQueryData(values);
    // console.log('queryData', queryData);
    getJoinedThings(1, 10, values);
  };

  const ynOptions = [
    {
      name: '否',
      value: '0'
    },
    {
      name: '是',
      value: '1'
    }
  ];
  const queryRadios = [
    { name: 'hasRead', label: '是否阅读？' },
    { name: 'hasFinished', label: '是否完成？' }
  ];

  return (
    <div>
      <Card>
        <Form
          form={form}
          name='advanced_search'
          onFinish={onFinish}
          className='ant-advanced-search-form'>
          <Row gutter={24}>
            {queryRadios.map(radio => {
              return (
                <Col key={radio.name} span={8}>
                  <Form.Item name={radio.name} label={radio.label}>
                    <Radio.Group>
                      {ynOptions.map(option => {
                        return (
                          <Radio value={option.value} key={option.value}>
                            {option.name}
                          </Radio>
                        );
                      })}
                    </Radio.Group>
                  </Form.Item>
                </Col>
              );
            })}
          </Row>
          <Row>
            <Col
              span={24}
              style={{
                textAlign: 'right'
              }}>
              <Button type='primary' htmlType='submit'>
                查询
              </Button>
              <Button
                style={{ margin: '0 8px' }}
                onClick={() => {
                  form.resetFields();
                }}>
                重置
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card>
        <TableAndPage
          pageTotal={pageTotal}
          dataSource={dataSource}
          columns={columns}
          getPageData={(pageCurrent, pageSize) => {
            getJoinedThings(pageCurrent, pageSize);
          }}
          loading={loading}
        />
      </Card>
    </div>
  );
};

export default ThingJoinedList;
