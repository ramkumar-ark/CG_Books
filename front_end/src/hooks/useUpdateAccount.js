import { useEffect } from "react";
import { useUpdateAccountMutation } from "../service/mastersApi";
import useSelectedOrg from "./useSelectedOrg";

export default function useUpdateAccount(api, ledgerId) {
    const {'_id': orgId} = useSelectedOrg();
    const [updateAccount, {isLoading, isSuccess, isError, error}] = useUpdateAccountMutation();
    const updateLedgerAccount = (formData) => {
        const requestObject = {params:{orgId, ledgerId}, body:formData};
        updateAccount(requestObject);
    };
    const openNotificationWithIcon = (type, title, description) => {
        api[type]({
          message: title,
          description,
        });
    };
    useEffect(() => {
        isError && openNotificationWithIcon('error', 'Failed to Update Ledger Account.', 'Could not update ledger account. If the error persist contact support.');
        isSuccess && openNotificationWithIcon('success', 'Ledger Account Update.', `The Ledger Account has been updated successfully.`);
    }, [isError, isSuccess]);
    return {updateLedgerAccount, isLoading, isSuccess, isError};
}