import { Link } from "react-router-dom";
import OverdueAndCurrentProgress from "./OverdueAndCurrentProgress";
import useGetUnpaidAmount from "./OverdueAndCurrentProgress/useGetUnpaidAmount";

const ReceivablesOverview = () => {
    const {overdueAmount, currentAmount} = useGetUnpaidAmount('sales');
    return (
        <OverdueAndCurrentProgress 
            dropDownOptions={[
                {label:<Link to='/app/home/invoices/new'>New Invoice</Link>, key:1},
                {label:<Link to='/app/home/paymentsreceived/new'>New Customer Payment</Link>, key:2},
            ]}
            title='Total Receivables'
            toolTip="Current and overdue amount that you're yet to receive from customers"
            current={currentAmount}
            overdue={overdueAmount}
            docType={'Invoice'}
        />
    );
};

export default ReceivablesOverview;
