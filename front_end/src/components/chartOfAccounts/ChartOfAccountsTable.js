import { Table } from 'antd';
import { useHistory, useLocation } from "react-router-dom";

const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a,b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
    },
    {
      title: 'Under',
      dataIndex: 'group',
      key: 'group',
      sorter: (a,b) => a.group.toLowerCase().localeCompare(b.group.toLowerCase()),
    },
    {
      title: 'Opening Balance',
      dataIndex: 'opBal',
      key: 'opBal',
      align: 'right',
      render: (text) => text !== 0 && `₹${Math.abs(text).toLocaleString('en-IN', {minimumFractionDigits:2})} ${text < 0 ? 'Cr' : 'Dr'}`,
      sorter: (a,b) => a['opBal'] - b['opBal'],
    },
    {
      title: 'Closing Balance',
      dataIndex: 'clBal',
      key: 'clBal',
      align: 'right',
      render: (text) => text !== 0 && `₹${Math.abs(text).toLocaleString('en-IN', {minimumFractionDigits:2})} ${text < 0 ? 'Cr' : 'Dr'}`,
      sorter: (a,b) => a['clBal'] - b['clBal'],
    }
];

const ChartOfAccountsTable = ({data, headerRef, onRowSelect}) => {
    const history = useHistory();
    const {pathname} = useLocation();
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        onRowSelect(selectedRowKeys);
      },
      getCheckboxProps: (record) => ({
        disabled: record.isReadOnly,
        name: record.name,
      }),
    };
    return (
        <Table
            rowSelection={{
            // type: selectionType,
            ...rowSelection,
            }}
            size='small'
            columns={columns}
            dataSource={data}
            pagination={false}
            sticky={{offsetHeader:(headerRef.current?.clientHeight || 0)+3}}
            rowClassName='selectableTableRow'
            onRow={(record, rowIndex) => ({
                onClick: () => {history.push(`${pathname}/${record.key}`)},
            })}
        />
    );
};

export default ChartOfAccountsTable;
