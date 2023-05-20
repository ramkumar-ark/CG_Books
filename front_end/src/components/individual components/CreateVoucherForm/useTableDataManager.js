import { useState } from "react";

export default function useTableDataManager(initialValues){
    const initialState = {
        total:Number(initialValues.totalAmount || 0).toFixed(2),
        discount:Number((initialValues.discountAmount*-1) || 0).toFixed(2),
        round:Number(initialValues.roundingOff || 0).toFixed(2),
        subTotal:(Number(initialValues.totalAmount || 0)-Number((initialValues.discountAmount*-1) || 0)+Number(initialValues.roundingOff || 0)).toFixed(2),
    }
    const [tableTotals, setTableTotals] = useState(initialState);
    const updateTableTotals = (discountAmount, subTotalAmount) => {
        let {subTotal, discount, round, total} = tableTotals;
        subTotal = Number(subTotalAmount).toFixed(2);
        discount = (Number(discountAmount) * -1).toFixed(2);
        total = Math.round(Number(subTotal) + Number(discount)).toFixed(2);
        round = (Number(total) - (Number(subTotal) + Number(discount))).toFixed(2);
        setTableTotals({subTotal, discount, round, total});
    };
    return [tableTotals, updateTableTotals];
}