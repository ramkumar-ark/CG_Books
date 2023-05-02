import getPeriod from "../periodData";

export default class DataManager {
    constructor(periodOption) {
        [this.startDate, this.endDate, this.period] = getPeriod(periodOption);
        this.data = [];
    }

    mergeData(dataArray) {
        const dataObj = {};
        dataArray.forEach((e) => {
            const itemDate = new Date('2 ' + e.month);
            if (this.startDate <= itemDate && this.endDate >= itemDate) {
                dataObj[e.expense] = {expense:e.expense, amount:e.amount + (dataObj[e.expense]?.amount || 0)}; 
            }            
        });
        this.data = Object.values(dataObj).filter(e => e.amount>0);
    }

    getRequiredData() {
        return this.data;
    }
}
