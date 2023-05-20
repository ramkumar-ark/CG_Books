import { useGetVouchersQuery } from "../service/transactionsApi";
import useSelectedOrg from "./useSelectedOrg";

function useGetVouchers(voucherType){
    const { '_id': orgId } = useSelectedOrg();
    const {data, refetch} = useGetVouchersQuery({orgId, voucher:voucherType}, {skip: !orgId});
    const vouchers = data?.vouchers.map((e, i) => ({...e, date:new Date(e.date), createdOn:new Date(e.createdOn),
        modifiedOn:new Date(e.modifiedOn), dueDate:new Date(e.dueDate), key:i+1}));
    return { vouchers, refetchVouchers: refetch };
}

export default useGetVouchers;
