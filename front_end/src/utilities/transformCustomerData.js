function transformCustomerData(data){
    const customerDataObj = {};
    const customerList = data?.customers.map(e => {
        customerDataObj[e['_id']] = {...e};
        return {label:e.name, value:e['_id']}
    });
    return {customerList, customerDataObj};
}

export default transformCustomerData;
