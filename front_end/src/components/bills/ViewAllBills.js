import Header from "./Header";
import { useRef } from "react";
import useGetDataForViewAllBills from "./useGetDataForViewAllBills";
import BillsTable from "./BillsTable";


const ViewAllBills = () => {
    const { refetchBills, sortOptionsList, filterOptionsList, billsData } = useGetDataForViewAllBills();
    const headerRef = useRef(null);
    return (
        <div style={{position:'relative'}}>
            <Header onRefresh={refetchBills} componentRef={headerRef} topOffset={0} titleLevel={3}
                filterOptionsList={filterOptionsList} sortOptionsList={sortOptionsList} />
            <BillsTable data={billsData} topOffset={headerRef.current?.clientHeight}/>
        </div>
    );
};

export default ViewAllBills;
