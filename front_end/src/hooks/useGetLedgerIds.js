import { useFetchMastersQuery } from "../service/mastersApi";
import useSelectedOrg from "./useSelectedOrg";

function useGetLedgerIds(ledgerNames){
    const { '_id': orgId } = useSelectedOrg(); 
    const {data} = useFetchMastersQuery(orgId, {skip: !orgId});
    const ledgerMasters = data?.ledgers || [];
    const ledgerIds = ledgerNames.map(ledger => ledgerMasters.find(e => e.name === ledger)?.['_id']);
    return ledgerIds;
};

export default useGetLedgerIds;
