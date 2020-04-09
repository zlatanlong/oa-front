/* eslint-disable no-template-curly-in-string */
import React, { useState } from 'react';
import { Button, Upload, message, Table } from 'antd';
import XLSX from 'xlsx';


const UserAdd = () => {
  const [columns, setColumns] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [fileList, setFileList] = useState([]);

  const props = {
    beforeUpload: file => {
      setFileList([file]);
      file.arrayBuffer().then(
        res => {
          let workbook = XLSX.read(res, { type: 'buffer', cellHTML: false, });
          let sheet = workbook.Sheets.Sheet1;
          let tempData = {}; // {1:{A:,B:,}} 指第1行的数据，A列是啥，B列是啥
          let tempColumns = [];
          let tempTableData = [];
          // 解析sheet为tempData
          for (const key in sheet) {
            if (sheet.hasOwnProperty(key) && key !== '!ref' && key !== '!margins') {
              const cell = sheet[key];
              if (!tempData.hasOwnProperty(key.substring(1))) {
                tempData[key.substring(1)] = {};
              }
              tempData[key.substring(1)][key.charAt(0)] = cell.v
            }
          }
          // tempData第一行是题头
          for (const key in tempData) {
            if (tempData.hasOwnProperty(key) && key === '1') {
              // 第一行
              const row = tempData[key];
              for (const key in row) {
                if (row.hasOwnProperty(key)) {
                  const element = row[key];
                  tempColumns.push({
                    title: element,
                    dataIndex: key,
                    key: key,
                  })
                }
              }
            } else if (tempData.hasOwnProperty(key)) {
              // 其他行
              const row = tempData[key];
              tempTableData.push({
                ...row,
                key: row['A']
              })
            }
          }
          setColumns(tempColumns);
          setDataSource(tempTableData);
          message.success('处理成功！')
        }
      )
      return false;
    },
    fileList
  };

  return (
    <div>
      <Upload {...props}>
        <Button>
          点击上传excel文件
        </Button>
      </Upload>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
}

export default UserAdd;
