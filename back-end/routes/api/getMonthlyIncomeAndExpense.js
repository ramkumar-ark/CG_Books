import { getOrgById } from "../../controllers/organization";

const getMonthlyIncomeAndExpense = async (req, res, next) => {
    try {
        const {'createdOn':opBalDate} = await getOrgById(req.params.orgId);
        const [incomeData, expenseData] = req.result;
        const {groupTransactions: incomeGroupTransactions, openingBalance:incomeOpeningBalance} = incomeData;
        const {groupTransactions: expenseGroupTransactions, openingBalance:expenseOpeningBalance} = expenseData;
        const incomeMonthlyData = getMonthlyData(incomeGroupTransactions, opBalDate, incomeOpeningBalance, 'Income');
        const expenseMonthlyData = getMonthlyData(expenseGroupTransactions, opBalDate, expenseOpeningBalance, 'Expense');
        req.result = {...incomeMonthlyData, ...expenseMonthlyData};
        next();
    } catch (error) {
        console.log(error);
        res.status(403).json({error});
    }
};

function getMonthlyData(groupTransactions, opBalDate, opBalance, type) {
    const monthlyDataObj = {};
    for (const transaction of groupTransactions) {
        const transactionDate = new Date(transaction.date);
        const month = `${transactionDate.toLocaleString('default', { month: 'short' })} ${transactionDate.getFullYear()}`;
        const amount = (type === 'Income' ? transaction.amount * -1 : transaction.amount);
        const totalAmount = (monthlyDataObj[`${month}-${type}`] ? monthlyDataObj[`${month}-${type}`].amount : 0) + amount;
        monthlyDataObj[`${month}-${type}`] = {month, amount:totalAmount, type};
    }
    if (opBalance) {
        const month = `${opBalDate.toLocaleString('default', { month: 'short' })} ${opBalDate.getFullYear()}`;
        const openingBalance = (type === 'Income' ? opBalance * -1 : opBalance);
        if (!monthlyDataObj[`${month}-${type}`]) 
            monthlyDataObj[`${month}-${type}`] = {month, amount:openingBalance, type};
        else monthlyDataObj[`${month}-${type}`].amount += openingBalance;
    }
    return monthlyDataObj;
}

export default getMonthlyIncomeAndExpense;
