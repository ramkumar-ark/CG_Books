import OverdueAndCurrentProgress from "./OverdueAndCurrentProgress";
import useGetUnpaidAmount from "./OverdueAndCurrentProgress/useGetUnpaidAmount";

const ReceivablesOverview = ({}) => {
    const {overdueAmount, currentAmount} = useGetUnpaidAmount('sales');
    return (
        <OverdueAndCurrentProgress 
            dropDownOptions={[
                {label:'New Invoice', key:1},
                {label:'New Customer Payment', key:2},
            ]}
            title='Total Receivables'
            toolTip="Current and overdue amount that you're yet to receive from customers"
            current={overdueAmount}
            overdue={currentAmount}
            docType={'Invoice'}
        />
    );
};

export default ReceivablesOverview;
