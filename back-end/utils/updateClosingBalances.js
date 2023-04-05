import updateLedgerClosingBalance from "./updateLedgerClosingBalance";

export default async function updateClosingBalances(transaction, orgId, oldTransaction){
    try {
        const ledgerIds = getLedgerIdsOfTransaction(
            oldTransaction ? [transaction, oldTransaction] : [transaction]
        );
        for (const ledgerId of ledgerIds){
            await updateLedgerClosingBalance(orgId, ledgerId);
        }
        return Promise.resolve();    
    } catch (error) {
        return Promise.reject(error);
    }
}

function getLedgerIdsOfTransaction(transactions){
    const ledgerIds = new Set();
    for (const transaction of transactions){
        for (const debit of transaction.debits){
            ledgerIds.add(debit.ledger.toString());
        }
        for (const credit of transaction.credits){
            ledgerIds.add(credit.ledger.toString());
        }
    }
    return Array.from(ledgerIds);
}
