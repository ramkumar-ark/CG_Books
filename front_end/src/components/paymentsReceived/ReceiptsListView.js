import Header from "./Header";
import useGetForViewReceipts from "./useGetForViewReceipts";
import ReceiptListItem from "./ReceiptListItem";
import { useHistory, useLocation, useParams } from "react-router-dom";

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
                    isSelected={e.transactionId.toString() === params.transactionid}
                    onClick={() => {history.replace(pathname.replace(params.transactionid, e.transactionId))}}
                />
            )}
        </>
    );
};

export default ReceiptsListView;
