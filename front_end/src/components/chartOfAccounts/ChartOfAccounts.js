import { Table } from 'antd';
import { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFetchMastersQuery } from '../../service/fetchMasters';
import useOrganization from '../../useOrganization';
const columns = [
  {
    title: 'Sl. No.',
    dataIndex: 'slNo',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Under',
    dataIndex: 'group',
  },
  {
    title: 'Opening Balance',
    dataIndex: 'opBal',
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
    const {OrgCtx} = useOrganization();
    const { selectedOrg } = useContext(OrgCtx);
    const {data, isLoading, isError, isFetching, error} = useFetchMastersQuery(selectedOrg['_id']);
    console.log(data)
    const groups = {};
    let ledgers = [];
    if (data){
        data.groups.forEach(e => {groups[e['_id']] = e});
        ledgers = data.ledgers.map(({_id, name, group, opBalance}, i) => ({key:_id, slNo:i+1, name, group:groups[group].name, opBal:opBalance}));
    }
    return (
        <div>
            <div style={{position:"sticky", top:'64px', minHeight:'30px'}}>
                <h1 style={{margin:"10px 0"}}>Active Accounts</h1>
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
                sticky={{offsetHeader:94}}
            />
        </div>
    );
};
export default ChartOfAccounts;