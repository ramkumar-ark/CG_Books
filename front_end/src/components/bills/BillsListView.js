import { useRef } from "react";
import Header from "./Header";
import useGetDataForViewAllBills from "./useGetDataForViewAllBills";
import BillOrInvoiceListItem from "../individual components/BillOrInvoiceListItem";
import { useHistory, useLocation, useParams } from "react-router-dom";

const BillsListView = ({}) => {
    const history = useHistory();
    const {pathname} = useLocation();
    const {transactionId} = useParams();
    const headerRef = useRef(null);
    const { refetchBills, sortOptionsList, filterOptionsList, billsData } = useGetDataForViewAllBills();
    return (
        <>
            <Header componentRef={headerRef}  onRefresh={refetchBills} topOffset={0} titleLevel={4} 
                filterOptionsList={filterOptionsList} sortOptionsList={sortOptionsList} />
            {billsData?.map(e => 
                <BillOrInvoiceListItem 
                    data={e} 
                    isSelected={e.transactionId.toString() === transactionId}
                    onClick={() => {history.replace(pathname.replace(transactionId, e.transactionId))}}
                />
            )}
        </>
    );
};

export default BillsListView;