import useSelectedOrg from "./useSelectedOrg";
import { useFetchMastersQuery } from "../service/mastersApi";
import useGetLedgerBalances from "./useGetLedgerBalances";
import { useMemo } from "react";

export default function useGetLedgers() {
    const {'_id': orgId} = useSelectedOrg();
    const { data } = useFetchMastersQuery(orgId, { skip: !orgId });
    const {data:closingBalances} = useGetLedgerBalances();
    const groups = useMemo(() => {
        const groups = {};
        data?.groups.forEach(e => {groups[e['_id']] = e});
        return groups;
    }, [data]);
    const ledgers = useMemo(() => data?.ledgers.map(({_id, name, group, opBalance, description, isReadOnly}, i) => ({
        key:_id, name, group:groups[group].name, groupId:group, opBal:opBalance, isReadOnly,
        clBal:closingBalances?.[_id] || 0, description,
    })), [closingBalances, data, groups]);
    return ledgers;
}
