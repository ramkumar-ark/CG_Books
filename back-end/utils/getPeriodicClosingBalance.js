
const getPeriodicClosingBalances = ({transactions, timeUnit, timeValue}) => {
    const initializeDataParams = {
        months: timeUnit==='month' ? timeValue : 0,
        days: timeUnit==='day' ? timeValue : 0,
    };
    const data = initializeData(initializeDataParams);
    const startDate = getStartDate(initializeDataParams);
    let openingBalance = 0;
    for (const transac of transactions) {
        if (transac.date < startDate) openingBalance = transac.runningBalance;
        const month = `${transac.date.toLocaleString('default', { month: 'short' })} ${transac.date.getFullYear()}`;
        const date = transac.date.toLocaleDateString('en-IN', {day:'2-digit', month:'2-digit', year:'numeric'});
        if (initializeDataParams.months > 0 && data[month]!==undefined) data[month] = data[month] + transac.runningBalance;
        if (initializeDataParams.days > 0 && data[date]!==undefined) data[date] = data[date] + transac.runningBalance;
    }
    const result = [];
    let closingBalance = openingBalance;
    for (const entry in data) {
        closingBalance = (data[entry] !== 0) ? data[entry] : closingBalance;
        result.push({period:entry, closingBalance});
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
