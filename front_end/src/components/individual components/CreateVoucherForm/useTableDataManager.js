import { useState } from "react";

export default function useTableDataManager(initialValues){
    const initialState = {
        total:Number(initialValues.totalAmount || 0).toFixed(2),
        discount:Number(initialValues.discountAmount || 0).toFixed(2),
        round:Number(initialValues.roundingOff || 0).toFixed(2),
        subTotal:(Number(initialValues.totalAmount || 0)-Number(initialValues.discountAmount || 0)+Number(initialValues.roundingOff || 0)).toFixed(2),
    }
    const [tableTotals, setTableTotals] = useState(initialState);
    const updateTableTotals = (stateField, value) => {
        let {subTotal, discount, round, total} = tableTotals;
        switch (stateField) {
            case "subTotal":
                subTotal = Number(value).toFixed(2);    
                break;
            case "discount":
                discount = (Number(value) * -1).toFixed(2);
                break;
            default:
                break;
        }
        total = Math.round(Number(subTotal) + Number(discount)).toFixed(2);
        round = (Number(total) - (Number(subTotal) + Number(discount))).toFixed(2);
        setTableTotals({subTotal, discount, round, total});
    };
    return [tableTotals, updateTableTotals];
}