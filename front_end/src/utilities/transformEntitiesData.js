function transformEntitiesData(data, entityType){
    const entityDataObj = {};
    const entityList = data?.[`${entityType}s`];
    const entitySelectList = data?.[`${entityType}s`].map(e => {
        entityDataObj[e['_id']] = {...e};
        return {label:e.name, value:e['_id']}
    });
    return {entityList, entitySelectList, entityDataObj};
}

export default transformEntitiesData;
