import { useParams } from "react-router-dom";
import Header from "./Header";
import VoucherTable from "./VoucherTable";
import { useRef } from "react";
import useGetLedgerTransactions from "../../../hooks/useGetLedgerTransactions";
import useGetLedger from "../../../hooks/useGetLedger";

const ViewBank = () => {
    const {ledgerId} = useParams();
    const tableData = useGetLedgerTransactions(ledgerId);
    const ledger = useGetLedger(ledgerId);
    const headerRef = useRef(null);
    return (
        <>
            <Header title={ledger?.name} componentref={headerRef} />
            <VoucherTable topOffset={headerRef.current?.clientHeight} data={tableData}/>
        </>
    );
};

export default ViewBank;
