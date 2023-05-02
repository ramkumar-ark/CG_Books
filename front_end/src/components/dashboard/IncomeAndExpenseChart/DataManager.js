import getPeriod from "../periodData";

export default class DataManager {
    constructor(periodOption) {
        [this.startDate, this.endDate, this.period] = getPeriod(periodOption);
        this.openingBalance = 0;
        this.closingBalance = 0;
        this.data = this.initializeData();
    }

    initializeData() {
        const data = {};
        for (let i=0; i<this.period; i++) {
            const referenceDate = new Date(Date.UTC(this.startDate.getFullYear(), this.startDate.getMonth() + i, 1));
            const month = `${referenceDate.toLocaleString('default', { month: 'short' })} ${referenceDate.getFullYear()}`;
            data[`${month}-Income`] = {month, amount:0, type:'Income'};
            data[`${month}-Expense`] = {month, amount:0, type:'Expense'};
        }
        return data;
    }

    mergeData(dataObj) {
        const referenceDate = new Date(this.startDate);
        while (referenceDate < this.endDate) {
            const month = `${referenceDate.toLocaleString('default', { month: 'short' })} ${referenceDate.getFullYear()}`;            
            for (const type of ['Income', 'Expense']) {
                if (dataObj[`${month}-${type}`])
                    this.data[`${month}-${type}`] = {...dataObj[`${month}-${type}`]};
            }
            referenceDate.setMonth(referenceDate.getMonth() + 1);
        }
    }

    getTotalAmount(type) {
        return Object.values(this.data).reduce((pv, e) => pv + (e.type === type ? e.amount : 0), 0);
    }

    getRequiredData() {
        return {
            chartData:Object.values(this.data),
            otherData:{
                totalExpense:this.getTotalAmount('Expense'),
                totalIncome:this.getTotalAmount('Income'),
            },            
        };
    }
}
