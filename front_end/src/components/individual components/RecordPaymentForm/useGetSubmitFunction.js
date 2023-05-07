import { Typography, Modal } from "antd";
const {Text} = Typography;
export default function useGetSubmitFunction(voucherType, onFinish) {
    const offsetVoucherType = voucherType === 'Receipt' ? 'Invoice' : 'Bill';
    const action = voucherType === 'Receipt' ? 'received' : 'paid';
    const ContentOfModalOnSubmit = ({summaryData}) => (
        summaryData.received > summaryData.used ? 
            <Text>
                The {voucherType} Amount of ₹ {(summaryData.received-summaryData.used).toLocaleString('en-IN', {minimumFractionDigits:2, maximumFractionDigits:2}) + " "} 
                 has not been used against any {offsetVoucherType}.  Do you want to treat the same as Advance?
            </Text> :
            <Text>
                Amount of ₹ {(summaryData.used-summaryData.received).toLocaleString('en-IN', {minimumFractionDigits:2, maximumFractionDigits:2}) + " "} 
                has been used in excess of {action} amount. Amount used against {offsetVoucherType}s cannot be greater than amount received.
            </Text>
    );
    const showModalOnSubmit = (values, summaryData) => {
        const isAdvance = summaryData.received>summaryData.used;
        Modal[isAdvance ? 'confirm' : 'error']({
          title: isAdvance ? 'Treat as Advance?' : 'Invalid Amount!',
          content: <ContentOfModalOnSubmit summaryData={summaryData}/>,
          onOk() {if (isAdvance) onFinish(values)},
        });
    };
    return showModalOnSubmit;
}
