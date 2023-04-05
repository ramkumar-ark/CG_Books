import { useHistory } from "react-router-dom";
import { useUpdateVoucherEntryMutation } from "../service/transactionsApi";
import useSelectedOrg from "./useSelectedOrg";
import { Modal, Typography } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useEffect } from "react";

const { confirm } = Modal;
const { Text } = Typography;

export default function useUpdateVoucher(transactionId, oldVoucherData){
    const history = useHistory();
    const {'_id': orgId} = useSelectedOrg();
    const [updateVoucher, {isLoading, isSuccess:isUpdated, error}] = useUpdateVoucherEntryMutation();
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
        isUpdated && history.goBack();
        error && showModalOnSubmitFailed();
    }, [isUpdated, error, history]);
    const onUpdateVoucher = (newVoucherData) => {
        const requestObject = {
            params: {orgId, transactionId, otherDetailsId: oldVoucherData.otherDetails['_id']},
            body: newVoucherData,
        }
        updateVoucher(requestObject);
    };
    const showConfirm = (newVoucherData) => {
        confirm({
            title: `EDIT ${oldVoucherData.voucherName.toUpperCase()}`,
            icon: <ExclamationCircleFilled />,
            content: `Do you Want to update this ${oldVoucherData?.voucherName}?`,
            onOk() {
              onUpdateVoucher(newVoucherData);
            },
            onCancel() {
            },
        });
    };
    return [showConfirm, {isLoading, isUpdated}];
}