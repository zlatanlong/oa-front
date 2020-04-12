import React, { useState, useEffect } from 'react';
import { Card, Button, Input, Radio, Checkbox, Modal, message, Tabs, Alert } from 'antd';

const CheckboxGroup = Checkbox.Group;
const { TabPane } = Tabs;


const Vote = () => {
  const [votesTitle] = useState('2018学习成绩统计');
  const [votes, setVotes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentVote, setCurrentVote] = useState({ type: 0, inputs: [], options: [], checkBoxs: [] });
  const [tempInput, setTempInput] = useState('');
  const [tempOption, setTempOption] = useState('');
  const [tempCheckBox, setTempCheckBox] = useState('');

  // 展示数据格式
  // let temp = [
  //   {
  //     title: '你的其中考试成绩如何?',
  //     type: 0,
  //     inputs: ['语文', '数学', '英语',]
  //   }, {
  //     title: '你觉得那个老师更好?',
  //     type: 1,
  //     options: ['语文老师', '数学老师', '政治老师',]
  //   }, {
  //     title: '你更喜欢哪个科目?',
  //     type: 2,
  //     checkBoxs: ['数学', '英语', '计算机']
  //   }
  // ]

  const onAddVote = () => {
    setModalVisible(true)
  }

  const handleOk = e => {
    votes.push(currentVote)
    setCurrentVote({ type: currentVote.type, inputs: [], options: [], checkBoxs: [] })
    setVotes([...votes])
    message.success('添加成功')
    setModalVisible(false)
  };

  const handleCancel = e => {
    setModalVisible(false)
  };

  useEffect(() => {
    let tempVotes = JSON.parse(localStorage.getItem('votes'));
    if (tempVotes !== undefined) {
      setVotes(tempVotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('votes', JSON.stringify(votes));
    message.info('已保存')
    // const myInterval = setInterval(() => {
    // }, 3000);
    // return () => { clearInterval(myInterval); }
  }, [votes]);



  return (
    <Card title={votesTitle} extra={<Button onClick={onAddVote}>添加题目</Button>}>
      <Modal
        title="添加题目"
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input addonBefore='问题编号' type='number' value={currentVote.number} onChange={e => { setCurrentVote({ ...currentVote, number: e.target.value }) }} />
        <Input addonBefore='问题题目' value={currentVote.title} onChange={e => { setCurrentVote({ ...currentVote, title: e.target.value }) }} />
        <Alert message="请选择以下三种题目类型之一" type="info" />
        <Tabs defaultActiveKey="0" onChange={key => { setCurrentVote({ ...currentVote, type: parseInt(key, 10) }) }}>
          <TabPane tab="填空题" key="0">
            <div style={{ display: "flex" }}>
              <Input placeholder='填空题目' value={tempInput} onChange={e => { setTempInput(e.target.value) }} size="small" />
              <Button onClick={() => { currentVote.inputs.push(tempInput); setCurrentVote({ ...currentVote, inputs: currentVote.inputs }); setTempInput('') }}>+</Button>
            </div>
            <span>已添加:</span>
            {currentVote.inputs.map(input => <Input placeholder={input} disabled />)}
          </TabPane>
          <TabPane tab="单选题" key="1">
            <div style={{ display: "flex" }}>
              <Input placeholder='选项内容' value={tempOption} onChange={e => { setTempOption(e.target.value) }} size="small" />
              <Button onClick={() => { currentVote.options.push(tempOption); setCurrentVote({ ...currentVote, options: currentVote.options }); setTempOption('') }}>+</Button>
            </div>
            <span>已添加:</span>
            {currentVote.options.map(option => <Radio disabled>{option}</Radio>)}
          </TabPane>
          <TabPane tab="多选题" key="2">
            <div style={{ display: "flex" }}>
              <Input placeholder='选项内容' value={tempCheckBox} onChange={e => { setTempCheckBox(e.target.value) }} size="small" />
              <Button onClick={() => { currentVote.checkBoxs.push(tempCheckBox); setCurrentVote({ ...currentVote, checkBoxs: currentVote.checkBoxs }); setTempCheckBox('') }}>+</Button>
            </div>
            <span>已添加:</span>
            {currentVote.checkBoxs.map(checkBox => <Checkbox disabled>{checkBox}</Checkbox>)}
          </TabPane>
        </Tabs>
      </Modal>
      {votes.map(vote => {
        switch (vote.type) {
          case 0:
            return (
              <Card title={vote.number + '.' + vote.title}>
                {vote.inputs.map(input => {
                  return (<Input addonBefore={input} size='small' disabled />)
                })}
              </Card>
            )
          case 1:
            return (
              <Card title={vote.number + '.' + vote.title}>
                <Radio.Group disabled>
                  {vote.options.map(option => {
                    return (<Radio value={option}>{option}</Radio>)
                  })}
                </Radio.Group>
              </Card>
            )
          case 2:
            return (
              <Card title={vote.number + '.' + vote.title}>
                <CheckboxGroup options={vote.checkBoxs} disabled />
              </Card>
            )
          default:
            return <div></div>;
        }
      })}
    </Card>
  );
}

export default Vote;  
