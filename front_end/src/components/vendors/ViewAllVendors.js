import Header from "./Header";
import { useRef } from "react";
import useGetDataForAllVendors from "./useGetDataForVendorsTable";
import VendorsTable from "./VendorsTable";

const ViewAllVendors = () => {
    const {vendorsTableData, refetchFunction, sortOptions} = useGetDataForAllVendors();
    const headerRef = useRef(null);
    return (
        <div style={{position:'relative'}}>
            <Header onRefresh={refetchFunction} sortOptions={sortOptions} componentRef={headerRef}
                topOffset={0}/>
            <VendorsTable data={vendorsTableData} topOffset={headerRef.current?.clientHeight}/>
        </div>
    );
};

export default ViewAllVendors;
