import Header from "./HeaderViewAllPayments";
import useGetData from "./useGetDataForViewAllPayments";
import PaymentListItem from "./PaymentListItem";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useRef } from "react";

const PaymentsListView = () => {
    const { refetchVouchers, sortOptions, paymentsData } = useGetData();
    const history = useHistory();
    const {pathname} = useLocation();
    const params = useParams();
    const headerRef = useRef();
    return (
        <>
            <Header onRefresh={refetchVouchers} sortOptions={sortOptions} titleLevel={5} topOffset={0}
                componentRef={headerRef}/>
            {paymentsData?.map(e => 
                <PaymentListItem 
                    data={e} 
                    isSelected={e.transactionId.toString() === params.transactionId}
                    onClick={() => {history.replace(pathname.replace(params.transactionId, e.transactionId))}}
                />
            )}
        </>
    );
};

export default PaymentsListView;
