import { useGetVoucherDataQuery } from "../service/transactionsApi";
import useSelectedOrg from "./useSelectedOrg";

function useGetVoucher(transactionId, voucherType){
    const orgData = useSelectedOrg();
    const { '_id': orgId } = orgData;
    const { data } = useGetVoucherDataQuery({orgId, voucher:voucherType, transactionId}, 
        {skip:!orgId || !transactionId});
    return {org:orgData, ...data?.voucher};
}

export default useGetVoucher;
