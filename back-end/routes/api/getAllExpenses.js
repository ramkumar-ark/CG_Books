import { getDbController } from "../../db/accountingDb";
import getLedgersOfAccountType from "./getLedgersOfAccountType";

const getAllExpenses = async (req, res) => {
    try {
        const {orgId} = req.params;
        const dbController = await getDbController(orgId);
        [req.params.accountType, req.isMiddleware] = ['Expense', true];
        const expenseLedgers = await getLedgersOfAccountType(req, res);
        const expenseLedgerIds = expenseLedgers.map(e => e['_id'].toString());
        let expenseTransactions = await dbController.transaction.getLedgerTransactions(expenseLedgerIds);
        expenseTransactions = getMonthlyData(expenseTransactions, expenseLedgers, expenseLedgerIds);
        res.json(expenseTransactions);
    } catch (error) {
        console.log(error);
        res.status(403).json({error});
    }
};

function getMonthlyData(expenseTransactions, expenseLedgers, expenseLedgerIds) {
    const monthlyData = {};
    for (const transaction of expenseTransactions) {
        const transactionDate = new Date(transaction.transactionDate);
        const month = `${transactionDate.toLocaleString('default', { month: 'short' })} ${transactionDate.getFullYear()}`;
        for (const debit of transaction.debits){
            if ( expenseLedgerIds.includes(debit.ledger.toString())) {
                const ledgerName = expenseLedgers.find(e => e['_id'].toString() === debit.ledger.toString())['name'];
                const amount = (monthlyData[month+ledgerName] ? monthlyData[month+ledgerName].amount : 0) + debit.amount;
                monthlyData[month+ledgerName] = {month, expense:ledgerName, amount};
            }
        }
        for (const credit of transaction.credits) {
            if ( expenseLedgerIds.includes(credit.ledger.toString())) {
                const ledgerName = expenseLedgers.find(e => e['_id'].toString() === credit.ledger.toString())['name'];
                const amount = (monthlyData[month+ledgerName] ? monthlyData[month+ledgerName].amount : 0) - credit.amount;
                monthlyData[month+ledgerName] = {month, expense:ledgerName, amount};
            }
        } 
    }
    return Object.values(monthlyData);
}


export default getAllExpenses;
