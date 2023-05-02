import useGetLedgers from '../../hooks/useGetLedgers';
import { useHistory, useLocation, useParams } from "react-router-dom";
import Header from "./Header";
import AccountListItem from "./AccountListItem";

const AccountsListView = ({api}) => {
    const history = useHistory();
    const {pathname} = useLocation();
    const {ledgerId} = useParams();
    const ledgers = useGetLedgers();
    return (
        <>
            <Header api={api} topOffset={0}/> 
            {ledgers?.map(e => 
                <AccountListItem 
                    data={e} 
                    isSelected={e.key === ledgerId}
                    onClick={() => {history.replace(pathname.replace(ledgerId, e.key))}}
                />
            )}
        </>
    );
};

export default AccountsListView;