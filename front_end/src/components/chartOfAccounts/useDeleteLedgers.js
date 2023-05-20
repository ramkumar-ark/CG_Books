import { useCallback, useEffect } from "react";
import useSelectedOrg from "../../hooks/useSelectedOrg";
import { useDeleteLedgersMutation } from "../../service/mastersApi";
import { useHistory } from "react-router-dom";
import { Modal, Typography } from "antd";
import {ExclamationCircleFilled} from "@ant-design/icons";
import useGetLedgers from "../../hooks/useGetLedgers";

function useDeleteLedgers() {
    const history = useHistory();
    const {'_id': orgId} = useSelectedOrg();
    const ledgers = useGetLedgers();
    const [deleteLedgers, {isLoading, isSuccess, isError, error, data}] = useDeleteLedgersMutation();

    const showDeleteConfirm = (ledgerIds) => {
        Modal.confirm({
          title: 'Are you sure delete these Ledger?',
          icon: <ExclamationCircleFilled />,
          content: 'Do you want to delete the selected Ledger Accounts? These Ledgers cannot be restored later.',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            deleteLedgers({params:{orgId}, body:{ledgerIds}});
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
          title: 'Ledger Accounts Deleted!',
          content: 'The Ledger Accounts have been successfully deleted.',
          onOk() {},
        });
    }, []);

    const showLedgersNotDeleted = useCallback((ledgerIdsNotDeleted) => {

        const ledgersNotDeleted = ledgers.filter(e => ledgerIdsNotDeleted.includes(e.key));
        const Content = () => (
          <>
            <Typography.Text>Ledger accounts with transactions cannot be deleted. Hence, the following ledgers cannot be deleted:</Typography.Text>
            <ol>
              {ledgersNotDeleted.map(e => (<li key={e.key}>{e.name}</li>))}
            </ol>
          </>
        );
        Modal.info({
          title: 'Ledgers Not Deleted!',
          content: <Content/>,
          onOk() {}
        });
    }, [ledgers]);

    const deleteLedgerAccounts = (ledgerIds) => {
        showDeleteConfirm(ledgerIds);
    };

    useEffect(() => {
        if (isSuccess) {
          if (data.length > 0) showLedgersNotDeleted(data);
          else showSuccessOnDelete();
        }
        else if (isError) {
          switch (error.data?.message) {
            default:
              showErrorOnDelete('System Error occured! Please contact support for assistance.');
              break;
          }
        }
    }, [isSuccess, isError, error, history, showErrorOnDelete, showSuccessOnDelete, data]);

    return {deleteLedgerAccounts, isLoading};
}

export default useDeleteLedgers;
