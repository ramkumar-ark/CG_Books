import getPeriod from "../periodData";

export default class DataManager {
    constructor(periodOption) {
        [this.startDate, this.endDate, this.period] = getPeriod(periodOption);
        this.openingBalance = 0;
        this.closingBalance = 0;
        this.data = this.initializeData(this.period);
    }

    initializeData(months) {
        const data = {};
        for (let i=0; i<months; i++) {
            const referenceDate = new Date(Date.UTC(this.startDate.getFullYear(), this.startDate.getMonth() + i, 1));
            const month = `${referenceDate.toLocaleString('default', { month: 'short' })} ${referenceDate.getFullYear()}`;
            data[month] = {month, closingBalance:0, openingBalance:0, totalDebit:0, totalCredit:0};
        }
        return data;
    }

    mergeData(dataObj, opBalDate) {
        const startMonth = `${this.startDate.toLocaleString('default', { month: 'short' })} ${this.startDate.getFullYear()}`;
        let runningBalance = 0;
        const referenceDate = new Date(this.startDate);
        if (!dataObj[startMonth] && this.startDate > new Date(opBalDate)) {
            const tempDate = new Date(Date.UTC(this.startDate.getFullYear(), this.startDate.getMonth()-1, 1));
            let month = `${tempDate.toLocaleString('default', { month: 'short' })} ${tempDate.getFullYear()}`;
            while (!dataObj[month]) {
                tempDate.setMonth(tempDate.getMonth() - 1);
                month = `${tempDate.toLocaleString('default', { month: 'short' })} ${tempDate.getFullYear()}`;
            }
            runningBalance = dataObj[month]?.closingBalance || 0; 
            this.openingBalance = dataObj[month]?.closingBalance || 0;
        }
        else this.openingBalance = dataObj[startMonth]?.openingBalance || 0;
        while (referenceDate < this.endDate) {
            const month = `${referenceDate.toLocaleString('default', { month: 'short' })} ${referenceDate.getFullYear()}`;            
            if (dataObj[month]) {
                this.data[month] = {...dataObj[month]};
                runningBalance = this.data[month].closingBalance;
            }else{
                this.data[month].openingBalance = runningBalance;
                this.data[month].closingBalance = runningBalance;
            }
            referenceDate.setMonth(referenceDate.getMonth() + 1);
        }
        this.closingBalance = runningBalance;  
    }

    getTotalDebit() {
        return Object.values(this.data).reduce((pv, e) => pv + e.totalDebit, 0);
    }

    getTotalCredit() {
        return Object.values(this.data).reduce((pv, e) => pv + e.totalCredit, 0);
    }

    getRequiredData() {
        return {
            chartData:Object.values(this.data),
            otherData:{
                startDate:this.startDate,
                endDate:this.endDate,
                openingBalance:this.openingBalance,
                closingBalance:this.closingBalance,
                totalCredit:this.getTotalCredit(),
                totalDebit:this.getTotalDebit(),
            },            
        };
    }
}
