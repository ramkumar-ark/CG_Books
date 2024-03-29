import Header from "./Header";
import useGetForViewReceipts from "./useGetForViewReceipts";
import ReceiptListItem from "./ReceiptListItem";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useRef } from "react";

const ReceiptsListView = () => {
    const {receiptsData, sortOptions, refetchVouchers} = useGetForViewReceipts();
    const history = useHistory();
    const {pathname} = useLocation();
    const params = useParams();
    const headerRef = useRef();
    return (
        <>
            <Header onRefresh={refetchVouchers} sortOptions={sortOptions} titleLevel={5} topOffset={0}
                componentRef={headerRef}/>
            {receiptsData?.map(e => 
                <ReceiptListItem 
                    data={e} 
                    isSelected={e.transactionId.toString() === params.transactionId}
                    onClick={() => {history.replace(pathname.replace(params.transactionId, e.transactionId))}}
                />
            )}
        </>
    );
};

export default ReceiptsListView;
