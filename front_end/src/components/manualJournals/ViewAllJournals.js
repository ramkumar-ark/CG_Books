import { useRef } from "react";
import HeaderViewAllJournals from "./HeaderViewAllJournals";
import JournalsTable from "./JournalsTable";
import useGetVouchers from "../../hooks/useGetVouchers";

const ViewAllJournals = () => {
    const headerRef = useRef();
    const {vouchers} = useGetVouchers('Journal');
    return (
        <>
            <HeaderViewAllJournals componentref={headerRef} topOffset={0}/>
            <JournalsTable tableData={vouchers} topOffset={headerRef.current?.clientHeight}/>
        </>
    );
};

export default ViewAllJournals;
