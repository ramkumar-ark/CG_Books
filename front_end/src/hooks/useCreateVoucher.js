import { useHistory } from "react-router-dom";
import { useCreateVoucherMutation } from "../service/transactionsApi";
import { Modal, Typography } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useCallback, useEffect } from "react";

const { confirm } = Modal;
const { Text } = Typography;

export default function useCreateVoucher(){
    const history = useHistory();
    const [createVoucher, {isLoading, isSuccess:isCreated, error}] = useCreateVoucherMutation();
    const showModalOnSubmitFailed = useCallback(() => {
        Modal.error({
            title:'Form Submission Failed', 
            content:<Text>
                {error?.data?.error==='Duplicate Voucher Number' 
                ? 'Voucher Number already exists. Please use a different Voucher Number.'
                : 'There was an error in submiting the form. Please try again later. If the error persists, contact support.'}
                </Text>,         
        });
    }, [error]);
    useEffect(() => {
        isCreated && history.goBack();
        error && showModalOnSubmitFailed();
    }, [isCreated, error, history, showModalOnSubmitFailed]);

    const showConfirm = (requestObject) => {
        confirm({
            title: `NEW ${requestObject.voucherType.toUpperCase()}`,
            icon: <ExclamationCircleFilled />,
            content: `Do you Want to create this ${requestObject.voucherType}?`,
            onOk() {
              createVoucher(requestObject);
            },
            onCancel() {
            },
        });
    };
    return [showConfirm, {isLoading, isCreated}];
}