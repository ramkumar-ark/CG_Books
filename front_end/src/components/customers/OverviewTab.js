import { Col, Row, Space, Typography, Collapse, Select } from "antd";
import { useState } from "react";
import AddressDisplayCard from "../Invoices/AddressDisplayCard";
import { ContactCard } from "../Invoices/ContactPersonsDisplayTab";
import CustomerIncomeChart from "./IncomeChart";

const {Text, Link} = Typography;
const { Panel } = Collapse;

const OverviewTab = ({entity}) => {
    const [chartPeriod, setChartPeriod] = useState([12,0])
    return (
        <Row style={{minHeight:'100vh', textAlign:'left'}}>
            <Col span={8} style={{borderRight:'1px solid #00000040'}}>
                <Space direction="vertical" style={{padding:'20px 15px', width:'100%'}}>
                    {entity.companyName && 
                        <div style={{borderBottom:'1px solid #00000040', paddingBottom:'10px'}}>
                            <Text>{entity.companyName}</Text>
                        </div>
                    }
                    <ContactCard contact={entity.primaryContact}/>
                    <Collapse bordered={false} expandIconPosition='end' ghost>
                        <Panel header="ADDRESS" key="1" className="overviewTab">
                            <Text>Billing Address</Text><br/>
                            <AddressDisplayCard datas={entity.addresses.filter(e => e.type === 'billing')}/>
                            {entity.addresses.length==0 && <Text>Billing Address not available</Text>}
                            <Text style={{marginTop:'10px'}}>Shipping Address</Text>
                            <AddressDisplayCard datas={entity.addresses.filter(e => e.type === 'shipping')}/>
                            {entity.addresses.length==0 && <Text>Shipping Address not available</Text>}
                        </Panel>
                        <Panel header={`CONTACT PERSONS (${entity.contacts?.length || 0})`} key="2" className="overviewTab">
                            {entity.contacts?.map(e => <ContactCard contact={e}/>)}                            
                        </Panel>
                        {entity.type === 'vendor' &&
                        <Panel header={'BANK ACCOUNT DETAILS'} key="3" className="overviewTab">
                            {entity.bankDetails.length == 0 &&
                                <Text type="secondary">No bank account added yet</Text>}
                            {entity.bankDetails.length > 0 && entity.bankDetails.map((e, i) =>
                                <div style={{borderBottom:'1px solid #eee', padding:'10px 20px'}} key={i + 1}>
                                    <Text>Account Ending with {e.accountNo.slice(-4)}</Text>    
                                </div>)}                                
                        </Panel>
                        }
                    </Collapse>
                </Space>
            </Col>
            <Col span={16}>
                <Space direction="vertical" size='large' style={{padding:'20px', width:'100%'}}>
                    <div>
                        <Text type='secondary'>Payment due period</Text><br/>
                        <Text>{`${entity.creditPeriod.value} ${entity.creditPeriod.unit} from ${entity.type === 'customer' ? 'Invoice' : 'Bill'}`}</Text>
                    </div>
                    <Space size={100}>
                        <Text strong>OUTSTANDING {entity.type === 'customer' ? 'RECEIVALBES' : 'PAYABLES'}</Text>
                        <Link>
                            ₹{Number(entity.receivables).toLocaleString('en-IN', {minimumFractionDigits:2, maximumFractionDigits:2})}
                        </Link>
                    </Space>
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                        <Text strong>{entity.type === 'customer' ? 'Income' : 'Expense'}</Text>
                        <Link>
                        <Select defaultValue='12,0' bordered={false} 
                            options={[
                                {value: '12,0', label:'Current Financial Year'},
                                {value: '24,12', label:'Previous Financial Year'},
                                // {value: 
                                //     `${new Date().getMonth()+9+12},${new Date().getMonth()+9}`, 
                                //     label:'Last 12 Months'},
                                // {value: `${new Date().getMonth() + 9},${new Date().getMonth() + 3}`, 
                                //     label:'Last 6 Months'},
                            ]}
                            onSelect={(value) => setChartPeriod(value.split(',').map(e => Number(e)))}
                        />
                        </Link>
                    </div>
                    <CustomerIncomeChart 
                        type={entity.type === 'customer' ? 'Income' : 'Expense'}
                        data={entity.monthlyIncome.slice(24-chartPeriod[0], 24-chartPeriod[1])}/>
                </Space>
            </Col>
        </Row>
    );
};

export default OverviewTab;
