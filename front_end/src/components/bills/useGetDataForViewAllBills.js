import useGetVouchers from '../../hooks/useGetVouchers';
import { useUrlQueryOptions } from '../../hooks/useSearchQueryHooks';
import {filterOptionsList, sortOptionsList} from './relavantData';

export default function useGetDataForViewAllBills() {
    const [sortField, sortOrder] = useUrlQueryOptions('sort');
    const [filterField] = useUrlQueryOptions('filter');
    const filterFunction = filterOptionsList.find(e => 
        e.filterField === (filterField || filterOptionsList[0].filterField)).filterFunction;
    const {vouchers: bills, refetchVouchers:refetchBills} = useGetVouchers('Purchase');
    bills?.sort((a, b) => (a[sortField] - b[sortField]) * sortOrder);
    const billsData = bills?.filter(e => filterFunction(e));
    return {filterOptionsList, sortOptionsList, refetchBills, billsData};
}