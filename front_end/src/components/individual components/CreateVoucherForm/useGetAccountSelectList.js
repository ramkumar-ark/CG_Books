import useSelectedOrg from "../../../hooks/useSelectedOrg";
import { useGetAccountTypeLedgersQuery } from "../../../service/mastersApi";

export default function useGetAccountSelectList(accountType){
    const {'_id':orgId} = useSelectedOrg();
    const {data} = useGetAccountTypeLedgersQuery({params:{orgId, accountType}}, {skip:!orgId});
    const ledgersSelectList = data?.ledgers.map(e => ({label:e.name, value:e['_id']}));
    return ledgersSelectList;
}