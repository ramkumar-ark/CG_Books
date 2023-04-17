import Header from "./Header";
import ReceiptsTable from "./ReceiptsTable";
import useGetForViewReceipts from "./useGetForViewReceipts";
import { useRef } from "react";

const ViewAllReceipts = () => {
    const {receiptsData, sortOptions, refetchVouchers} = useGetForViewReceipts();
    const headerRef = useRef(null);
    return (
        <div style={{position:'relative'}}>
            <Header onRefresh={refetchVouchers} sortOptions={sortOptions} componentRef={headerRef}
                topOffset={0}/>
            <ReceiptsTable data={receiptsData} topOffset={headerRef.current?.clientHeight}/>
        </div>
    );
};

export default ViewAllReceipts;
