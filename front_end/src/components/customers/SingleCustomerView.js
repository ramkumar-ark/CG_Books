import { Alert, Button, Dropdown, Popconfirm, Space, Tabs, Typography } from "antd";
import {CaretDownOutlined, CloseOutlined} from "@ant-design/icons"
import { useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useGetSelectedOrgQuery } from "../../service/appApi";
import { useDeleteEntityMutation, useGetCustomersQuery } from "../../service/mastersApi";
import useAuthentication from "../../useAuthentication";
import OverviewTab from "./OverviewTab";
import { useGetCustomerMonthlyIncomeQuery, useGetLedgerTransactionsQuery, useGetLedgerBalanceQuery } from "../../service/transactionsApi";
import StatementTab from "./StatementTab";

const { Text, Title, Link } = Typography;

const tabItems = (customer, organization) => [
    {key:'1', label:'Overview', children:<OverviewTab entity={customer}/>},
    {key:'2', label:'Transactions', children:'Contents of Transactions Tab'},
    {key:'3', label:'Statement', children:<StatementTab entity={customer} organization={organization}/>},
];

const SingleCustomerView = () => {
    const history = useHistory();
    const {entityId} = useParams();
    const {AuthCtx} = useAuthentication();
    const {user} = useContext(AuthCtx);
    const {data} = useGetSelectedOrgQuery(user.id);
    const orgId = data?.selectedOrg['_id'];
    const {data:data1, isLoading} = useGetCustomersQuery(orgId, {skip: !orgId});
    const {data:data2} = useGetLedgerBalanceQuery(orgId, {skip: !orgId});
    const customer = data1?.customers.find(e => e['_id'] === entityId);
    const customerLedgerId = customer?.ledger?.['_id'];
    const {data:data3} = useGetCustomerMonthlyIncomeQuery(
        {orgId, customerLedgerId}, {skip: !data1}
    );
    const {data:data4} = useGetLedgerTransactionsQuery({orgId, ledgerId: customerLedgerId}, {skip:!customerLedgerId});
    const customerTransactions = data4?.transactions;
    const monthlyIncome = data3 && Object.entries(data3).map(([k, v]) => ({month:k, income:v}));
    const receivable = {receivables: data2?.[customerLedgerId] || 0};
    const [deleteEntity, {isSuccess, isError, error, data:data5}] = useDeleteEntityMutation();
    const onDelete = () => {
        deleteEntity({params:{entityId, orgId}});
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    };
    const items = [
        {label:<Link onClick={() => {history.push('/app/home/invoices/new')}}>Invoice</Link>, key:0},
        {label:<Link onClick={() => {history.push('/app/home/paymentsreceived/new')}}>Customer Payment</Link>, key:1}, 
        {label:'Journals', key:2}
    ];
    if ([customer, data2, monthlyIncome, customerTransactions].every(e => e !== undefined))
    return (
        <>
        {data5?.result==="success" && history.goBack()}
        <div style={{display: 'flex', justifyContent:'space-between', margin:'0px 10px',
            position:'sticky', top:'64px', backgroundColor:'whitesmoke', zIndex:99}}>
            <Title level={2} style={{margin:"10px 0px"}}>{customer.name}</Title>
            <Space>
                <Button href={`/app/home/customers/edit/${entityId}`}>Edit</Button>
                <Dropdown menu={{items,}} trigger={['click']}>
                    <Button type="primary">New Transaction<CaretDownOutlined/></Button>
                </Dropdown>
                <Popconfirm title="Confirm Delete!" description="Are you sure to delete this customer? This action cannot be undone later."
                    okText="Yes" cancelText="No" placement="rightTop" onConfirm={onDelete}>
                    <Button>Delete</Button>
                </Popconfirm>
                <Link onClick={() => history.goBack()} style={{marginLeft:'5px'}}>
                    <CloseOutlined style={{fontSize:20, color:'grey'}}/>
                </Link>
            </Space>
        </div>
        {data5?.result==='failed' && <Alert message="Cannot Delete! There are transactions associated with the customer." type="error" closable showIcon={true} />}
        {isError && <Alert message="Operation Failed!" description="There was an error deleting the customer. Please try again later or contact support if the error persists." type="error" closable/>}
        <Tabs 
            defaultActiveKey="1" 
            items={tabItems({...customer, ...receivable, monthlyIncome, customerTransactions}, data?.selectedOrg)}
            size='small' 
            tabBarStyle={{position:'sticky', top:'122px', backgroundColor:"whitesmoke", 
                zIndex:99, paddingLeft:'10px', marginBottom:0}}
        />
        </>
    );
};

export default SingleCustomerView;
