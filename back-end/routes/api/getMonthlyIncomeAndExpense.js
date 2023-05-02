import { getOrgById } from "../../controllers/organization";
import { getDbController } from "../../db/accountingDb";
import getGroupTransactions from "./getGroupTransactions";

const getMonthlyIncomeAndExpense = async (req, res) => {
    try {
        const {orgId} = req.params;
        const {'createdOn':opBalDate} = await getOrgById(orgId);
        const dbController = await getDbController(orgId);
        const { '_id': incomeGroupId} = await dbController.primaryGroup.getByName('Expense');
        const { '_id': expenseGroupId} = await dbController.primaryGroup.getByName('Income');
        const {groupTransactions: incomeGroupTransactions, openingBalance:incomeOpeningBalance} = 
            await getGroupTransactions({params:{orgId, groupId:incomeGroupId}, isMiddleWare:true}, res);
        const {groupTransactions: expenseGroupTransactions, openingBalance:expenseOpeningBalance} = 
            await getGroupTransactions({params:{orgId, groupId:expenseGroupId}, isMiddleWare:true}, res);
        const incomeMonthlyData = getMonthlyData(incomeGroupTransactions, opBalDate, incomeOpeningBalance, 'Income');
        const expenseMonthlyData = getMonthlyData(expenseGroupTransactions, opBalDate, expenseOpeningBalance, 'Expense');
        const result = {...incomeMonthlyData, ...expenseMonthlyData};
        res.json(result);    
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
        const amount = (type === 'Expense' ? transaction.amount * -1 : transaction.amount);
        const totalAmount = (monthlyDataObj[`${month}-${type}`] ? monthlyDataObj[`${month}-${type}`].amount : 0) + amount;
        monthlyDataObj[`${month}-${type}`] = {month, amount:totalAmount, type};
    }
    if (opBalance) {
        const month = `${opBalDate.toLocaleString('default', { month: 'short' })} ${opBalDate.getFullYear()}`;
        const openingBalance = (type === 'Expense' ? opBalance * -1 : opBalance);
        if (!monthlyDataObj[`${month}-${type}`]) 
            monthlyDataObj[`${month}-${type}`] = {month, amount:openingBalance, type};
        else monthlyDataObj[`${month}-${type}`].amount += openingBalance;
    }
    return monthlyDataObj;
}

export default getMonthlyIncomeAndExpense;
