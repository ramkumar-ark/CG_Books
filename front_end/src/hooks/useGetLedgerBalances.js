import useSelectedOrg from "./useSelectedOrg";
import { useGetLedgerBalanceQuery } from "../service/transactionsApi";

function useGetLedgerBalances(){
    const { '_id': orgId } = useSelectedOrg();
    const { data, refetch } = useGetLedgerBalanceQuery(orgId, {skip: !orgId});
    return { data, refetch };
}

export default useGetLedgerBalances;
