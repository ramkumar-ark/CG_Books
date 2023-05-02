import { Popover, Table } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import { useHistory, useLocation } from "react-router-dom";

const columns = [
    {
        title: 'DATE',
        dataIndex: 'date',
        sorter: (a, b) => a.date-b.date,
        className: 'tableHeader',
        render:(text) => new Date(text).toLocaleDateString('en-IN', {year:'numeric', month:'2-digit', day:'2-digit'}),
    },
    {
        title: 'JOURNAL#',
        dataIndex: 'voucherNumber',
        sorter: (a, b) => a.voucherNumber.toLowerCase().localeCompare(b.voucherNumber.toLowerCase()),
        className: 'tableHeader',
    },
    {
        title: 'REFERENCE#',
        dataIndex: 'referenceNumber',
        sorter: (a, b) => a.referenceNumber.toLowerCase().localeCompare(b.referenceNumber.toLowerCase()),
        className: 'tableHeader',
    },
    {
        title: 'NOTES#',
        dataIndex: 'notes',
        className: 'tableHeader',
        render: (text) => (
            <Popover content={text} title='Notes'>
                <FileTextOutlined />
            </Popover>
        ),
    },
    {
        title: 'AMOUNT',
        dataIndex: 'amount',
        className: 'tableHeader',
        sorter: (a, b) => a.amount - b.amount,
        render: (text) => `₹ ${Number(text).toLocaleString('en-IN', {minimumFractionDigits:2})}`,
    }
];

const JournalsTable = ({tableData, topOffset}) => {
    const history = useHistory();
    const {pathname} = useLocation();
    return (
        <Table 
            dataSource={tableData} 
            columns={columns} 
            pagination={false} 
            sticky={{offsetHeader: topOffset}}
            rowClassName='selectableTableRow'
            onRow={(record) => ({
                onClick: () => {history.push(`${pathname}/${record.transactionId}`)}
            })}
        />
    );
};

export default JournalsTable;
