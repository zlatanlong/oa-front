import { Button, Card, Form, Input, message, Modal, Radio } from 'antd';
import React, { useState } from 'react';

const Vote = () => {
  const [questionForm] = Form.useForm();
  const [optionForm] = Form.useForm();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questModalVisible, setQuestionModalVisible] = useState(false);
  const [optionModalVisible, setOptionModalVisible] = useState(false);

  const handleCreateQuestionOk = e => {
    questionForm
      .validateFields()
      .then(value => {
        questionForm.resetFields();
        setQuestions([...questions, value]);
        setQuestionModalVisible(false);
        message.success('添加成功');
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const handleAddOption = () => {
    optionForm
      .validateFields()
      .then(values => {
        optionForm.resetFields();
        let tempQuestions = questions;
        const tempOptions = tempQuestions[currentIndex].options;
        tempQuestions[currentIndex].options =
          tempOptions === undefined
            ? [values]
            : [...tempQuestions[currentIndex].options, values];
        setQuestions(tempQuestions);
        setOptionModalVisible(false);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const questionModal = (
    <Modal
      title='添加题目'
      visible={questModalVisible}
      onOk={handleCreateQuestionOk}
      onCancel={() => setQuestionModalVisible(false)}>
      <Form
        form={questionForm}
        name='questionForm'
        onValuesChange={(_, { replyType }) => {
          // console.log(replyType);
        }}
        initialValues={{ replyType: 1 }}>
        <Form.Item
          name='title'
          label='问题类型'
          rules={[
            {
              required: true,
              message: '请输入问题题目!'
            }
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          name='replyType'
          label='问题题目'
          rules={[
            {
              required: true,
              message: '请选择问题类型!'
            }
          ]}>
          <Radio.Group
            onChange={e => {
              console.log(e.target.value);
            }}>
            <Radio value={1}>单选</Radio>
            <Radio value={2}>多选</Radio>
            <Radio value={3}>数字填空</Radio>
            <Radio value={4}>常规填空</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );

  const optionModal = (
    <Modal
      title={`为${
        questions[currentIndex] ? questions[currentIndex].title : ''
      }添加选项`}
      visible={optionModalVisible}
      onOk={handleAddOption}
      onCancel={() => {
        setOptionModalVisible(false);
      }}>
      <Form form={optionForm} name='optionForm'>
        <Form.Item
          name='content'
          label='选项内容'
          rules={[
            {
              required: true,
              message: '请输入选项内容!'
            }
          ]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );

  return (
    <Card
      title='添加提问'
      extra={
        <Button
          onClick={() => {
            setQuestionModalVisible(true);
          }}>
          添加题目
        </Button>
      }>
      {questionModal}
      {optionModal}
      {questions.map((question, index) => {
        return (
          <div key={question.title}>
            <span>
              {index + 1}. {question.title}
            </span>
            <Button
              onClick={() => {
                setCurrentIndex(index);
                setOptionModalVisible(true);
              }}>
              添加选项
            </Button>
            {question.options !== undefined &&
              question.options.map(option => (
                <span key={option.content}>{option.content}</span>
              ))}
          </div>
        );
      })}
      {/* {votes.map(vote => {
        switch (vote.type) {
          case 0:
            return (
              <Card title={vote.number + '.' + vote.title}>
                {vote.inputs.map(input => {
                  return <Input addonBefore={input} size='small' disabled />;
                })}
              </Card>
            );
          case 1:
            return (
              <Card title={vote.number + '.' + vote.title}>
                <Radio.Group disabled>
                  {vote.options.map(option => {
                    return <Radio value={option}>{option}</Radio>;
                  })}
                </Radio.Group>
              </Card>
            );
          case 2:
            return (
              <Card title={vote.number + '.' + vote.title}>
                <CheckboxGroup options={vote.checkBoxs} disabled />
              </Card>
            );
          default:
            return <div></div>;
        }
      })} */}
    </Card>
  );
};

export default Vote;
