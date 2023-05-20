import { useHistory } from "react-router-dom";
import useGetVouchers from "../../hooks/useGetVouchers";
import { useEffect, useMemo, useState } from "react";
import usePrevious from "../../hooks/usePrevious";

export default function useGetInvoiceTableData(){
    const history = useHistory();
    const { vouchers, refetchVouchers} = useGetVouchers('Sales');
    const tableData = useMemo(() => vouchers?.map(e => ({...e, invoiceNumber:e.voucherNumber, orderNumber:e.referenceNumber,
        balanceDue:e.pendingAmount,})) || [], [vouchers]);
    const [invoiceTableData, setInvoiceTableData] = useState(tableData);
    const prevTableData = usePrevious(tableData);
    useEffect(() => {
        if (JSON.stringify(tableData) !== JSON.stringify(prevTableData)) setInvoiceTableData(tableData)
    }, [tableData, prevTableData]);
    const filterTableData = (filterProp) => {
        switch (filterProp) {
            case 'All':
                setInvoiceTableData(tableData);
                break;
            case 'Unpaid':
                setInvoiceTableData(tableData.filter(e => e.balanceDue>0));
                break;
            case 'Paid':
                setInvoiceTableData(tableData.filter(e => e.balanceDue === 0));
                break;
            case 'Partially Paid':
                setInvoiceTableData(tableData.filter(
                    e => (e.amount - e.pendingAmount) > 0 && e.pendingAmount !== 0)
                );
                break;
            case 'Overdue':
                const today = Date.now();
                setInvoiceTableData(tableData.filter(e => today > e.dueDate));
                break;
            default:
                setInvoiceTableData(tableData);
                break;
        }
    };
    const onInvoiceRowClick = (transactionId) => {
        history.push(`/app/home/invoices/view/${transactionId}`);
    };
    return {invoiceTableData, filterTableData, refetchVouchers, onInvoiceRowClick};
}