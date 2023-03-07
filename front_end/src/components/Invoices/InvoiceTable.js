import { Table } from "antd";
import { useContext, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { useGetSelectedOrgQuery } from "../../service/appApi";
import { useGetVouchersQuery } from "../../service/transactionsApi";
import useAuthentication from "../../useAuthentication";

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

const InvoiceTable = () => {
    const history = useHistory();
    const { AuthCtx } = useAuthentication();
    const { user } = useContext(AuthCtx);
    const {data:org} = useGetSelectedOrgQuery(user.id);
    // get invoice data
    const orgId = org?.selectedOrg?.['_id'];
    const {data} = useGetVouchersQuery({orgId, voucher:'Sales'}, {skip: !orgId});
    
    return (
        <Table 
            columns={columns} 
            dataSource={data?.vouchers || []} sticky={{offsetHeader:135}} 
            pagination={false}
            rowClassName='selectableTableRow'
            onRow={(record, rowIndex) => ({
                onClick: (event) => {history.push(`/app/home/invoices/${record.transactionId}`)},
            })}
        />
    );
};

export default InvoiceTable;
