
const getPeriodicClosingBalances = ({transactions, timeUnit, timeValue, groupOrLedgerName, opBalDate, 
    openingBalance, }) => {
    const initializeDataParams = {
        months: timeUnit==='month' ? timeValue : 0,
        days: timeUnit==='day' ? timeValue : 0,
    };
    const data = initializeData(initializeDataParams);
    const startDate = getStartDate(initializeDataParams);
    const openingBalanceDate = new Date(opBalDate);
    let closingBalance = 0;
    if (openingBalanceDate < startDate) closingBalance = openingBalance;
    else {
        const month = `${openingBalanceDate.toLocaleString('default', { month: 'short' })} ${openingBalanceDate.getFullYear()}`;
        const date = openingBalanceDate.toLocaleDateString('en-IN', {day:'2-digit', month:'2-digit', year:'numeric'});
        if (initializeDataParams.months > 0) data[month] = openingBalance;
        if (initializeDataParams.days > 0) data[date] = openingBalance; 
    }
    for (const transac of transactions) {
        const transactionDate = new Date(transac.date);
        if (transactionDate < startDate) closingBalance = transac.runningBalance;
        const month = `${transactionDate.toLocaleString('default', { month: 'short' })} ${transactionDate.getFullYear()}`;
        const date = transactionDate.toLocaleDateString('en-IN', {day:'2-digit', month:'2-digit', year:'numeric'});
        if (initializeDataParams.months > 0 && data[month]!==undefined) data[month] = transac.runningBalance;
        if (initializeDataParams.days > 0 && data[date]!==undefined) data[date] = transac.runningBalance;
    }
    const result = [];
    for (const entry in data) {
        closingBalance = (data[entry] !== 0) ? data[entry] : closingBalance;
        result.push({period:entry, closingBalance, name:groupOrLedgerName});
    }
    return result;
};

function initializeData({months, days}) {
    const today = new Date();
    const initialData = {};
    for (let i=(months || days); i>=0; i--) {
        const date = new Date();
        days && date.setDate(today.getDate() - i);
        months && date.setMonth(today.getMonth() - i);
        const month = months && `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
        const dailyDate = days && date.toLocaleDateString('en-IN', {day:'2-digit', month:'2-digit', year:'numeric'});
        initialData[month || dailyDate] = 0;
    }
    return initialData;
}

function getStartDate({months, days}) {
    const today = new Date();
    if (months) {
        today.setMonth(today.getMonth() - months);
        today.setDate(-1);
    }
    else if (days) {
        today.setDate(today.getDate() - days);
    }
    return today;
}

export default getPeriodicClosingBalances;
