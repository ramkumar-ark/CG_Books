import { useDeleteVoucherEntryMutation } from "../service/transactionsApi";
import useSelectedOrg from "./useSelectedOrg";
import { Modal, Typography } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const { confirm } = Modal;
const { Text } = Typography;

function useDeleteVoucher(transactionId, voucherData){
    const history = useHistory();
    const { '_id': orgId } = useSelectedOrg();
    const [deleteVoucher, {isLoading, isSuccess:isDeleted}] = useDeleteVoucherEntryMutation();
    useEffect(() => {isDeleted && history.goBack()})
    const onDeleteVoucher = () => {
        const requestObject = {
            params: {orgId},
            body: {
                transactionId, 
                otherDetailsId:voucherData.otherDetails?.['_id'], 
                voucherName:voucherData.voucherName,
                voucherDate:voucherData.transaction.transactionDate, 
                voucherNumber: voucherData.voucherNumber,
                offsetTransactions: voucherData.otherDetails.offSetTransactions,
                entityId: voucherData.otherDetails.linkedEntity,
            }
        }
        deleteVoucher(requestObject);
    };
    const showConfirm = () => {
        confirm({
            title: `DELETE ${voucherData.voucherName.toUpperCase()}`,
            icon: <ExclamationCircleFilled />,
            content: `Do you Want to delete this ${voucherData.voucherName}?`,
            onOk() {
              onDeleteVoucher();
            },
            onCancel() {
            },
        });
    };
    const showModalOnSubmitFailed = () => {
        Modal.error({
            title:'CANNOT DELETE!', 
            content:<Text>
                    This {voucherData.voucherName} cannot be deleted since there are payments linked to this {voucherData.voucherName}.                
                </Text>,         
        });
    };
    const initiateDelete = () => {
        if (['Sales', 'Purchase'].includes(voucherData.voucherName) && 
            voucherData.otherDetails.offSetTransactions.length > 0)
            showModalOnSubmitFailed();
        else showConfirm();
    };
    return [initiateDelete, {isLoading, isDeleted}];
}

export default useDeleteVoucher;
