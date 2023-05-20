import useGetAutoGeneratedVchNo from "./useGetAutoGeneratedVchNo";
import useGetBankAccounts from "./useGetBankAccounts";
import useGetLedgerIds from "./useGetLedgerIds";
import useGetVoucher from "./useGetVoucher";
import constructInitialValues from "../components/individual components/RecordPaymentForm/constructInitialValues";
import useGetLedgerBalances from "./useGetLedgerBalances";
import useGetUnpaidVouchers from "./useGetUnpaidVouchers";
import useGetEntities from "./useGetEntities";
import getBankLedgerOpts from "../utilities/getBankLedgerOpts";
import useSelectedOrg from "./useSelectedOrg";
import useCreateVoucher from "./useCreateVoucher";
import useUpdateVoucher from "./useUpdateVoucher";
import transformData from "../components/individual components/RecordPaymentForm/transformDataForSubmit";


export default function useGetDataForRecordPaymentForm(voucherType, transactionId) {
    const voucherData = useGetVoucher(transactionId, voucherType);
    const bankAccounts = useGetBankAccounts();
    const bankSelectOpts = getBankLedgerOpts(bankAccounts);
    const [bankChargesLedgerId] = useGetLedgerIds(['Bank Fees and Charges']);
    let voucherNumber = useGetAutoGeneratedVchNo(transactionId ? undefined : voucherType);
    if (transactionId) voucherNumber = voucherData.voucherNumber;
    const initialValues = transactionId ? 
        constructInitialValues(voucherData, bankChargesLedgerId, bankAccounts) : 
        {voucherNumber, mode:'cash'};
    const entityType = voucherType === 'Receipt' ? 'customer': 'vendor';
    const {entityDataObj} = useGetEntities(entityType);
    const {data: closingBalances} = useGetLedgerBalances();
    const offsetVoucherType = voucherType === 'Receipt' ? 'sales' : 'purchase';
    const unpaidVouchers = useGetUnpaidVouchers(offsetVoucherType);
    const {userId, '_id':orgId} = useSelectedOrg();
    const [createVoucher, {isLoading:isCreating}] = useCreateVoucher();
    const [updateVoucher, {isLoading:isUpdating}] = useUpdateVoucher(transactionId, voucherData);
    const onSave = (data) => {
        const submitData = transformData({...data, bankChargesLedgerId, userId, voucherType});
        transactionId ? updateVoucher(submitData) : createVoucher({...submitData, orgId});
    };
    const dataFromHooks = [voucherNumber, bankAccounts, bankChargesLedgerId, entityDataObj, closingBalances,
        unpaidVouchers, orgId];
    const isLoading = dataFromHooks.some(data => !data);
    const requiredData = {initialValues, onSave, voucherType, voucherData, entityDataObj, closingBalances,
        unpaidVouchers, bankSelectOpts, isLoading} ;
    return requiredData;
}