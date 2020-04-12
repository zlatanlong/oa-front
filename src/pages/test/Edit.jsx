import React from 'react';
import { Form, Card, Input, Button, Checkbox } from 'antd';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const Edit = (props) => {
  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Card>

      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item label='名字' name='haha' rules={[{ required: true, message: '请输入商品名!' }]} >
          <Input placeholder='请输入商品名' />
        </Form.Item>
        <Form.Item
          label="价格" name="price" rules={[
            {
              required: true,
              message: '请输入商品价格!',
            },
          ]}
        >
          <Input />
        </Form.Item>


        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
        </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default Edit;
