import {getDbController} from '../../db/accountingDb';

const initializeMonthwiseData = () => {
    const today = new Date();
    const eoy = today.getMonth() < 3 
        ? new Date(today.getFullYear(), 2, 31) 
        : new Date(today.getFullYear() + 1, 2, 31);
    const initialData = {};
    for (let i = 23; i >= 0; i--) {
        const date = new Date(eoy.getFullYear(), eoy.getMonth() - i, 1);
        const month = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
        initialData[month] = 0;
    }
    return initialData;
};

const computeMonthwiseExpense = (transactions, vendorId, expenseLedgerIds) => {

        // 1. compute Expense total and customer total for each transaction.
        const modifiedTransactions = [];
        for (const transac of transactions){
            let expense = 0;
            let vendor = 0;
            for (const debit of transac.debits){
                if (debit.ledger.toString() === vendorId) vendor += debit.amount;
                else if (expenseLedgerIds.includes(debit.ledger.toString())) expense += debit.amount;
            }
            for (const credit of transac.credits){
                if (credit.ledger.toString() === vendorId) vendor -= credit.amount;
                else if (expenseLedgerIds.includes(credit.ledger.toString())) expense -= credit.amount;
            }
            // 2. Take lesser of Expense total and customer total of each transaction.
            const minExpense = Math.min(Math.abs(vendor), Math.abs(expense));
            const netExpense = expense < 0 ? minExpense : minExpense * -1;
            modifiedTransactions.push({date:new Date(transac.transactionDate), netExpense});
        }   
        // 3. Get monthwise total using transactionDate of each transaction.
        const monthwiseExpense = initializeMonthwiseData();
        for (const transac of modifiedTransactions){
            const month = `${transac.date.toLocaleString('default', { month: 'short' })} ${transac.date.getFullYear()}`;
            monthwiseExpense[month] = (monthwiseExpense[month] || 0) + transac.netExpense;
        }
        return monthwiseExpense;
};

const getVendorMonthlyExpense = async (req, res) => {
    try {
        const {orgId, vendorLedgerId} = req.params;
        const dbController = await getDbController(orgId);
        // get ledger ids of all ledgers under Expense type
        // 1. get all ids of groups and sub-groups under the Expense account type.
        const expenseTypeId = await dbController.accountTypes.getId('Expense');
        const expenseGroupIds = await dbController.primaryGroup.getAccountTypeGroups(expenseTypeId);
        // 2. get all ids of ledgers under Expense groups.
        const expenseLedgerIds = await dbController.ledger.getGroupLedgerIds(expenseGroupIds);
        // get associated transactions with Expense ledgers and customer ledger
        const expenseTransactions = await dbController.transaction.getCommonTransactions(
            vendorLedgerId, expenseLedgerIds
        );
        // compute monthwise total Expense of customer
        const monthwiseExpense = computeMonthwiseExpense(expenseTransactions, vendorLedgerId, expenseLedgerIds);
        res.json(monthwiseExpense);
    } catch (error) {
        console.log(error);
        res.json({error});
    }
};

export default getVendorMonthlyExpense;
