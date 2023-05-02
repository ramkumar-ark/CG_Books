import { Table } from 'antd';
import { useHistory, useLocation } from "react-router-dom";

const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a,b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
    },
    {
      title: 'Under',
      dataIndex: 'group',
      sorter: (a,b) => a.group.toLowerCase().localeCompare(b.group.toLowerCase()),
    },
    {
      title: 'Opening Balance',
      dataIndex: 'opBal',
      align: 'right',
      render: (text) => text !== 0 && `₹${Math.abs(text).toLocaleString('en-IN', {minimumFractionDigits:2})} ${text < 0 ? 'Cr' : 'Dr'}`,
      sorter: (a,b) => a['opBal'] - b['opBal'],
    },
    {
      title: 'Closing Balance',
      dataIndex: 'clBal',
      align: 'right',
      render: (text) => text !== 0 && `₹${Math.abs(text).toLocaleString('en-IN', {minimumFractionDigits:2})} ${text < 0 ? 'Cr' : 'Dr'}`,
      sorter: (a,b) => a['clBal'] - b['clBal'],
    }
];

// rowSelection object indicates the need for row selection
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
};

const ChartOfAccountsTable = ({data, headerRef}) => {
    const history = useHistory();
    const {pathname} = useLocation();
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
            sticky={{offsetHeader:headerRef.current?.clientHeight+3}}
            rowClassName='selectableTableRow'
            onRow={(record, rowIndex) => ({
                onClick: () => {history.push(`${pathname}/${record.key}`)},
            })}
        />
    );
};

export default ChartOfAccountsTable;
