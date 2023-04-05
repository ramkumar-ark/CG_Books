import useSelectedOrg from "./useSelectedOrg";
import { useGetLedgerBalanceQuery } from "../service/transactionsApi";

function useGetLedgerBalances(){
    const { '_id': orgId } = useSelectedOrg();
    const { data } = useGetLedgerBalanceQuery(orgId, {skip: !orgId});
    return data;
}

export default useGetLedgerBalances;
