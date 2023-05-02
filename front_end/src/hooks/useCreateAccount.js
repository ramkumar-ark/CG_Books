import { useEffect } from "react";
import { useCreateAccountMutation } from "../service/mastersApi";
import useSelectedOrg from "./useSelectedOrg";

export default function useCreateAccount(api) {
    const {'_id': orgId} = useSelectedOrg();
    const [createAccount, {isLoading, isSuccess, isError, error}] = useCreateAccountMutation();
    const createLedgerAccount = (formData) => {
        const requestObject = {params:{orgId}, body:formData};
        createAccount(requestObject);
    };
    const openNotificationWithIcon = (type, title, description) => {
        api[type]({
          message: title,
          description,
        });
    };
    useEffect(() => {
        isError && openNotificationWithIcon('error', 'Failed to Create Ledger Account.', 'Could not create ledger account. If the error persist contact support.');
        isSuccess && openNotificationWithIcon('success', 'Ledger Account Created.', `The Ledger Account has been created successfully.`);
    }, [isError, isSuccess]);
    return {createLedgerAccount, isLoading, isSuccess, isError};
}