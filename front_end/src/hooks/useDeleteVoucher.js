import { useDeleteVoucherEntryMutation } from "../service/transactionsApi";
import useSelectedOrg from "./useSelectedOrg";
import { Modal } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const { confirm } = Modal;

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
    return [showConfirm, {isLoading, isDeleted}];
}

export default useDeleteVoucher;
