import OverdueAndCurrentProgress from "./OverdueAndCurrentProgress";
import useGetUnpaidAmount from "./OverdueAndCurrentProgress/useGetUnpaidAmount";

const PayablesOverview = ({}) => {
    const {overdueAmount, currentAmount} = useGetUnpaidAmount('purchase');
    return (
        <OverdueAndCurrentProgress 
            dropDownOptions={[
                {label:'New Bill', key:1},
                {label:'New Vendor Payment', key:2},
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
