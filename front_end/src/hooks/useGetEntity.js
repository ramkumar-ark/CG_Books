import { useParams } from 'react-router-dom';
import { useGetEntityQuery } from '../service/mastersApi';
import useSelectedOrg from './useSelectedOrg';

export default function useGetEntity(){
    const {entityId} = useParams();
    const {'_id': orgId} = useSelectedOrg();
    const {data, isLoading:isFetching} = useGetEntityQuery({params:{orgId, entityId}}, 
        {skip:!orgId || !entityId});
    return {customer: data?.customer, isFetching};
}