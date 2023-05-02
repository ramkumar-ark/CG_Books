import useSelectedOrg from "./useSelectedOrg";
import { useFetchMastersQuery } from "../service/mastersApi";
import useGetLedgerBalances from "./useGetLedgerBalances";

export default function useGetLedges() {
    const {'_id': orgId} = useSelectedOrg();
    const { data } = useFetchMastersQuery(orgId, { skip: !orgId });
    const {data:closingBalances} = useGetLedgerBalances();
    const groups = {};
    data?.groups.forEach(e => {groups[e['_id']] = e});
    const ledgers = data?.ledgers.map(({_id, name, group, opBalance, description}, i) => ({
        key:_id, name, group:groups[group].name, groupId:group, opBal:opBalance, 
        clBal:closingBalances?.[_id] || 0, description,
    }));
    return ledgers;
}