import { Table, Typography } from 'antd';
import { useContext, useRef } from 'react';
import { useGetSelectedOrgQuery } from '../../service/appApi';
import { useFetchMastersQuery } from '../../service/mastersApi';
import useAuthentication from '../../useAuthentication';
import useGetLedgerBalances from '../../hooks/useGetLedgerBalances';

const {Title} = Typography;

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a,b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
  },
  {
    title: 'Under',
    dataIndex: 'group',
    sorter: (a,b) => a.group.toLowerCase().localeCompare(b.group.toLowerCase()),
  },
  {
    title: 'Opening Balance',
    dataIndex: 'opBal',
    align: 'right',
    render: (text) => text !== 0 && `₹${Math.abs(text).toLocaleString('en-IN', {minimumFractionDigits:2})} ${text < 0 ? 'Cr' : 'Dr'}`,
    sorter: (a,b) => a['opBal'] - b['opBal'],
  },
  {
    title: 'Closing Balance',
    dataIndex: 'clBal',
    align: 'right',
    render: (text) => text !== 0 && `₹${Math.abs(text).toLocaleString('en-IN', {minimumFractionDigits:2})} ${text < 0 ? 'Cr' : 'Dr'}`,
    sorter: (a,b) => a['clBal'] - b['clBal'],
  }
];

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Disabled User',
    // Column configuration not to be checked
    name: record.name,
  }),
};
const ChartOfAccounts = () => {
    const { AuthCtx } = useAuthentication();
    const { user } = useContext(AuthCtx);
    const { data } = useGetSelectedOrgQuery(user.id);
    const orgId = data?.selectedOrg?.['_id'];
    const { data: data1 } = useFetchMastersQuery(orgId, { skip: !orgId });
    const {data:closingBalances} = useGetLedgerBalances();
    const groups = {};
    let ledgers = [];
    if (data1 && closingBalances){
        data1.groups.forEach(e => {groups[e['_id']] = e});
        ledgers = data1.ledgers.map(({_id, name, group, opBalance}, i) => ({key:_id, slNo:i+1, name, group:groups[group].name, opBal:opBalance, clBal:closingBalances[_id] || 0}));
    }
    const headerRef = useRef();
    return (
          <>
            <div style={{borderBottom:"ridge", position:"sticky", top:0, zIndex:999, 
              backgroundColor:"whitesmoke", display:'flex', padding:'0px 15px'}} ref={headerRef}>
                <Title level={3} style={{margin:"10px 0"}}>Active Accounts</Title>
            </div>
            {/* <Divider /> */}
            <Table
                rowSelection={{
                // type: selectionType,
                ...rowSelection,
                }}
                size='small'
                columns={columns}
                dataSource={
                    ledgers
                }
                // scroll={{
                //     y: 500,
                //   }}
                pagination={false}
                // tableLayout={'auto'}
                sticky={{offsetHeader:headerRef.current?.clientHeight+3}}
            />
        </>
    );
};
export default ChartOfAccounts;