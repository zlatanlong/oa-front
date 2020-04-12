import React, { Component } from 'react';
import { Card, Table, Button, Popconfirm } from 'antd';

class Routines extends Component {
  constructor(props) {
    super(props)
    this.state = {
      columns: [
        {
          title: '序号',
          key: 'id',
          width: 80,
          align: 'center',
          render: (txt, record, index) => index + 1
        }, {
          title: '名字',
          dataIndex: 'name'
        }, {
          title: '价格',
          dataIndex: 'price'
        }, {
          title: '操作',
          render: (txt, record, index) => {
            return (
              <div>
                <Button type="primary" size="small">修改</Button>
                <Popconfirm title='确定删除此项？' onCancel={() => {console.log('用户取消删除')}} onConfirm={()=> {console.log('用户确定删除')
                }}>
                  <Button style={{ margin: "0 1rem" }} type="danger" size="small">删除</Button>
                </Popconfirm>
              </div>
            )
          }
        }
      ],
      dataSource: [
        {
          id: 1,
          name: '舒肤佳',
          price: 5
        }, {
          id: 2,
          name: '特仑苏',
          price: 6
        }, {
          id: 3,
          name: '小浣熊',
          price: 0.5
        },
      ]
    }
  }

  render() {
    return (
      <Card extra={<Button type="primary" onClick={()=>this.props.history.push('/admin/routines/edit')}>新增</Button>}>
        <Table columns={this.state.columns} dataSource={this.state.dataSource} bordered />
      </Card>
    );
  }
}

export default Routines;
