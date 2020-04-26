/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef } from 'react';
import {
  Card,
  Table,
  Form,
  Input,
  Button,
  Radio,
  Row,
  Col,
  Divider
} from 'antd';
import http from '../utils/axios';
import { userColomns } from '../utils/table-columns';
import { connect } from 'dva';

const UserSearchResult = props => {
  const pageCurrent = useRef(1);
  const pageSize = useRef(10);
  const [pageTotal, setPageTotal] = useState(0);
  let [form] = Form.useForm();
  const [queryData, setQueryData] = useState({});
  const [pageData, setPageData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const identityOptions = [
    { name: '学生', value: 0 },
    { name: '老师', value: 1 },
    { name: '院长', value: 2 }
  ];
  const columns = [...userColomns];

  const getPageData = queryData => {
    http
      .post('/user/getUsers', {
        pageCurrent: pageCurrent.current,
        pageSize: pageSize.current,
        data: queryData
      })
      .then(res => {
        if (res.data.code === 0) {
          setPageData(res.data.data.records);
          setPageTotal(res.data.data.total);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onFinish = values => {
    pageCurrent.current = 1;
    pageSize.current = 10;
    setQueryData(values);
    getPageData(values);
  };

  const queryList = [
    { name: 'number', label: '学号/工号' },
    { name: 'realName', label: '姓名' },
    { name: 'collegeName', label: '学院' },
    { name: 'majorName', label: '专业' },
    { name: 'className', label: '班级' }
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: selectedRowKeys => {
      setSelectedRowKeys(selectedRowKeys);
      props.getSelectIds(selectedRowKeys);
    }
  };

  return (
    <div>
      <Card>
        <Form
          form={form}
          name='advanced_search'
          onFinish={onFinish}
          className='ant-advanced-search-form'>
          <Row gutter={24}>
            {queryList.map(query => {
              return (
                <Col span={8} key={query.name}>
                  <Form.Item name={query.name} label={query.label}>
                    <Input placeholder={query.label} />
                  </Form.Item>
                </Col>
              );
            })}
            <Col span={8}>
              <Form.Item name='identity' label='身份'>
                <Radio.Group>
                  {identityOptions.map(option => {
                    return (
                      <Radio value={option.value} key={option.value}>
                        {option.name}
                      </Radio>
                    );
                  })}
                </Radio.Group>
              </Form.Item>
            </Col>
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
        已选中 <span style={{ color: 'blue' }}>{selectedRowKeys.length}</span>{' '}
        人。
        <Button
          onClick={() => {
            setSelectedRowKeys([]);
            props.getSelectIds([]);
          }}
          type='link'
          style={{ float: 'right' }}>
          清除已选
        </Button>
        <Divider />
        <Table
          pagination={{
            total: pageTotal,
            showTotal: (total, range) =>
              ` 共 ${total} 条，第 ${range[0]}-${range[1]} 条`,
            onChange: (page, pageSize) => {
              pageCurrent.current = page;
              getPageData(queryData);
            },
            onShowSizeChange: (current, size) => {
              pageSize.current = size;
              pageCurrent.current = 1;
              getPageData(queryData);
            }
          }}
          columns={columns}
          dataSource={pageData}
          rowKey={row => row.id}
          rowSelection={rowSelection}
        />
      </Card>
    </div>
  );
};

export default connect(({ addThing }) => ({ addThing }))(UserSearchResult);
