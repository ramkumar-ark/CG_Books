import { Link } from "react-router-dom";
import OverdueAndCurrentProgress from "./OverdueAndCurrentProgress";
import useGetUnpaidAmount from "./OverdueAndCurrentProgress/useGetUnpaidAmount";

const PayablesOverview = () => {
    const {overdueAmount, currentAmount} = useGetUnpaidAmount('purchase');
    return (
        <OverdueAndCurrentProgress 
            dropDownOptions={[
                {label:<Link to='/app/home/bills/new'>New Bill</Link>, key:1},
                {label:<Link to='/app/home/paymentsmade/new'>New Vendor Payment</Link>, key:2},
            ]}
            title='Total Payables'
            toolTip="Current and overdue amount that you're yet to pay your vendors"
            current={currentAmount}
            overdue={overdueAmount}
            docType={'Bill'}
        />
    );
};

export default PayablesOverview;
