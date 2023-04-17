import { Typography, Space, Button, Dropdown, Select } from "antd";
import Icon, { PlusOutlined, DownOutlined, CalendarTwoTone, BankOutlined, LineChartOutlined, CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ReactComponent as CashIconSvg} from '../../resources/images/CashIcon.svg';
import { ReactComponent as OpBalIconSvg} from '../../resources/images/OpBalIcon.svg';
import { ReactComponent as ClBalIconSvg} from '../../resources/images/ClBalIcon.svg';
import { useContext, useState } from "react";
import OverviewChart from "./OverviewChart";
import OverviewTable from "./OverviewTable";
import { useGetBankAccountsQuery } from "../../service/mastersApi";
import useAuthentication from "../../useAuthentication";
import { useGetSelectedOrgQuery } from "../../service/appApi";
import { useGetLedgerBalanceQuery } from "../../service/transactionsApi";

const { Title, Text } = Typography;


const CashIcon = (props) => <Icon component={CashIconSvg} {...props} />;
const OpBalIcon = (props) => <Icon component={OpBalIconSvg} {...props} />;
const ClBalIcon = (props) => <Icon component={ClBalIconSvg} {...props} />;

const Banking = () => {
    const { AuthCtx } = useAuthentication();
    const { user } = useContext(AuthCtx);
    const [showChart, setShowChart] = useState(false);
    const [filterField, setFilterField] = useState('All Accounts');
    const { data } = useGetSelectedOrgQuery(user.id);
    const orgId = data?.selectedOrg?.['_id'];
    const { data:data1 } = useGetBankAccountsQuery(orgId, {skip: !orgId});
    const { data:closingBalances } = useGetLedgerBalanceQuery(orgId, {skip: !orgId});
    const cashAccounts = data1?.accounts.filter(e => e.group.name === 'Cash') || [];
    const bankAccounts = data1?.accounts.filter(e => e.group.name === 'Bank') || [];
    const bankFilterOpts = bankAccounts.map(e => ({label:<Typography.Link onClick={()=>{setFilterField(e.name)}}>{e.name}</Typography.Link>, key:e['_id']}));
    const cashFilterOpts = cashAccounts.map(e => ({label:<Typography.Link onClick={()=>{setFilterField(e.name)}}>{e.name}</Typography.Link>, key:e['_id']}));
    const filterOptions = [
        {label:<Typography.Link onClick={()=>{setFilterField('All Accounts')}}>All Accounts</Typography.Link>, key:1},
        {type: 'divider'},
        ...cashFilterOpts,
        {type: 'divider'},
        ...bankFilterOpts,
    ];
    const tableData = [...cashAccounts, ...bankAccounts].map(e => ({
        name: e.name, type: e.group.name.toLowerCase(), balance:closingBalances?.[e['_id']] || 0,
    }));
    const aggregateClBal = (ledgers) => ledgers.reduce((sum,e) => sum + (closingBalances?.[e['_id']] || 0),0);
    return (
        <>
            <div style={{borderBottom:"ridge", position:"sticky", top:0, zIndex:999, backgroundColor:"whitesmoke"}}>
            <div style={{textAlign:"left", margin:"0px 20px", display:"flex", justifyContent:"space-between",
                flexWrap:'wrap'}}>
                <Title level={3}>Banking Overview</Title>
                <Space style={{marginLeft:30}}>
                    <Link to="/app/home/banking/new">
                        <Button type="primary"><PlusOutlined />Add Bank</Button>
                    </Link>
                </Space>
            </div>
            </div>
            <div style={{margin:10, borderRadius:16, border: '1px solid #dee2e6', backgroundColor:'white',
                boxShadow:'5px 5px #fcfcfe'}}>
                <div style={{display:'flex', flexWrap:'wrap', justifyContent:'space-between', alignItems:'center',
                    margin:'0 30px', borderBottom:'1px solid #eee'}}>
                    <Dropdown trigger={['click']} menu={{items:filterOptions, selectable:true}}>
                        <Typography.Link><Title level={4} style={{marginTop:'15px'}}>
                            {filterField} <DownOutlined style={{color:"#408dfb", fontSize:"15px"}}/>
                        </Title></Typography.Link>
                    </Dropdown>
                    <div style={{textAlign:'right', marginLeft:30, display:"flex", justifyContent:'end', alignItems:'center'}}>
                        <CalendarTwoTone/>
                        <Select 
                            options={[
                                {label:'Last 30 days', value:'30 days'}, 
                                {label:'Last 12 months', value:'12 months'}]}
                            bordered={false}
                            defaultValue='30 days'
                            size='middle'
                            />
                    </div>
                </div>
                <div style={{margin:30, textAlign:'left'}}>
                    {filterField === 'All Accounts'
                    ? (
                    <Space size='large' wrap={true}>
                        <Space>
                            <div style={{backgroundColor:'whitesmoke', borderRadius:16, width:50, 
                                textAlign:'center'}}>
                                <CashIcon style={{fontSize:30, color:'blue', margin:`10px 5px`}}/>
                            </div>
                            <Space direction="vertical">
                                <Text>Cash In Hand</Text>
                                <Text>₹ {aggregateClBal(cashAccounts).toLocaleString('en-IN', {minimumFractionDigits:2})}</Text>
                            </Space>
                        </Space>
                        <Space>
                            <div style={{backgroundColor:'#e8faf0', borderRadius:16, width:50, 
                                textAlign:'center'}}>
                                <BankOutlined style={{fontSize:30, color:'#1fce88', margin:`10px 5px`}} />
                            </div>
                            <Space direction="vertical">
                                <Text>Bank Balance</Text>
                                <Text>₹ {aggregateClBal(bankAccounts).toLocaleString('en-IN', {minimumFractionDigits:2})}</Text>
                            </Space>
                        </Space>
                    </Space>
                    ) : (
                    <Space size='large' wrap={true}>
                        <Space>
                            <div style={{backgroundColor:'whitesmoke', borderRadius:16, width:50, 
                                textAlign:'center'}}>
                                <OpBalIcon style={{fontSize:30, color:'blue', margin:`10px 5px`}}/>
                            </div>
                            <Space direction="vertical">
                                <Text>Opening Balance</Text>
                                <Text>₹ {data1?.accounts.find(e=>e.name===filterField)?.opBalance.toLocaleString('en-IN', {minimumFractionDigits:2})}</Text>
                            </Space>
                        </Space>
                        <Space>
                            <div style={{backgroundColor:'#e8faf0', borderRadius:16, width:50, 
                                textAlign:'center'}}>
                                <ClBalIcon style={{fontSize:30, margin:`10px 5px`, color:'#1fce88'}} />
                            </div>
                            <Space direction="vertical">
                                <Text>Closing Balance</Text>
                                <Text>₹ {(closingBalances?.[data1?.accounts.find(e=>e.name===filterField)?.['_id']] || 0).toLocaleString('en-IN', {minimumFractionDigits:2})}</Text>
                            </Space>
                        </Space>
                    </Space>
                    )}
                </div>
                <div style={{margin:30, textAlign:'left', padding:'10px 0'}}>
                    <Typography.Link onClick={() => setShowChart(!showChart)}>
                        <Space>
                            <LineChartOutlined />
                            {showChart ? 'Hide' : 'Show'} Chart
                            {showChart ? <CaretUpOutlined /> : <CaretDownOutlined />}
                        </Space>
                    </Typography.Link>
                </div>
                <div style={{margin:'0 10px'}}>
                    {showChart && <OverviewChart/>}
                </div>
            </div>
            <div style={{margin:10, textAlign:'left', padding:'30px 0'}}>
                <OverviewTable data={tableData}/>
            </div>
        </>
    )
}

export default Banking;
