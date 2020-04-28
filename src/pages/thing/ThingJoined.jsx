import {
  CalendarOutlined,
  TagOutlined,
  UploadOutlined,
  UserOutlined
} from '@ant-design/icons';
import {
  Button,
  Card,
  Divider,
  Form,
  Input,
  message,
  Typography,
  Upload
} from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import http from '../../utils/axios';
import ThingFileShow from '../../components/Thing/ThingFileShow';
import BreadNav from '../../components/Frame/BreadNav';

const { Title, Paragraph } = Typography;

const ThingJoined = ({ match, userInfo, location }) => {
  const [loading, setLoading] = useState(true);
  const [thing, setThing] = useState({});
  const [ifFinished, setIfFinished] = useState(null);
  const [thingReceiver, setThingReceiver] = useState({});
  const [uploadFileList, setUploadFileList] = useState([]);
  const [finishFileList, setFinishFileList] = useState([]);
  const [thingFileList, setThingFileList] = useState([]);

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 }
  };
  const tailLayout = {
    wrapperCol: { offset: 4, span: 16 }
  };

  useEffect(() => {
    getThingInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getThingInfo = () => {
    http
      .post('/thing/joined/get', {
        id: match.params.id
      })
      .then(res => {
        if (res.data.code === 0) {
          setThing(res.data.data.thing);
          setThingFileList(res.data.data.files);
          if (res.data.data.thing.needFinish === '1') {
            getIfFinished();
          } else {
            setLoading(false);
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getIfFinished = () => {
    http
      .post('/thing/ifFinished', {
        id: match.params.id
      })
      .then(res => {
        if (res.data.code === 0) {
          setIfFinished(res.data.data);
          if (res.data.data) {
            getFinishedThing();
          } else {
            setLoading(false);
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getFinishedThing = () => {
    console.log('userInfo', userInfo);
    http
      .post('/thing/finished/get', {
        thingId: parseInt(match.params.id, 10),
        // userId: userInfo.info.id
        // todo
        userId: 6
      })
      .then(res => {
        if (res.data.code === 0) {
          setThingReceiver(res.data.data.thingReceiver);
          setFinishFileList(res.data.data.files);
          setLoading(false);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const validFinish = () => {
    if (uploadFileList.length === 0) {
      message.warn('请选择文件');
      return false;
    }
    return true;
  };

  const onFinish = values => {
    if (validFinish()) {
      let data = new FormData();
      data.append('thingId', match.params.id);
      if (values.content) {
        data.append('content', values.content);
      }
      uploadFileList.forEach(file => {
        data.append('files', file);
      });
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };
      http
        .post('/thing/finish', data, config)
        .then(res => {
          if (res.data.code === 0) {
            setIfFinished(true);
            getFinishedThing();
            message.success('回复成功！');
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const fileUploadProps = {
    onRemove: file => {
      const index = uploadFileList.indexOf(file);
      const newFileList = uploadFileList.slice();
      newFileList.splice(index, 1);
      setUploadFileList(newFileList);
    },
    beforeUpload: file => {
      setUploadFileList([...uploadFileList, file]);
      return false;
    },
    fileList: uploadFileList
  };

  return (
    <>
      <BreadNav
        navs={[
          { url: '/thing/joinedlist', name: '日程表' },
          { url: location.pathname, name: thing.title }
        ]}
      />
      <Card loading={loading}>
        <Typography>
          <Title level={2}>{thing.title}</Title>
          <Paragraph>
            <div style={{ margin: '1rem 0' }}>
              <TagOutlined />
              <span style={{ margin: '0 30px 0 4px' }}>
                标签：{thing.tagName}
              </span>
              <UserOutlined />
              <span style={{ margin: '0 30px 0 4px' }}>
                发起人：{thing.realName}
              </span>
              <CalendarOutlined />
              <span style={{ margin: '0 30px 0 4px' }}>
                事务发布时间：
                {moment(thing.createTime).format('YYYY-MM-DD HH:mm')}
              </span>
            </div>
            <ul>
              {thing.startTime !== null && (
                <li>
                  事务开始时间：
                  {moment(thing.startTime).format('YYYY-MM-DD HH:mm')}
                </li>
              )}
              {thing.endTime !== null && (
                <li>
                  事务结束时间：
                  {moment(thing.endTime).format('YYYY-MM-DD HH:mm:ss')}
                </li>
              )}
              <li>
                是否需要完成：
                {thing.needFinish === '1' ? (
                  <span style={{ color: 'blue' }}>是</span>
                ) : (
                  '否'
                )}
              </li>
              {thing.needFinish === '1' && (
                <li>
                  是否需要回答：
                  {thing.needAnswer === '1' ? (
                    <span style={{ color: 'blue' }}>是</span>
                  ) : (
                    '否'
                  )}
                </li>
              )}
              {thing.needFinish === '1' && (
                <li>
                  是否需要回复文件：
                  {thing.needFileReply === '1' ? (
                    <span style={{ color: 'blue' }}>是</span>
                  ) : (
                    '否'
                  )}
                </li>
              )}
            </ul>
          </Paragraph>

          <Title level={4}>内容：</Title>
          <Paragraph>{thing.content}</Paragraph>
          {Array.isArray(thingFileList) && thingFileList.length > 0 && (
            <ThingFileShow files={thingFileList} />
          )}
        </Typography>
        {thing.needFinish === '1' && ifFinished === false && (
          <div>
            <Divider />
            <Title level={4}>回复：</Title>
            <Form name='joinThing' onFinish={onFinish} {...layout}>
              {thing.needFileReply === '1' && (
                <Form.Item label='选择文件上传'>
                  <Upload {...fileUploadProps}>
                    <Button>
                      <UploadOutlined />
                      点击上传(多次点击可以上传多个)
                    </Button>
                  </Upload>
                </Form.Item>
              )}
              <Form.Item label='回复内容' name='content'>
                <Input.TextArea />
              </Form.Item>
              <Form.Item {...tailLayout}>
                <Button type='primary' htmlType='submit'>
                  完成
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
        {thing.needFinish === '1' && ifFinished === true && (
          <div>
            <Title level={4} style={{ color: 'green' }}>
              已回复：
            </Title>
            {thingReceiver.content !== undefined &&
            thingReceiver.content !== '' &&
            thingReceiver.content !== null
              ? thingReceiver.content
              : ''}
            {Array.isArray(finishFileList) && finishFileList.length > 0 && (
              <ThingFileShow files={finishFileList} />
            )}
          </div>
        )}
      </Card>
    </>
  );
};

export default connect(({ userInfo }) => ({ userInfo }))(ThingJoined);
