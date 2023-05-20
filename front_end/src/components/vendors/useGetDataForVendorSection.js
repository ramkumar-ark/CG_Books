import useDeleteEntity from "../../hooks/useDeleteEntity";
import useGetEntityData from "../../hooks/useGetEntityData"
import useGetLedgerBalances from "../../hooks/useGetLedgerBalances";
import useGetLedgerTransactions from "../../hooks/useGetLedgerTransactions";
import useSelectedOrg from "../../hooks/useSelectedOrg";
import { useGetVendorMonthlyExpenseQuery } from "../../service/transactionsApi";

export default function useGetDataForVendorSection(){
    const {'_id':orgId} = useSelectedOrg();
    const vendor = useGetEntityData('vendor');
    const vendorLedgerId = vendor?.ledger['_id'];
    const {data: closingBalances} = useGetLedgerBalances();
    const closingBalance =  closingBalances?.[vendorLedgerId] || 0;
    // get the vendor's monthly expenses for two years in this format {month, income}
    const { data } = useGetVendorMonthlyExpenseQuery({orgId, vendorLedgerId}, {skip:!orgId || !vendor});
    const monthlyExpense = data && Object.entries(data).map(([k, v]) => ({month:k, income:v}));
    // get all ledger transactions of the vendor
    const vendorTransactions = useGetLedgerTransactions(vendorLedgerId);
    // get deleteFunction for deleting the entity
    const [deleteVendorFunction, isDeleting] = useDeleteEntity(vendor?.['_id']);
    const vendorData = (vendor && monthlyExpense) && 
        {...vendor, receivables:closingBalance*-1, monthlyIncome:monthlyExpense, customerTransactions:vendorTransactions};
    return {vendorData, deleteVendorFunction, isDeleting};
}
