import { Space, Typography, Form, InputNumber, Table, Col, Row, Popover, notification, Input } from "antd";
import { ProfileOutlined, DownOutlined } from '@ant-design/icons'
import { useEffect, useState } from "react";
import useStateEffect from "../../../hooks/useStateEffect";
import DateFilterRange from "./DateFilterRange";

const { Title, Text } = Typography;

const UnpaidInvoices = ({InvoiceData, form, onUsedAmtChange, isFullAmtRcd, voucherType}) =>{
    const offsetVoucherType = voucherType === 'Receipt' ? 'Invoice' : 'Bill';
    const [offsetAmounts, setOffsetAmounts] = useState(InvoiceData.map(e => ({transaction:e.transaction, 
        amount:e.receiptAmount})));
    const [tableData, setTableData] = useStateEffect(InvoiceData, () => {form.setFieldsValue({'amountOffset':[]})});
    const [openPeiodFilter, setOpenPeriodFilter] = useState();
    const [api, contextHolder] = notification.useNotification();
    const showErrorOnInvalidAmount = () => {
        api['error']({
            message: 'Invalid Amount',
            description:`The Payment amount used against amount due cannot exceed amount due on the ${offsetVoucherType}.`,
            placement:'bottomRight',
        });
    };

    const OnPayInFullClick = (amountDue, index) => {
        const data = form.getFieldValue('amountOffset') || [];
        data[index] = {...data[index], amount:amountDue, transaction:tableData[index].transaction};
        form.setFieldsValue({'amountOffset': data});
        setOffsetAmounts(data);
    };
   
    const receivedFullAmount = () => {
        const data = [...tableData];
        const offsetData = data.map(e => ({amount: e.balanceDue, transaction: e.transaction}));
        form.setFieldsValue({'amountOffset': offsetData});
        setOffsetAmounts(offsetData);
    };

    function clearAppliedAmount(){
        const offsetList = form.getFieldValue('amountOffset') || [];
        offsetList.forEach(e => {e.amount = null});
        form.setFieldsValue({'amountOffset': offsetList});
        setOffsetAmounts(offsetList);
    };

    const onAmountChange = (value, index) => {
        const dueAmount = tableData[index].balanceDue;
        dueAmount < value && showErrorOnInvalidAmount();
        OnPayInFullClick(dueAmount < value ? dueAmount : value, index);
    };

    const onFilterPeriod = (period) => {
        const [startDate, endDate] = period;
        const offsetFilterData = [...tableData].filter((e,i) => offsetAmounts[i]?.amount > 0);
        const periodFilterData = [...InvoiceData].filter(e => {
            const invoiceDate = new Date(e.date);
            return (invoiceDate >= new Date(startDate) && invoiceDate <= new Date(endDate));
        });
        setTableData([...offsetFilterData, ...periodFilterData]);
        const offsetData = [...offsetAmounts].filter(e => e.amount>0); 
        form.setFieldsValue({'amountOffset': offsetData});
        setOffsetAmounts(offsetData);
    };

    useEffect(() => {
        onUsedAmtChange([...offsetAmounts].reduce((pe,e)=>pe+e.amount,0));
    }, [offsetAmounts]);
    useEffect(() => {isFullAmtRcd && receivedFullAmount()}, [isFullAmtRcd]);

    const columns = [
        {
            title:'Date',
            dataIndex: 'date',
            render: (text, record) => (
                <Space direction="vertical">
                {new Date(text).toLocaleDateString('en-IN', {year:'numeric', month:'2-digit', day:'2-digit'})}
                <Space>
                    <Text type="secondary" style={{fontSize:11}}>Due Date</Text>
                    <Text style={{fontSize:11}}>{new Date(record.dueDate).toLocaleDateString('en-IN', {year:'numeric', month:'2-digit', day:'2-digit'})}</Text></Space>
                </Space>
            )
        },
        {
            title: `${offsetVoucherType} Number`,
            dataIndex: voucherType === 'Payment' ? 'referenceNumber' : 'voucherNumber',
        },
        {
            title: `${offsetVoucherType} Amount`,
            dataIndex: 'invoiceAmount',
            align: 'right',
            render: (text) => Number(text).toLocaleString('en-IN', {minimumFractionDigits:2, maximumFractionDigits:2}),
        },
        {
            title:'Amount Due',
            dataIndex: 'balanceDue',
            align: 'right',
            render: (text) => Number(text).toLocaleString('en-IN', {minimumFractionDigits:2, maximumFractionDigits:2}),
        },
        {
            title:'Payment',
            dataIndex: 'receiptAmount',
            width:'17%',
            align: 'right',
            render: (text, record, index) => (
                <>
                <Form.Item name={['amountOffset', index, 'amount']} wrapperCol={{span:24}} initialValue={text} style={{marginBottom:0}}>
                    <InputNumber min={0} style={{width:'100%', margin:'10px 0 0'}} onChange={(value)=>onAmountChange(value,index)}
                        formatter={(value, info)=> {
                            if (!info.userTyping)
                                return Number(value).toLocaleString('en-IN', {minimumFractionDigits:2, maximumFractionDigits:2})}
                        }
                />
                </Form.Item>
                <Form.Item name={['amountOffset', index, 'transaction']} hidden={true}/>
                <Typography.Link 
                    onClick={()=>{OnPayInFullClick(record.balanceDue, index);}} 
                    style={{fontSize:12}}>
                        Pay in Full
                </Typography.Link>
                </>
            ),
        }
    ];

    return (
        <div>
            {contextHolder}
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', backgroundColor:'#00000008', padding:'0 15px'}}>
                <Space size='middle'>
                    <Title level={4} style={{marginTop:10}}>Unpaid {offsetVoucherType}s</Title>
                    <div style={{paddingTop:6}}>
                        <Popover trigger="click" title="Date Range" 
                            content={
                                <DateFilterRange onClose={()=>{setOpenPeriodFilter(false)}} 
                                    applyFilter={onFilterPeriod} onClear={()=>{setTableData(InvoiceData)}}/>
                            } 
                            placement='bottom' open={openPeiodFilter} 
                            onOpenChange={(newOpen)=>{setOpenPeriodFilter(newOpen)}}
                        >
                            <Typography.Link>
                                <ProfileOutlined /> Filter by Date Range <DownOutlined style={{fontSize:10}}/>
                            </Typography.Link>                                
                        </Popover>
                    </div>
                </Space>
                <Typography.Link style={{fontSize:12}} onClick={clearAppliedAmount}>Clear Applied Amount</Typography.Link>
            </div>
            <Table dataSource={tableData} columns={columns} pagination={false}
                locale={{emptyText:<Title level={5}>There are no unpaid Invoices for this customer, that can be applied for this payment.</Title>}}/>
            <Row justify='end' style={{marginTop:10}}>
                <Col span={8}>
                    <Row style={{textAlign:'right'}}>
                        <Col span={11}>Total</Col>
                        <Col offset={1} span={11}>{Number([...offsetAmounts].reduce((pe,e)=>pe+e.amount,0)).toLocaleString('en-IN', {minimumFractionDigits:2, maximumFractionDigits:2})}</Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default UnpaidInvoices;
