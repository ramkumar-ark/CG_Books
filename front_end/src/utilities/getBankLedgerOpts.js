
function getBankLedgerOpts(accounts){
    const cashAccounts = accounts.filter(e => e.group.name === 'Cash') || [];
    const bankAccounts = accounts.filter(e => e.group.name === 'Bank') || [];
    const bankSelectOpts = bankAccounts.map(e => ({label:e.name, value:e['_id']}));
    const cashSelectOpts = cashAccounts.map(e => ({label:e.name, value:e['_id']}));
    const selectOptions = [
        {label:'Cash', options:cashSelectOpts},
        {label:'Bank', options:bankSelectOpts},
    ];
    return selectOptions;
}

export default getBankLedgerOpts;
