import React, { useState } from 'react';

import { Steps, Button, message, Card } from 'antd';
import { connect } from 'dva';
import ThingAddInfo from '../../components/Thing/ThingAddInfo';
import ThingAddTag from '../../components/Thing/ThingAddTag';

const { Step } = Steps;

const ThingAdd = ({ addThing, dispatch }) => {
  const [current, setCurrent] = useState(0);

  const saveThingChange = (value, key) => {
    dispatch({
      type: 'addThing/save',
      payload: {
        [key]: value
      }
    });
  };

  const steps = [
    {
      key: 1,
      title: '基本信息',
      content: <ThingAddInfo saveThingChange={saveThingChange} />
    },
    {
      key: 2,
      title: '选择标签',
      content: <ThingAddTag saveThingChange={saveThingChange} />
    },
    {
      key: 3,
      title: '选择事务接收人',
      content: '选择事务接收人'
    },
    {
      key: 4,
      title: '创建问答',
      content: '创建问答'
    },
    {
      key: 5,
      title: '发布事务',
      content: '发布事务'
    }
  ];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const onChange = cur => {
    setCurrent(cur);
  };

  const handleAddThing = () => {
    console.log('addThing', addThing);
    message.success('发布成功！');
  };

  return (
    <div>
      <Card>
        <Steps current={current} onChange={onChange}>
          {steps
            .filter(step =>
              addThing.showStepKeys.indexOf(step.key) === -1 ? false : true
            )
            .map(item => (
              <Step key={item.key} title={item.title} />
            ))}
        </Steps>
      </Card>
      <Card>
        {
          steps.filter(step =>
            addThing.showStepKeys.indexOf(step.key) === -1 ? false : true
          )[current].content
        }
        <div style={{ margin: '10px 0 0 0' }}>
          {current < addThing.showStepKeys.length - 1 && (
            <Button type='primary' onClick={() => next()}>
              下一步
            </Button>
          )}
          {current === addThing.showStepKeys.length - 1 && (
            <Button type='primary' onClick={() => handleAddThing()}>
              确定发布
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: 8 }} onClick={() => prev()}>
              上一步
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default connect(({ addThing }) => ({ addThing }))(ThingAdd);
