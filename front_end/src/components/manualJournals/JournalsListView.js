import Header from "./HeaderViewAllJournals";
import JournalListItem from "./JournalListItem";
import { useHistory, useLocation, useParams } from "react-router-dom";
import useGetVouchers from "../../hooks/useGetVouchers";

const JournalsListView = () => {
    const {vouchers} = useGetVouchers('Journal');
    const history = useHistory();
    const {pathname} = useLocation();
    const params = useParams();
    return (
        <>
            <Header topOffset={0}/>
            {vouchers?.map(e => 
                <JournalListItem 
                    data={e} 
                    isSelected={e.transactionId.toString() === params.transactionId}
                    onClick={() => {history.replace(pathname.replace(params.transactionId, e.transactionId))}}
                />
            )}
        </>
    );
};

export default JournalsListView;
