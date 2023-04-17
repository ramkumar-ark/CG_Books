import { useGetLedgerTransactionsQuery } from "../service/transactionsApi";
import useSelectedOrg from "./useSelectedOrg";

export default function useGetLedgerTransactions(ledgerId){
    const {'_id': orgId} = useSelectedOrg();
    const {data} = useGetLedgerTransactionsQuery({orgId, ledgerId}, {skip:!orgId || !ledgerId});
    const ledgerTransactions = data?.transactions;
    return ledgerTransactions;
}