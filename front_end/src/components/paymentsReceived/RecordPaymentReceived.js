import { Spin } from "antd";
import HeaderRecordReceipt from "./HeaderRecordReceipt";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import useGetDataForRecordPaymentForm from "../../hooks/useGetDataForRecordPaymentForm";
import RecordPaymentForm from "../individual components/RecordPaymentForm/RecordPaymentForm";

const RecordPaymentReceived = () => {
    const headerRef = useRef(null);
    const {transactionId} = useParams();
    const {isLoading, ...dataForForm} = useGetDataForRecordPaymentForm('Receipt', transactionId);
    return (
        <Spin spinning={isLoading}>
            <HeaderRecordReceipt componentref={headerRef} topOffset={0} titleLevel={3}/>
            {!isLoading && <RecordPaymentForm  {...dataForForm}/>}
        </Spin>
    );
};

export default RecordPaymentReceived;
