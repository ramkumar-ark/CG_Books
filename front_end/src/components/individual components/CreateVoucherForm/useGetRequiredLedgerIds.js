import useSelectedOrg from "../../../hooks/useSelectedOrg";
import { useFetchMastersQuery } from "../../../service/mastersApi";

export default function useGetRequiredLedgerIds(){
    const {'_id':orgId} = useSelectedOrg();
    const {data} = useFetchMastersQuery(orgId);
    const ledgerMasters = data?.ledgers || [];
    const otherChargesLedgerId = ledgerMasters.find(e => e.name === "Other Charges")?.['_id'];
    const salesDiscountLedgerId = ledgerMasters.find(e => e.name === "Discount")?.['_id'];
    const purchaseDiscountLedgerId = ledgerMasters.find(e => e.name === "Purchase Discounts")?.['_id'];
    return {otherChargesLedgerId, salesDiscountLedgerId, purchaseDiscountLedgerId};
}