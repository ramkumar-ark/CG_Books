import { Table } from 'antd';
import { useHistory } from 'react-router-dom';

const columns = [
  {
    title: 'NAME',
    dataIndex: 'name',
    sorter: (a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
  },
  {
    title: 'COMPANY NAME',
    dataIndex: 'companyName',
    sorter: (a, b) => a.companyName.toLowerCase().localeCompare(b.companyName.toLowerCase()),
  },
  {
    title: 'EMAIL',
    dataIndex: 'email',
  },
  {
    title: 'WORK PHONE',
    dataIndex: 'workPhone',
  },
  {
    title: 'RECEIVABLES',
    dataIndex: 'receivables',
    sorter: (a, b) => a.receivables - b.receivables,
    render: (text, record, index) => `₹ ${Number(text || 0).toLocaleString('en-IN', {minimumFractionDigits:2})}`
  }
];
const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};
const CustomersTable = ({data}) => {
  const history = useHistory();  
  return (
    <Table columns={columns} dataSource={data} onChange={onChange} 
      sticky={{offsetHeader:135}} rowClassName='selectableTableRow' onRow={(record, rowIndex) => ({
        onClick: (event) => {history.push(`/app/home/customers/view/${record.id}`)}
      })}
    />);
}
export default CustomersTable;
