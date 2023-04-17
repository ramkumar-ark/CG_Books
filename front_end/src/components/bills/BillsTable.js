import { useHistory, useLocation } from "react-router-dom";
import VoucherStatus from "../individual components/VoucherStatus";
import { Table } from "antd";

const BillsTable = ({data, topOffset}) => {
    const history = useHistory();
    const {pathname} = useLocation();
    const columns = [
        {
            title: 'DATE',
            dataIndex: 'date',
            className: 'tableHeader',
            render: (text) => new Date(text).toLocaleDateString('en-IN', {day:'2-digit', month:'2-digit', year:'numeric'}),
        },
        {
            title: 'BILL#',
            dataIndex: 'referenceNumber',
            className: 'tableHeader',
        },
        {
            title: 'REFERENCE NUMBER',
            dataIndex: 'orderNumber',
            className: 'tableHeader',
        },
        {
            title: 'VENDOR NAME',
            dataIndex: 'name',
            className: 'tableHeader',
        },
        {
            title: 'STATUS',
            dataIndex: 'status',
            className: 'tableHeader',
            render: (text, record) => <VoucherStatus voucherData={record}/>,
        },
        {
            title: 'DUE DATE',
            dataIndex: 'dueDate',
            className: 'tableHeader',
            render: (text) => new Date(text).toLocaleDateString('en-IN', {day:'2-digit', month:'2-digit', year:'numeric'}),
        },
        {
            title: 'AMOUNT',
            dataIndex: 'amount',
            className: 'tableHeader',
            render: (text) => `₹ ${Number(text).toLocaleString('en-IN', {minimumFractionDigits:2})}`,
        },
        {
            title: 'BALANCE DUE',
            dataIndex: 'pendingAmount',
            className: 'tableHeader',
            render: (text) => `₹ ${Number(text).toLocaleString('en-IN', {minimumFractionDigits:2})}`,
        }
    ];
    return (
        <Table 
            columns={columns} 
            dataSource={data} 
            sticky={{offsetHeader:topOffset || 50}} 
            pagination={false}
            rowClassName='selectableTableRow'
            onRow={(record, rowIndex) => ({
                onClick: () => {history.push(`${pathname}/${record.transactionId}`)},
            })}
        />
    );
};

export default BillsTable;
