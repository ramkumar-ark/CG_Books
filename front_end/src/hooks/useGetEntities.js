import useSelectedOrg from "./useSelectedOrg";
import { useGetCustomersQuery, useGetVendorsQuery } from "../service/mastersApi";
import transformEntitiesData from "../utilities/transformEntitiesData";

function useGetEntities(entityType='customer'){
    const { '_id': orgId } = useSelectedOrg();
    const { data, refetch } = useGetCustomersQuery(orgId, {skip: !orgId || entityType !== 'customer'});
    const { data:data1, refetch:refetch1 } = useGetVendorsQuery(orgId, 
        {skip: !orgId || entityType !== 'vendor'});
    const result = {...transformEntitiesData(entityType !== 'customer' ? data1 : data, entityType), 
        refetchEntities: entityType !== 'customer' ? refetch1 : refetch};
    return result;
}

export default useGetEntities;
