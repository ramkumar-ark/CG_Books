import { useRef, useState } from 'react';
import ChartOfAccountsTable from './ChartOfAccountsTable';
import Header from './Header';
import { notification } from 'antd';
import useGetLedgers from '../../hooks/useGetLedgers';

const ViewAllAccounts = () => {
    const ledgers = useGetLedgers();
    const [api, contextHolder] = notification.useNotification();
    const headerRef = useRef();
    const [ledgerIdsToDelete, setLedgerIdsToDelete] = useState([]);
    return (
          <>
            {contextHolder}
            <Header componentref={headerRef} topOffset={0} api={api} ledgerIdsToDelete={ledgerIdsToDelete}/>
            <ChartOfAccountsTable data={ledgers} headerRef={headerRef} onRowSelect={setLedgerIdsToDelete}/>
          </>
    );
};
export default ViewAllAccounts;
