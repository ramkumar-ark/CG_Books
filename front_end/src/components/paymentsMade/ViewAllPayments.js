import Header from "./HeaderViewAllPayments";
import { useRef } from "react";
import useGetData from "./useGetDataForViewAllPayments";
import PaymentsTable from "./PaymentsTable";


const ViewAllPayments = () => {
    const { refetchVouchers, sortOptions, paymentsData } = useGetData();
    const headerRef = useRef(null);
    return (
        <div style={{position:'relative'}}>
            <Header onRefresh={refetchVouchers} componentRef={headerRef} topOffset={0} titleLevel={3}
                sortOptions={sortOptions} />
            <PaymentsTable data={paymentsData} topOffset={headerRef.current?.clientHeight}/>
        </div>
    );
};

export default ViewAllPayments;
