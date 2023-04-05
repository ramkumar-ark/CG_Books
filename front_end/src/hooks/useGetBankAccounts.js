import { useGetBankAccountsQuery } from "../service/mastersApi";
import useSelectedOrg from "./useSelectedOrg";

function useGetBankAccounts(){
    const { '_id': orgId } = useSelectedOrg();
    const {data} = useGetBankAccountsQuery(orgId, {skip:!orgId});
    return data?.accounts || [];
}

export default useGetBankAccounts;
