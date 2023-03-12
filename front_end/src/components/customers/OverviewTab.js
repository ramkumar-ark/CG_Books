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
                    <div style={{borderBottom:'1px solid #00000040', paddingBottom:'10px'}}>
                        <Text>{entity.companyName}</Text>
                    </div>
                    <ContactCard contact={entity.primaryContact}/>
                    <Collapse bordered={false} expandIconPosition='right' ghost>
                        <Panel header="ADDRESS" key="1" className="overviewTab">
                            <Text>Billing Address</Text>
                            <AddressDisplayCard datas={entity.addresses.filter(e => e.type === 'billing')}/>
                            <Text style={{marginTop:'10px'}}>Shipping Address</Text>
                            <AddressDisplayCard datas={entity.addresses.filter(e => e.type === 'shipping')}/>
                        </Panel>
                        <Panel header={`CONTACT PERSONS (${entity.contacts?.length || 0})`} key="2" className="overviewTab">
                            {entity.contacts?.map(e => <ContactCard contact={e}/>)}                            
                        </Panel>
                    </Collapse>
                </Space>
            </Col>
            <Col span={16}>
                <Space direction="vertical" size='large' style={{padding:'20px', width:'100%'}}>
                    <div>
                        <Text type='secondary'>Payment due period</Text><br/>
                        <Text>{`${entity.creditPeriod.value} ${entity.creditPeriod.unit} from Invoice`}</Text>
                    </div>
                    <Space size={100}>
                        <Text strong>OUTSTANDING RECEIVALBES</Text>
                        <Link>
                            ₹{Number(entity.receivables).toLocaleString('en-IN', {minimumFractionDigits:2})}
                        </Link>
                    </Space>
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                        <Text strong>Income</Text>
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
                        data={entity.monthlyIncome.slice(24-chartPeriod[0], 24-chartPeriod[1])}/>
                </Space>
            </Col>
        </Row>
    );
};

export default OverviewTab;
