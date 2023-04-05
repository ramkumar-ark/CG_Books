import { useGetVoucherDataQuery } from "../service/transactionsApi";
import useSelectedOrg from "./useSelectedOrg";

function useGetVoucher(transactionId){
    const orgData = useSelectedOrg();
    const { '_id': orgId } = orgData;
    const { data } = useGetVoucherDataQuery({orgId, voucher:'Receipt', transactionId}, {skip:!orgId || !transactionId});
    return {org:orgData, ...data?.voucher};
}

export default useGetVoucher;
