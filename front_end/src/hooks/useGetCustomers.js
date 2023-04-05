import useSelectedOrg from "./useSelectedOrg";
import { useGetCustomersQuery } from "../service/mastersApi";
import transformCustomerData from "../utilities/transformCustomerData";

function useGetCustomers(){
    const { '_id': orgId } = useSelectedOrg();
    const { data } = useGetCustomersQuery(orgId, {skip: !orgId});
    return transformCustomerData(data);
}

export default useGetCustomers;
