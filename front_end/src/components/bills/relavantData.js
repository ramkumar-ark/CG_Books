
export const filterOptionsList = [
    {label:'All Bills', filterField: 'all', filterFunction:(record) => true},
    {label:'Unpaid Bills', filterField: 'unpaid', filterFunction:(record) => record.pendingAmount>0},
    {label:'Overdue Bills', filterField:'overdue', filterFunction:(record) => Date.now() > record.dueDate},
    {label:'Partially Paid Bills', filterField:'partiallyPaid', 
        filterFunction:(record) => record.pendingAmount > 0 && record.pendingAmount < record.totalAmount},
    {label: 'Paid Bills', filterField:'paid', filterFunction:(record) => record.pendingAmount === 0}
];

export const sortOptionsList = [
    {label:'Created Time', sortField:'createdOn'}, 
    {label:'Last Modified Time', sortField:'modifiedOn'}, 
    {label:'Date', sortField:'date'}, 
    {label:'Bill#', sortField:'referenceNumber'}, 
    {label:'Vendor Name', sortField:'name'},
    {label:'Due Date', sortField:'dueDate'}, 
    {label:'Amount', sortField:'totalAmount'}, 
    {label:'Balance Due', sortField:'pendingAmount'}
];