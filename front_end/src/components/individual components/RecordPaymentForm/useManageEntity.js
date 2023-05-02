import { useState } from "react";
import { getUnpaidForEditPayment, getUnpaidVouchersOfEntity } from "./getUnpaidForPayment";

export default function useManageEntity(entityDataObj, closingBalances, unpaidVouchers, voucherData) {
    const [selectedEntity, setSelectedEntity] = useState(initState(entityDataObj, closingBalances, 
        unpaidVouchers, voucherData));
    console.log(selectedEntity);
    const handleCustomerSelection = (entityId) => {
        const closingBalance = getClosingBalanceOfEntity(entityDataObj[entityId], closingBalances);
        
        const unpaid = getUnpaidVouchersOfEntity(entityId, unpaidVouchers, entityDataObj, 
            voucherData.org.createdOn);

        setSelectedEntity({...entityDataObj[entityId], closingBalance, unpaid});
    };

    return [selectedEntity, handleCustomerSelection];
}

function getClosingBalanceOfEntity(entityData, closingBalances) {
    const balanceFactor = entityData.type === 'vendor' ? -1 : 1;
    return (closingBalances[entityData.ledger?.['_id']] * balanceFactor)|| 0;
}

function initState(entityDataObj, closingBalances, unpaidVouchers, voucherData) {
    const entityId = voucherData?.otherDetails?.linkedEntity;
    if (entityId){
        const closingBalance = getClosingBalanceOfEntity(entityDataObj[entityId], closingBalances);
        const opBalDate = voucherData.org.createdOn;
        const unpaid = getUnpaidVouchersOfEntity(entityId, unpaidVouchers, entityDataObj, opBalDate);
        const updatedUnpaidData = getUnpaidForEditPayment(
            unpaid, voucherData.otherDetails.offSetTransactions, opBalDate);
        return {...entityDataObj[entityId], closingBalance, unpaid:updatedUnpaidData}
    }
}


