import useGetEntities from "../../../hooks/useGetEntities";
import useGetUnpaidVouchers from "../../../hooks/useGetUnpaidVouchers";
import useSelectedOrg from "../../../hooks/useSelectedOrg";

export default function useGetUnpaidAmount(primaryVoucherType) {
    const {createdOn} = useSelectedOrg();
    const unpaidVouchers = useGetUnpaidVouchers(primaryVoucherType);
    const unpaidtransactions = unpaidVouchers?.map(e => ({
        dueDate:new Date(e.transaction.otherDetails.dueDate), 
        amount:e.transaction.otherDetails.totalAmount,
    }));
    const {entityDataObj: entities} = useGetEntities(primaryVoucherType==='sales' ? 'customer' : 'vendor');
    const unpaidOpBalances = Object.keys(entities)?.filter(e => entities[e]?.otherDetails?.pendingAmount > 0)
        .map(e => ({dueDate: new Date(createdOn), amount:entities[e]?.otherDetails?.pendingAmount}));
    const overdueAmount = unpaidtransactions && [ ...unpaidtransactions, ...unpaidOpBalances]
        .filter(e => e.dueDate < new Date())
        .reduce((pv, e) => pv + e.amount, 0);
    const currentAmount = unpaidtransactions && [...unpaidtransactions, ...unpaidOpBalances]
        .filter(e => e.dueDate >= new Date())
        .reduce((pv, e) => pv + e.amount, 0);
    return {overdueAmount, currentAmount};
}