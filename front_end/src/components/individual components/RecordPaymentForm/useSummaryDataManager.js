import { useState } from "react";

export default function useSummaryDataManager(voucherData) {
    const [summaryData, setSummaryData] = useState(() => initState(voucherData));
    const changeReceivedAmount = (value) => {
        setSummaryData({...summaryData, received:value});
        console.log('receiptAmt');
    };
    const changeUsedAmount = (value) =>{
        setSummaryData({...summaryData, used:value});
    };
    return {summaryData, changeReceivedAmount, changeUsedAmount};
}

function initState(voucherData) {
    if (voucherData.otherDetails){
        return {
            received:voucherData.otherDetails.totalAmount,
            used: voucherData.otherDetails.totalAmount - voucherData.otherDetails.pendingAmount,
        }
    }
    else return {received:0, used:0};
}
