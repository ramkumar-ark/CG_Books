import { useGetUnpaidVouchersQuery } from "../service/transactionsApi";
import useSelectedOrg from "./useSelectedOrg"

function useGetUnpaidVouchers(primaryVoucherType){
    const {'_id': orgId} = useSelectedOrg();
    const { data } = useGetUnpaidVouchersQuery({orgId, primaryVoucherType}, {skip:!orgId});
    return data?.unpaidVouchers;
}

export default useGetUnpaidVouchers;
