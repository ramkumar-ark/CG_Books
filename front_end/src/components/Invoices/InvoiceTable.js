import { Table, Typography } from "antd";

const {Text} = Typography;

const invoiceStatusRenderer = (status, invoiceData) => {
    if (status === 'unPaid'){
        const today = Date.now();
        const dueDate = new Date(invoiceData.dueDate);
        const diffInDays = Math.floor((today-dueDate)/(1000*60*60*24));
        if (today > dueDate) 
            return <Text style={{color:'#f76831'}}>OVERDUE BY {diffInDays} DAYS</Text>
        else return <Text style={{color:'#408dfb'}}>DUE IN {diffInDays*-1} DAYS</Text>
    }else return <Text style={{color:'green'}}>PAID</Text>
};

const columns = [
    {
        title: 'DATE',
        dataIndex: 'date',
        sorter: (a, b) => a.date.toLowerCase().localeCompare(b.date.toLowerCase()),
        className: 'tableHeader',
        render:(text, record, index) => new Date(text).toLocaleDateString('en-IN', {year:'numeric', month:'2-digit', day:'2-digit'}),
    },
    {
        title: 'INVOICE NUMBER',
        dataIndex: 'invoiceNumber',
        sorter: (a, b) => a.invoiceNumber.toLowerCase().localeCompare(b.invoiceNumber.toLowerCase()),
        className: 'tableHeader',
    },
    {
        title: 'ORDER NUMBER',
        dataIndex: 'orderNumber',
        sorter: (a, b) => a.orderNumber.toLowerCase().localeCompare(b.orderNumber.toLowerCase()),
        className: 'tableHeader',
    },
    {
        title: 'CUSTOMER NAME',
        dataIndex: 'name',
        sorter: (a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
        className: 'tableHeader',
    },
    {
        title: 'STATUS',
        dataIndex: 'status',
        sorter:(a, b) => a.status.toLowerCase().localeCompare(b.status.toLowerCase()),
        render:(text, record, index) =>invoiceStatusRenderer(text, record),
        className: 'tableHeader',
    },
    {
        title: 'DUE DATE',
        dataIndex: 'dueDate',
        sorter:(a, b) => a.dueDate.toLowerCase().localeCompare(b.dueDate.toLowerCase()),
        className: 'tableHeader',
        render:(text, record, index) => new Date(text).toLocaleDateString('en-IN', {year:'numeric', month:'2-digit', day:'2-digit'}),
    },
    {
        title: 'AMOUNT',
        dataIndex: 'amount',
        sorter: (a, b) => a.amount - b.amount,
        className: 'tableHeader',
        render: (text, record, index) => `₹ ${Number(text).toLocaleString('en-IN', {minimumFractionDigits:2})}`,
    },
    {
        title: 'BALANCE DUE',
        dataIndex: 'balanceDue',
        sorter: (a, b) => a.balanceDue - b.balanceDue,
        className: 'tableHeader',
        render: (text, record, index) => `₹ ${Number(text).toLocaleString('en-IN', {minimumFractionDigits:2})}`,
    }
];

const InvoiceTable = ({tableData, onInvoiceRowClick, headerRef}) => {
    return (
        <Table 
            columns={columns} 
            dataSource={tableData} 
            sticky={{offsetHeader:headerRef.current?.clientHeight || 50}} 
            pagination={false}
            rowClassName='selectableTableRow'
            onRow={(record, rowIndex) => ({
                onClick: (event) => {onInvoiceRowClick(record.transactionId)},
            })}
        />
    );
};

export default InvoiceTable;
