import useSelectedOrg from "../../hooks/useSelectedOrg";
import { useFetchMastersQuery } from "../../service/mastersApi";

function useGetGroupsList() {
    const {'_id': orgId} = useSelectedOrg();
    const {data} = useFetchMastersQuery(orgId);
    const groups = data?.groups;
    const groupsSelectList = groups?.filter(
        e => !(['Bank', 'Credit Card', 'Accounts Receivable', 'Accounts Payable'].includes(e.name)))
        .map(e => ({label:e.name, value:e['_id']}))
        .sort((a,b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()));
    return groupsSelectList;
};

export default useGetGroupsList;
