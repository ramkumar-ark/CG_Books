import { Table } from "antd";
import { useHistory } from "react-router-dom";

const VoucherTable = ({data, topOffset}) => {
    const history = useHistory();
    const columns = [
        {
            title: 'DATE',
            dataIndex: 'date',
            sorter: (a, b) => a.date-b.date,
            className: 'tableHeader',
            render:(text) => new Date(text).toLocaleDateString('en-IN', {year:'numeric', month:'2-digit', day:'2-digit'}),
        },
        {
            title: 'REFERENCE NUMBER',
            dataIndex: 'referenceNumber',
            sorter: (a, b) => a.referenceNumber.toLowerCase().localeCompare(b.referenceNumber.toLowerCase()),
            className: 'tableHeader',
        },
        {
            title: 'TYPE',
            dataIndex: 'voucherType',
            sorter: (a, b) => a.voucherType.toLowerCase().localeCompare(b.voucherType.toLowerCase()),
            className: 'tableHeader',
        },
        {
            title:'DEPOSITS',
            dataIndex: 'amount',
            render: (text) => text > 0 && `₹ ${Number(text).toLocaleString('en-IN', {minimumFractionDigits:2})}`,
            className: 'tableHeader',
        },
        {
            title:'WITHDRAWALS',
            dataIndex: 'amount',
            render: (text) => text < 0 && `₹ ${Number(text * -1).toLocaleString('en-IN', {minimumFractionDigits:2})}`,
            className: 'tableHeader',
        },
        {
            title: 'RUNNING BALANCE',
            dataIndex: 'runningBalance',
            render: (text) => `₹ ${Number(text).toLocaleString('en-IN', {minimumFractionDigits:2})}`,
            className: 'tableHeader',
        },
    ];
    const onClick = (record) => {
        switch (record.voucherType) {
            case 'journal':
                history.push('/app/home/manualjournals/' + record.id);
                break;
            case 'payment':
                history.push('/app/home/paymentsmade/' + record.id);
                break;
            case 'receipt':
                history.push('/app/home/paymentsreceived/' + record.id);
                break;
            default:
                break;
        }
    };
    return (
        <Table dataSource={data} columns={columns} sticky={{offsetHeader:topOffset}} pagination={false}
            rowClassName='selectableTableRow' onRow={(record) => ({
                onClick: () => {onClick(record)}
            })}
            loading={data === undefined}
        />
    );
};

export default VoucherTable;
