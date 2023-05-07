import { Spin } from "antd";
import HeaderForRecordPaymentPage from "./HeaderRecordPayment";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import useGetDataForRecordPaymentForm from "../../hooks/useGetDataForRecordPaymentForm";
import RecordPaymentForm from "../individual components/RecordPaymentForm/RecordPaymentForm";

const RecordPaymentMade = () => {
    const headerRef = useRef(null);
    const {transactionId} = useParams();
    const {isLoading, ...dataForForm} = useGetDataForRecordPaymentForm('Payment', transactionId);
    return (
        <Spin spinning={isLoading}>
            <HeaderForRecordPaymentPage componentref={headerRef} topOffset={0} titleLevel={3}/>
            {!isLoading && <RecordPaymentForm  {...dataForForm}/>}
        </Spin>
    );
};

export default RecordPaymentMade;
