import React from 'react';
import { connect } from 'dva';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

const ThingAddShow = ({ addThing }) => {
  return (
    <Typography>
      <Title level={3}>标题：{addThing.title}</Title>
      <Title level={4}>基本信息：</Title>
      <Paragraph>
        <ul>
          <li>标签：{addThing.tagName}</li>
          {addThing.userTeam && <li>接受小组：{addThing.teamName}</li>}
          {!addThing.userTeam && (
            <li>接收成员：{addThing.receiverIds.length}人</li>
          )}
          {addThing.startTime !== null && (
            <li>开始时间：{addThing.startTime.format('YYYY-MM-DD HH:mm')}</li>
          )}
          {addThing.endTime !== null && (
            <li>结束时间：{addThing.endTime.format('YYYY-MM-DD HH-mm-ss')}</li>
          )}
          <li>是否需要完成？ {addThing.needFinish === '1' ? '是' : '否'}</li>
          {addThing.needFinish === '1' && (
            <li>是否需要回答？ {addThing.needAnswer === '1' ? '是' : '否'}</li>
          )}
          {addThing.hasSendFile === '1' && (
            <li>已选择{addThing.files.length}个文件</li>
          )}
        </ul>
      </Paragraph>
      <Title level={4}>内容：</Title>
      <Paragraph>{addThing.content}</Paragraph>
    </Typography>
  );
};

export default connect(({ addThing }) => ({ addThing }))(ThingAddShow);
