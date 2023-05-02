export const periodOptions = [
    {label:'This Fiscal Year', value:'cfy'},
    {label:'Previous Fiscal Year', value:'pfy'},
    {label:'Last 12 Months', value:'ltm'},
];

export const periodOptions2 = [
    {label:'This Fiscal Year', value:'cfy'},
    {label:'Previous Fiscal Year', value:'pfy'},
    {label:'Last 12 Months', value:'ltm'},
    {label:'Last 6 Months', value:'lsm'},
];

export const periodOptions3 = [
    {label:'This Fiscal Year', value:'cfy'},
    {label:'This Quarter', value:'cq'},
    {label:'This Month', value:'cm'},
    {label:'Previous Fiscal Year', value: 'pfy'},
    {label:'Previous Quarter', value:'pq'},
    {label:'Previous Month', value:'pm'},
    {label:'Last 6 Months', value:'lsm'},
    {label:'Last 12 Months', value:'ltm'},
];

export default function getPeriod(periodOption) {
    let startDate, endDate, noOfMonths;
    const currentDate = new Date();
    switch (periodOption) {
        case 'cfy':
            startDate = new Date(Date.UTC(currentDate.getFullYear() - 
                (currentDate.getMonth() > 2 ? 0 : 1), 3, 1));
            endDate = new Date(Date.UTC(currentDate.getFullYear() + 
                (currentDate.getMonth() > 2 ? 1 : 0), 2, 31));
            noOfMonths = 12;
            break;
        case 'pfy':
            startDate = new Date(Date.UTC(currentDate.getFullYear() - 
                (currentDate.getMonth() > 2 ? 1 : 2), 3, 1));
            endDate = new Date(Date.UTC(currentDate.getFullYear() -
                (currentDate.getMonth() > 2 ? 0 : 1), 2, 31));
                noOfMonths = 12;
                break;
        case 'ltm':
            startDate = new Date(currentDate);
            startDate.setMonth(currentDate.getMonth() - 11);
            startDate.setDate(1);
            endDate = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth()+1, 0));
            noOfMonths = 12;
            break;
        case 'lsm':
            startDate = new Date(currentDate);
            startDate.setMonth(currentDate.getMonth() - 5);
            startDate.setDate(1);
            endDate = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth()+1, 0));
            noOfMonths = 6;
            break;
        case 'cm':
            startDate = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), 1));
            endDate = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth()+1, 0));
            noOfMonths = 0;
            break;
        case 'pm':
            startDate = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
            endDate = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), 0));
            noOfMonths = 0;
            break;
        case 'cq':
            startDate = new Date(currentDate);
            startDate.setMonth(Math.floor(currentDate.getMonth() / 3) * 3);
            startDate.setDate(1);
            endDate = new Date(Date.UTC(startDate.getFullYear(), startDate.getMonth() + 4, 0));
            noOfMonths = 3;
            break;
        case 'pq':
            startDate = new Date(currentDate);
            startDate.setMonth((Math.floor(currentDate.getMonth() / 3) * 3) - 3);
            startDate.setDate(1);
            endDate = new Date(Date.UTC(startDate.getFullYear(), startDate.getMonth() + 3, 0));
            noOfMonths = 3;
            break;
        default:
            break;
    }
    return [startDate, endDate, noOfMonths];
}   