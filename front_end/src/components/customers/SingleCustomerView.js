import { Alert, Button, Dropdown, Popconfirm, Space, Typography } from "antd";
import {CaretDownOutlined, CloseOutlined} from "@ant-design/icons"
import { useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDeleteEntityMutation } from "../../service/mastersApi";
import { useGetCustomerMonthlyIncomeQuery, useGetLedgerTransactionsQuery, useGetLedgerBalanceQuery } from "../../service/transactionsApi";
import useGetEntity from "../../hooks/useGetEntity";
import TabsCustomerView from "./TabsCustomerView";
import useSelectedOrg from "../../hooks/useSelectedOrg";

const { Text, Title, Link } = Typography;



const SingleCustomerView = () => {
    const history = useHistory();
    const {entityId} = useParams();
    const selectedOrg = useSelectedOrg();
    const orgId = selectedOrg['_id'];
    const {data:data2} = useGetLedgerBalanceQuery(orgId, {skip: !orgId});
    const {customer} = useGetEntity();
    const customerLedgerId = customer?.ledger?.['_id'];
    const {data:data3} = useGetCustomerMonthlyIncomeQuery(
        {orgId, customerLedgerId}, {skip: !customer}
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
    const headerRef = useRef();
    if ([customer, data2, monthlyIncome, customerTransactions].every(e => e !== undefined))
    return (
        <>
        {data5?.result==="success" && history.goBack()}
        <div style={{display: 'flex', justifyContent:'space-between', margin:'0px 10px',
            position:'sticky', top:0, backgroundColor:'whitesmoke', zIndex:99}} ref={headerRef}>
            <Title level={2} style={{margin:"10px 0px", wordBreak:'normal'}}>{customer.name}</Title>
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
        <TabsCustomerView customer={{...customer, ...receivable, monthlyIncome, customerTransactions}}
            organization={selectedOrg} headerRef={headerRef}/>
        </>
    );
};

export default SingleCustomerView;
