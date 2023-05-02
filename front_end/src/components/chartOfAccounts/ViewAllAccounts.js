import { useRef } from 'react';
import { useFetchMastersQuery } from '../../service/mastersApi';
import useGetLedgerBalances from '../../hooks/useGetLedgerBalances';
import useSelectedOrg from '../../hooks/useSelectedOrg';
import ChartOfAccountsTable from './ChartOfAccountsTable';
import Header from './Header';
import { notification } from 'antd';
import useGetLedgers from '../../hooks/useGetLedgers';

const ViewAllAccounts = () => {
    const ledgers = useGetLedgers();
    const [api, contextHolder] = notification.useNotification();
    const headerRef = useRef();
    return (
          <>
            {contextHolder}
            <Header componentref={headerRef} topOffset={0} api={api}/>
            <ChartOfAccountsTable data={ledgers} headerRef={headerRef} />
          </>
    );
};
export default ViewAllAccounts;
