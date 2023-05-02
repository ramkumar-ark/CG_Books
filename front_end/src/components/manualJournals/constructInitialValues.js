import dayjs from "dayjs";

export default function constructInitialValues(voucherData) {
    const {voucherNumber} = voucherData;
    const {referenceNumber, debits, credits, narration} = voucherData.transaction;
    const date = dayjs(new Date(voucherData.transaction.transactionDate)); 
    const entries = [];
    debits.forEach(e => {entries.push({ledger:e.ledger['_id'], debit:e.amount})});
    credits.forEach(e => {entries.push({ledger:e.ledger['_id'], credit:e.amount})});
    return {
        date, voucherNumber, referenceNumber, notes:narration, entries,
    };
}