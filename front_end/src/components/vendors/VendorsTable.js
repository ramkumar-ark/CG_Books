import { useHistory, useLocation } from "react-router-dom";
import { Table } from "antd";

const VendorsTable = ({data, topOffset}) => {
    const history = useHistory();
    const {pathname} = useLocation();
    const columns = [
        {
          title: 'NAME',
          dataIndex: 'name',
          className: 'tableHeader',
          sorter: (a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
        },
        {
          title: 'COMPANY NAME',
          dataIndex: 'companyName',
          className: 'tableHeader',
          sorter: (a, b) => a.companyName.toLowerCase().localeCompare(b.companyName.toLowerCase()),
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
          title: 'PAYABLES',
          dataIndex: 'payables',
          className: 'tableHeader',
          sorter: (a, b) => a.payables - b.payables,
          render: (text) => `₹ ${Number(text || 0).toLocaleString('en-IN', {minimumFractionDigits:2})}`
        }
    ];
    return (
        <Table dataSource={data} columns={columns} sticky={{offsetHeader:topOffset}} pagination={false}
            rowClassName='selectableTableRow' style={{minWidth:460}} onRow={(record) => ({
                onClick: () => {history.push(`${pathname}/${record.id}`)}
            })}
        />
    );
};

export default VendorsTable;
