import Header from "./Header";
import useGetDataForAllVendors from "./useGetDataForVendorsTable";
import { useHistory, useLocation, useParams } from "react-router-dom";
import VendorListItem from "./VendorListItem";

const VendorListSection = () => {
    const {vendorsTableData, refetchFunction, sortOptions} = useGetDataForAllVendors();
    const history = useHistory();
    const {pathname} = useLocation();
    const params = useParams();
    return (
        <>
            <Header onRefresh={refetchFunction} sortOptions={sortOptions} titleLevel={5} topOffset={0}/>
            {vendorsTableData?.map((e, i) => 
                <VendorListItem key={i+1}
                    data={e} 
                    isSelected={e.id.toString() === params.entityId}
                    onClick={() => {history.replace(pathname.replace(params.entityId, e.id))}}
                />
            )}
        </>
    );
};

export default VendorListSection;
