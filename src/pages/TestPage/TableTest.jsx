import React, { useRef, useState } from 'react';
import { Table, Radio, Divider, Input, Button } from 'antd';
import styled from 'styled-components';

const StyledTools = styled.div`
  display: flex;
  max-width: 300px;
`;

const StyledTable = styled(Table)`
  width: 300px;
`;

const columns = [
  {
    title: 'Номер вагона',
    dataIndex: 'nv',
  },
];
const defaultRows = [
  {
    key: '1',
    nv: '11111111',
  },
  {
    key: '2',
    nv: '22222222',
  },
  {
    key: '3',
    nv: '33333333',
  },
  {
    key: '4',
    nv: '44444444',
  },
]; // rowSelection object indicates the need for row selection

const TableTest = () => {
  const [rows, setRows] = useState(defaultRows);
  const addRef = useRef();

  const handleClickAdd = (event) => {
    console.log('e:', event.target);
    console.log('ref:', addRef.current.state.value);

    const current = rows;
  };

  const handleClickDelete = () => {
    console.log('delete:');
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows
      );
    },
  };

  return (
    <div>
      <StyledTools>
        <Input.Group compact>
          <Input
            style={{ width: '100px' }}
            defaultValue="23232323"
            ref={addRef}
          />
          <Button type="primary" onClick={handleClickAdd}>
            Add
          </Button>
        </Input.Group>

        <Button
          type="primary"
          onClick={handleClickDelete}
          style={{ margin: '5px,0,0,0' }}
        >
          Delete
        </Button>
      </StyledTools>

      <StyledTable
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        columns={columns}
        dataSource={rows}
        scroll={{ y: 240 }}
      />
    </div>
  );
};

export default TableTest;
