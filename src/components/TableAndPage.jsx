import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

const TableAndPage = ({ pageTotal, columns, dataSource, getPageData }) => {
  const pageCurrent = useRef(1);
  const pageSize = useRef(10);

  return (
    <Table
      pagination={{
        total: pageTotal,
        showTotal: (total, range) =>
          ` 共 ${total} 条，第 ${range[0]}-${range[1]} 条`,
        onChange: (page, pageSize) => {
          pageCurrent.current = page;
          getPageData(page, pageSize);
        },
        onShowSizeChange: (current, size) => {
          pageSize.current = size;
          pageCurrent.current = 1;
          getPageData(1, size);
        }
      }}
      columns={columns}
      dataSource={dataSource}
      rowKey={row => row.id}
    />
  );
};

TableAndPage.propTypes = {
  pageTotal: PropTypes.number.isRequired,
  columns: PropTypes.array.isRequired,
  dataSource: PropTypes.array.isRequired,
  getPageData: PropTypes.func.isRequired
};

export default TableAndPage;
