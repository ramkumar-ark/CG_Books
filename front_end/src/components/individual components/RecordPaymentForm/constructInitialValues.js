import dayjs from "dayjs";

const constructInitialValues = (data, bankChargesLedgerId, bankAccounts) => {
    if (data.voucherNumber){
        const bankAccountIds = bankAccounts.map(e => e['_id']);
        const voucherNumber = data.voucherNumber;
        const amount = data.otherDetails?.totalAmount;
        const bankCharges = data.transaction.debits.find(e => e.ledger['_id'] == bankChargesLedgerId)?.amount || 0;
        const date = dayjs(new Date(data.transaction.transactionDate));
        const mode = data.otherDetails.receiptMode;
        const bankLedger = [...data.transaction.debits, ...data.transaction.credits].find(e => 
            bankAccountIds.includes(e?.ledger?.['_id']))?.ledger['_id'];
        const referenceNumber = data.transaction.referenceNumber;
        const notes = data.transaction.narration;
        return {voucherNumber, amount, bankCharges, date, mode, bankLedger, referenceNumber, notes,};
    }else return undefined;
};

export default constructInitialValues;
