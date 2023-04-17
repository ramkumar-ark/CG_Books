import { useGetUnpaidVouchersQuery } from "../service/transactionsApi";
import useSelectedOrg from "./useSelectedOrg"

function useGetUnpaidVouchers(primaryVoucherType){
    const {'_id': orgId} = useSelectedOrg();
    const { data } = useGetUnpaidVouchersQuery({orgId, primaryVoucherType}, {skip:!orgId});
    console.log(data?.unpaidVouchers);
    return data?.unpaidVouchers;
}

export default useGetUnpaidVouchers;
