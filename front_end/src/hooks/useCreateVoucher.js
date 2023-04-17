import { useHistory } from "react-router-dom";
import { useCreateVoucherMutation } from "../service/transactionsApi";
import useSelectedOrg from "./useSelectedOrg";
import { Modal, Typography } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useEffect } from "react";

const { confirm } = Modal;
const { Text } = Typography;

export default function useCreateVoucher(){
    const history = useHistory();
    const {'_id': orgId} = useSelectedOrg();
    const [createVoucher, {isLoading, isSuccess:isCreated, error}] = useCreateVoucherMutation();
    const showModalOnSubmitFailed = () => {
        Modal.error({
            title:'Form Submission Failed', 
            content:<Text>
                {error?.data?.error==='Duplicate Voucher Number' 
                ? 'Voucher Number already exists. Please use a different Voucher Number.'
                : 'There was an error in submiting the form. Please try again later. If the error persists, contact support.'}
                </Text>,         
        });
    };
    useEffect(() => {
        isCreated && history.goBack();
        error && showModalOnSubmitFailed();
    }, [isCreated, error, history]);

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