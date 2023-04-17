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

const computeMonthwiseIncome = (transactions, customerId, incomeLedgerIds) => {

        // 1. compute income total and customer total for each transaction.
        const modifiedTransactions = [];
        for (const transac of transactions){
            let income = 0;
            let customer = 0;
            for (const debit of transac.debits){
                if (debit.ledger.toString() === customerId) customer += debit.amount;
                else if (incomeLedgerIds.includes(debit.ledger.toString())) income += debit.amount;
            }
            for (const credit of transac.credits){
                if (credit.ledger.toString() === customerId) customer -= credit.amount;
                else if (incomeLedgerIds.includes(credit.ledger.toString())) income -= credit.amount;
            }
            // 2. Take lesser of income total and customer total of each transaction.
            const minIncome = Math.min(Math.abs(customer), Math.abs(income));
            const netIncome = income < 0 ? minIncome : minIncome * -1;
            modifiedTransactions.push({date:new Date(transac.transactionDate), netIncome});
        }
        // 3. Get monthwise total using transactionDate of each transaction.
        const monthwiseIncome = initializeMonthwiseData();
        for (const transac of modifiedTransactions){
            const month = `${transac.date.toLocaleString('default', { month: 'short' })} ${transac.date.getFullYear()}`;
            monthwiseIncome[month] = (monthwiseIncome[month] || 0) + transac.netIncome;
        }
        return monthwiseIncome;
};

const getCustomerMonthlyIncome = async (req, res) => {
    try {
        const {orgId, customerLedgerId} = req.params;
        const dbController = await getDbController(orgId);
        // get ledger ids of all ledgers under income type
        // 1. get all ids of groups and sub-groups under the income account type.
        const incomeTypeId = await dbController.accountTypes.getId('Income');
        const incomeGroupIds = await dbController.primaryGroup.getAccountTypeGroups(incomeTypeId);
        // 2. get all ids of ledgers under income groups.
        const incomeLedgerIds = await dbController.ledger.getGroupLedgerIds(incomeGroupIds);
        // get associated transactions with income ledgers and customer ledger
        const IncomeTransactions = await dbController.transaction.getCommonTransactions(
            customerLedgerId, incomeLedgerIds
        );
        // compute monthwise total income of customer
        const monthwiseIncome = computeMonthwiseIncome(IncomeTransactions, customerLedgerId, incomeLedgerIds);
        res.json(monthwiseIncome);
    } catch (error) {
        console.log(error);
        res.json({error});
    }
};

export default getCustomerMonthlyIncome;
