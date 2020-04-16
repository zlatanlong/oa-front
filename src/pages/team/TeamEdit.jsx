import React from 'react';
import { Transfer, Switch, Table, Input, Card, Radio } from 'antd'

const TeamEdit = () => {
  return (
    <div>
      <Card style={{display:'flex'}}>
        创建小组
        <Input addonBefore={<span>小组名</span>} />
        <Radio.Group defaultValue={0}>
          <Radio value={0}>私有</Radio>
          <Radio value={1}>共有</Radio>
          <span color='green'>共有小组在创建事务时可被所有管理员选中</span>
        </Radio.Group>
      </Card>
      <Card>
        这里选择用户
      </Card>
    </div>
  );
}

export default TeamEdit;
