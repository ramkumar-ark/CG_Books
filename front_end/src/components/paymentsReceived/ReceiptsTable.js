import { Table } from "antd";
import { useHistory, useLocation } from "react-router-dom";

const ReceiptsTable = ({data}) => {
    const history = useHistory();
    const {pathname} = useLocation();
    const columns = [
        {
            title: 'DATE',
            dataIndex: 'date',
            sorter: (a, b) => a.date-b.date,
            className: 'tableHeader',
            render:(text) => new Date(text).toLocaleDateString('en-IN', {year:'numeric', month:'2-digit', day:'2-digit'}),
        },
        {
            title: 'RECEIPT#',
            dataIndex: 'voucherNumber',
            sorter: (a, b) => a.voucherNumber.toLowerCase().localeCompare(b.voucherNumber.toLowerCase()),
            className: 'tableHeader',
        },
        {
            title: 'REFERENCE NUMBER',
            dataIndex: 'referenceNumber',
            sorter: (a, b) => a.referenceNumber.toLowerCase().localeCompare(b.referenceNumber.toLowerCase()),
            className: 'tableHeader',
        },
        {
            title: 'CUSTOMER NAME',
            dataIndex: 'name',
            sorter: (a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
            className: 'tableHeader',
        },
        {
            title: 'INVOICE#',
            dataIndex: 'offsetTransactions',
            render: (text, record, index) => text.map(e => e.voucherNumber).toString(),
            className: 'tableHeader',
        },
        {
            title: 'MODE',
            dataIndex: 'receiptMode',
            sorter:(a, b) => a.receiptMode.toLowerCase().localeCompare(b.receiptMode.toLowerCase()),
            className: 'tableHeader',
        },
        {
            title: 'AMOUNT',
            dataIndex: 'amount',
            sorter: (a, b) => a.amount - b.amount,
            className: 'tableHeader',
            render: (text) => `₹ ${Number(text).toLocaleString('en-IN', {minimumFractionDigits:2})}`,
        },
        {
            title: 'UNUSED AMOUNT',
            dataIndex: 'pendingAmount',
            sorter: (a, b) => a.pendingAmount - b.pendingAmount,
            className: 'tableHeader',
            render: (text) => `₹ ${Number(text).toLocaleString('en-IN', {minimumFractionDigits:2})}`,
        }
    ];
    return (
        <Table dataSource={data} columns={columns} sticky={{offsetHeader:64+75}} pagination={false}
            rowClassName='selectableTableRow' onRow={(record) => ({
                onClick: () => {history.push(`${pathname}/${record.transactionId}`)}
            })}
        />
    );
};

export default ReceiptsTable;
