import { Button, Dropdown, Space, Tabs, Typography } from "antd";
import {CaretDownOutlined, CloseOutlined} from "@ant-design/icons"
import { useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useGetSelectedOrgQuery } from "../../service/appApi";
import { useGetCustomersQuery } from "../../service/mastersApi";
import useAuthentication from "../../useAuthentication";
import OverviewTab from "./OverviewTab";
import { useGetCustomerMonthlyIncomeQuery, useGetLedgerBalanceQuery } from "../../service/transactionsApi";

const { Text, Title, Link } = Typography;

const items = [
    {label:'Invoice', key:0},{label:'Customer Payment', key:1}, {label:'Journals', key:2}
];

const tabItems = (customer) => [
    {key:'1', label:'Overview', children:<OverviewTab entity={customer}/>},
    {key:'2', label:'Transactions', children:'Contents of Transactions Tab'},
    {key:'3', label:'Statement', children:'Contents of Statement Tab'},
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
    const {data:data3} = useGetCustomerMonthlyIncomeQuery(
        {orgId, customerLedgerId: customer?.ledger?.['_id']}, {skip: !data1}
    );
    const monthlyIncome = data3 && Object.entries(data3).map(([k, v]) => ({month:k, income:v}));
    const receivable = {receivables: data2?.[customer?.ledger['_id']] || 0}
    if (customer && data2 && monthlyIncome)
    return (
        <>
        <div style={{display: 'flex', justifyContent:'space-between', margin:'0px 10px',
            position:'sticky', top:'64px', backgroundColor:'whitesmoke', zIndex:99}}>
            <Title level={2} style={{margin:"10px 0px"}}>{customer.name}</Title>
            <Space>
                <Button>Edit</Button>
                <Dropdown menu={{items,}} trigger={['click']}>
                    <Button type="primary">New Transaction<CaretDownOutlined/></Button>
                </Dropdown>
                <Button>Delete</Button>
                <Link onClick={() => history.goBack()} style={{marginLeft:'5px'}}>
                    <CloseOutlined style={{fontSize:20, color:'grey'}}/>
                </Link>
            </Space>
        </div>
        <Tabs defaultActiveKey="1" items={tabItems({...customer, ...receivable, monthlyIncome})} 
            size='small' tabBarStyle={{position:'sticky', top:'122px', backgroundColor:"whitesmoke", 
            zIndex:99, paddingLeft:'10px', marginBottom:0}}/>
        </>
    );
};

export default SingleCustomerView;
