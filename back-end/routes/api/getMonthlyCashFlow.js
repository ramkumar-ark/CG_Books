import { getOrgById } from "../../controllers/organization";

const getMonthlyCashFlow = async (req, res, next) => {
    try {
        const {'createdOn':opBalDate} = await getOrgById(req.params.orgId);
        const [cashData, bankData] = req.result;
        const {groupTransactions: cashGroupTransactions, openingBalance:cashOpeningBalance} = cashData;
        const {groupTransactions: bankGroupTransactions, openingBalance:bankOpeningBalance} = bankData;
        const cashMonthlyData = getMonthlyData(cashGroupTransactions, opBalDate, cashOpeningBalance);        
        const bankMonthlyData =  getMonthlyData(bankGroupTransactions, opBalDate, bankOpeningBalance);
        const cashFlowData = getAggragateObject(cashMonthlyData, bankMonthlyData);
        req.result = cashFlowData;
        next();
    } catch (error) {
        res.status(403).json({error})
    }
};

function getMonthlyData(groupTransactions, opBalDate, opBalance) {
    const monthlyDataObj = {};
    for (const transaction of groupTransactions) {
        const transactionDate = new Date(transaction.date);
        const month = `${transactionDate.toLocaleString('default', { month: 'short' })} ${transactionDate.getFullYear()}`;
        const debit = transaction.amount > 0 ? transaction.amount : 0;
        const credit = transaction.amount < 0 ? Math.abs(transaction.amount) : 0;                
        const totalDebit = (monthlyDataObj[month] ? monthlyDataObj[month].totalDebit : 0) + debit;
        const totalCredit = (monthlyDataObj[month] ? monthlyDataObj[month].totalCredit : 0) + credit;
        const closingBalance = transaction.runningBalance;
        const openingBalance = closingBalance + totalCredit - totalDebit;
        monthlyDataObj[month] = {openingBalance, totalDebit, totalCredit, closingBalance, month};
    }
    if (opBalance) {
        const month = `${opBalDate.toLocaleString('default', { month: 'short' })} ${opBalDate.getFullYear()}`;
        if (!monthlyDataObj[month]) 
            monthlyDataObj[month] = {
                openingBalance:0,  
                totalDebit:opBalance>0 ? opBalance : 0, 
                totalCredit:opBalance<0 ? Math.abs(opBalance) : 0,
                closingBalance:opBalance, 
                month,
            };
        else monthlyDataObj[month] = {...monthlyDataObj[month], openingBalance:0, 
            totalCredit:monthlyDataObj[month].totalCredit + (opBalance<0 ? Math.abs(opBalance) : 0), 
            totalDebit:monthlyDataObj[month].totalDebit + (opBalance>0 ? opBalance : 0),};
    }
    return monthlyDataObj;
}

function getAggragateObject(cashDataObject, bankDataObject){
    const aggragateObject = {...bankDataObject};
    for (const key in cashDataObject) {
        const [cashData, bankData] = [cashDataObject[key], bankDataObject[key]];
        const openingBalance = cashData.openingBalance + (bankData ? bankData.openingBalance : 0);
        const totalDebit = cashData.totalDebit + (bankData ? bankData.totalDebit : 0);
        const totalCredit = cashData.totalCredit + (bankData ? bankData.totalCredit : 0);
        const closingBalance = cashData.closingBalance + (bankData ? bankData.closingBalance : 0);
        aggragateObject[key] = {openingBalance, totalDebit, totalCredit, closingBalance, month:key};
    }
    return aggragateObject;
}


export default getMonthlyCashFlow;
