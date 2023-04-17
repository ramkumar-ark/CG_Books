import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const columns = [
  {
    title: 'NAME',
    dataIndex: 'name',
    className: 'tableHeader',
    // sorter: (a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
  },
  {
    title: 'COMPANY NAME',
    dataIndex: 'companyName',
    className: 'tableHeader',
    // sorter: (a, b) => a.companyName.toLowerCase().localeCompare(b.companyName.toLowerCase()),
  },
  {
    title: 'EMAIL',
    dataIndex: 'email',
    className: 'tableHeader',
  },
  {
    title: 'WORK PHONE',
    dataIndex: 'workPhone',
    className: 'tableHeader',
  },
  {
    title: 'RECEIVABLES',
    dataIndex: 'receivables',
    className: 'tableHeader',
    // sorter: (a, b) => a.receivables - b.receivables,
    render: (text, record, index) => `₹ ${Number(text || 0).toLocaleString('en-IN', {minimumFractionDigits:2})}`
  }
];

const CustomersTable = ({data, offsetHeader}) => {
  const history = useHistory();
  const [tableData , setTableData] = useState(data);
  useEffect(() => {setTableData(data)}, [data]);
  return (
    <Table columns={columns} dataSource={tableData} pagination={false}
      sticky={{offsetHeader:offsetHeader}} rowClassName='selectableTableRow' onRow={(record, rowIndex) => ({
        onClick: (event) => {history.push(`/app/home/customers/view/${record.id}`)}
      })}
    />);
}
export default CustomersTable;
