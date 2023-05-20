import { useCallback, useEffect } from "react";
import useSelectedOrg from "../../hooks/useSelectedOrg";
import { useDeleteLedgerMutation } from "../../service/mastersApi";
import { useHistory } from "react-router-dom";
import { Modal } from "antd";
import {ExclamationCircleFilled} from "@ant-design/icons";

function useDeleteAccount(ledgerId) {
    const history = useHistory();
    const {'_id': orgId} = useSelectedOrg();
    const [deleteLedger, {isLoading, isSuccess, isError, error}] = useDeleteLedgerMutation();

    const showDeleteConfirm = () => {
        Modal.confirm({
          title: 'Are you sure delete this Ledger?',
          icon: <ExclamationCircleFilled />,
          content: 'Do you want to delete this Ledger Account? The Ledger cannot be restored later.',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            deleteLedger({params:{orgId, ledgerId}});
          },
          onCancel() {},
        });
    };

    const showErrorOnDelete = useCallback((content) => {
        Modal.error({
          title: 'Could not delete the ledger!',
          content,
        });
    }, []);

    const showSuccessOnDelete = useCallback(() => {
        Modal.success({
          title: 'Ledger Account Deleted!',
          content: 'The Ledger Account has been successfully deleted.',
          onOk() {
            history.goBack();
          },
        });
    }, [history]);

    const deleteLedgerAccount = () => {
        showDeleteConfirm();        
    };

    useEffect(() => {
        if (isSuccess) showSuccessOnDelete();
        else if (isError) {
          switch (error.data?.message) {
            case 'LedgerNotEmpty':
              showErrorOnDelete('The Ledger Account cannot be deleted since it has transactions associated with it.');
              break;
            case 'ReadOnlyLedger':
              showErrorOnDelete('This Ledger Account is a System defined ledger and hence cannot be deleted.');
              break;
            default:
              showErrorOnDelete('System Error occured! Please contact support for assistance.');
              break;
          }
        }
    }, [isSuccess, isError, error, history, showErrorOnDelete, showSuccessOnDelete]);

    return {deleteLedgerAccount, isLoading};
}

export default useDeleteAccount;
