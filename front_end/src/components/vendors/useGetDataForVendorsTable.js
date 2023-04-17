import useGetEntities from "../../hooks/useGetEntities";
import useGetLedgerBalances from "../../hooks/useGetLedgerBalances";
import { sortOptions } from "./relavantData";
import useSearchParams from "../../hooks/useSearchParams";

export default function useGetDataForAllVendors(){
    const {sortBy, sortOrder} = useSearchParams();
    const {entityList, refetchEntities} = useGetEntities('vendor');
    const {data:closingBalances, refetch: refetchBalances} = useGetLedgerBalances();
    const vendorsTableData = formatTableData(entityList, closingBalances);
    vendorsTableData.sort((a,b) => sortOrder==='A' ? a[sortBy]-b[sortBy] : b[sortBy]-a[sortBy]);
    const refetchFunction = () => {
        refetchEntities();
        refetchBalances();
    };
    return {vendorsTableData, refetchFunction, sortOptions};
}

function formatTableData(entitiesList, closingBalances){
    if (entitiesList && closingBalances){
        return entitiesList.map(e => ({
            name:e.name, companyName:e.companyName, email:e.primaryContact?.email, 
            workPhone: e.primaryContact?.workPhone, payables: closingBalances[e.ledger['_id']] * -1, 
            id:e['_id'], createdOn: new Date(e.createdOn), 
            modifiedOn: new Date(e.lastUpdatedOn || e.createdOn), 
        }))
    }
    return [];
}
