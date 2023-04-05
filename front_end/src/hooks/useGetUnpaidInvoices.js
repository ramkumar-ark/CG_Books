import { useGetUnpaidInvoicesQuery } from "../service/transactionsApi";
import useSelectedOrg from "./useSelectedOrg"

function useGetUnpaidInvoices(){
    const {'_id': orgId} = useSelectedOrg();
    const { data } = useGetUnpaidInvoicesQuery({orgId}, {skip:!orgId});
    return data?.unpaidInvoices;
}

export default useGetUnpaidInvoices;
