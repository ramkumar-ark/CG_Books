import { Spin, Divider, Typography, Form, Select, Input, Space, Button, Row, Col, DatePicker, InputNumber } from "antd";
import { FileTextOutlined, PlusCircleFilled, IdcardOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Link, useParams, useRouteMatch } from "react-router-dom";
import { useFetchMastersQuery, useGetCustomersQuery } from "../../service/mastersApi";
import useAuthentication from "../../useAuthentication";
import { useState, useContext } from "react";
import { useGetSelectedOrgQuery } from "../../service/appApi";
import CustomerDetails from "./CustomerDetails";
import AddressDisplayCard from "./AddressDisplayCard";
import ItemsListTable from "./ItemsListTable";
import { useHistory } from "react-router-dom";
import {generatePdf} from "./PdfGenerator";
import transformData from "./transformFormData";
import { useCreateVoucherMutation, useGetLedgerBalanceQuery, useGetVoucherDataQuery, useUpdateVoucherEntryMutation } from "../../service/transactionsApi";
import constructInitialValues from "./constructInitialValues";
import { useEffect } from "react";

const { Title, Text } = Typography;

const CreateInvoice = () => {
    const history = useHistory();
    const {url, path} = useRouteMatch();
    let mode = url.split('/')[4];
    mode = `${mode[0].toUpperCase()}${mode.slice(1)}`;
    const transactionId = useParams()?.transactionId;
    const {AuthCtx} = useAuthentication();
    const {user} = useContext(AuthCtx);
    const [createVoucher, { isLoading, isSuccess, isError, error }] = useCreateVoucherMutation();
    const [updateVoucher, 
        { isLoading:isLoading2, isSuccess:isSuccess2, isError:isError2, error:error2 }] = useUpdateVoucherEntryMutation();
    let selectedOrg;
    const {data} = useGetSelectedOrgQuery(user.id);
    if (data) selectedOrg = data.selectedOrg;
    const orgId = selectedOrg && selectedOrg['_id'];
    const {data:vchData, isLoading: isLoading1, isError: isGetDataError, isSuccess:isSucess1}
        = useGetVoucherDataQuery({orgId, voucher:'Sales', transactionId}, {skip: (mode === "New" || !orgId)});
    const initialValues = vchData ? constructInitialValues(vchData.voucher) : {
        discount:{value:0, unit:'absolute'},
        customerNotes: "Thanks for your business."
    };
    const itemTableDetails = vchData?.voucher.otherDetails.itemDetails.map(
        ({details, quantity, rate, amount}) => ({itemDetails:details, itemQuantity:quantity, itemRate:rate,
            amount})) || [{}];
    const [form] = Form.useForm();
    let customerList = [];
    const customersObj = {};
    // get customer data
    const { data: data1 } = useGetCustomersQuery(orgId, {skip: !orgId});
    if (data1){
        customerList = data1.customers.map(e => {
            customersObj[e['_id']] = {...e};
            return {label:e.name, value:e['_id']}
        });
    }
    const [selectedCustomer, setSelectedCustomer] = useState(
        initialValues.customer ? customersObj[initialValues.customer] : null);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [tableFigures, setTableFigures] = useState({subTotal:"0.00", discount:"0.00", round:"0.00", total:"0.00"});

    const {data: masters} = useFetchMastersQuery(orgId);
    const {data: cbData} = useGetLedgerBalanceQuery(orgId);
    const ledgerMasters = masters?.ledgers || [];
    const otherChargesLedgerId = ledgerMasters.find(e => e.name === "Other Charges")?.['_id'];
    const discountLedgerId = ledgerMasters.find(e => e.name === "Discount")?.['_id'];
    const salesLedgerId = ledgerMasters.find(e => e.name === "Sales")?.['_id'];
    const concernedLedgers = {otherChargesLedgerId, discountLedgerId, salesLedgerId};

    const updateTableFigures = (stateField, value) => {
        let {subTotal, discount, round, total} = tableFigures;
        switch (stateField) {
            case "subTotal":
                subTotal = Number(value).toFixed(2);    
                break;
            case "discount":
                discount = (Number(value) * -1).toFixed(2);
                form.setFieldValue('discountAmount', discount);
                break;
            default:
                break;
        }
        total = Math.round(Number(subTotal) + Number(discount)).toFixed(2);
        form.setFieldValue('totalAmount', Number(total));
        round = (Number(total) - (Number(subTotal) + Number(discount))).toFixed(2);
        form.setFieldValue('roundingOff', Number(round));
        setTableFigures({subTotal, discount, round, total});
    };

    const onDiscountChange = () => {
        const {value, unit} = form.getFieldValue('discount');
        if (unit === "absolute") updateTableFigures('discount', Number(value).toFixed(2));
        else {
            let discount = (tableFigures.subTotal * Number(value).toFixed(2)) / 100;
            updateTableFigures('discount', discount.toFixed(2));
        }
    };

    const onCustomerSelect = (customerId) => {
        const customer = customersObj[customerId];
        const invoiceDate = form.getFieldValue('invoiceDate');
        const dueDate = invoiceDate && invoiceDate.add(
            customer.creditPeriod?.value || 0, customer.creditPeriod.unit);
        form.setFieldsValue({'creditPeriod':{value: customer.creditPeriod?.value || 0, unit: customer.creditPeriod.unit, dueDate}});
        form.setFieldValue('partyName', customer.name);
        form.setFieldsValue({'billingAddress':customer.addresses.filter(e => e.type === "billing")[0]});
        form.setFieldsValue({'shippingAddress':customer.addresses.filter(e => e.type === "shipping")[0]});
        setSelectedCustomer(customer);
    };

    const onCreditPeriodChange = () => {
        const {value, unit} = form.getFieldValue('creditPeriod') || {value:0 , unit:'days'};
        const invoiceDate = form.getFieldValue('invoiceDate');
        const dueDate = invoiceDate && invoiceDate.add(value, unit);
        form.setFieldsValue({'creditPeriod':{...form.getFieldValue('creditPeriod'), dueDate}});
    };

    const onSave = (values) => {
        const dataObj = {
            ...values, subTotal: tableFigures.subTotal ,customerObj:customersObj[values.customer], 
            concernedLedgers, userId:user.id,
        };
        const requestObject = transformData(dataObj);
        const invoiceData = {org: selectedOrg, ...requestObject, discount: tableFigures.discount, 
            subTotal:tableFigures.subTotal, rounding:tableFigures.round};
        (mode==='New' && !isSuccess) && createVoucher({...requestObject, orgId});
        (mode==='Edit' && !isSuccess2) && updateVoucher(
            {params:{orgId, transactionId, otherDetailsId: vchData.voucher.otherDetails['_id']}, 
            body:requestObject});
        isSuccess && generatePdf(invoiceData);
    };

    const handleSubmit = () => {form.submit();}

    const selectAfter = (
        <Form.Item name={["creditPeriod", "unit"]} style={{marginBottom:0}}>
            <Select
            style={{
                width: 90,
            }}
            options={[
                {label:"Days", value:"days"},
                {label:"Months", value:"months"},
                {label:"Years", value:"years"},
            ]}
            onSelect={onCreditPeriodChange}
            />
        </Form.Item>
    );

    const selectDiscountUnit = (
        <Form.Item name={["discount", "unit"]} style={{marginBottom:0}}>
            <Select style={{ width: 50, }}
            options={[
                {label:"₹", value:"absolute"},
                {label:"%", value:"percentage"},
            ]}
            onSelect={onDiscountChange}
            />
        </Form.Item>
    );

    useEffect(() => {
        if(isSucess1 && mode == 'Edit'){ 
            const {subTotal, discount, rounding:round, otherDetails:{totalAmount:total}} = vchData.voucher;
            setSelectedCustomer(customersObj[initialValues.customer]);
            setTableFigures({subTotal, discount, round, total});
        }
    }, [isLoading1]);
    
    if ((mode === 'New') || (!isLoading1))
    return (
        <Spin size="large" spinning={isLoading || isLoading1}>
            <div style={{textAlign:"left", marginLeft:"20px"}}>
                <Title level={3}><FileTextOutlined /> {mode} Invoice</Title>
            </div>
            <Divider/>
            <Form
                form={form}
                name="createInvoiceForm"
                onFinish={onSave}
                labelAlign="left"
                labelCol={{span: 4}}
                wrapperCol={{span: 7}}
                colon={false}
                labelWrap={true}
                layout="horizontal"
                scrollToFirstError
                initialValues={initialValues}
                style={{
                    display: "block",
                    marginLeft: "20px",
                    marginRight: "30px",
                    marginBottom: "50px",
                    textAlign: "left",
                }}
            >
                <Form.Item label="Customer Name" required={true} wrapperCol={{span:9}} >
                    <Space style={{display:"block"}}>
                        <Input.Group>
                        <Form.Item 
                            name="customer"
                            wrapperCol={{span:24}}
                            rules={[{required: true, message: "Please Select a Customer"}]}
                            style={{marginBottom: "0px"}}
                        >                   
                            <Select 
                                showSearch 
                                dropdownRender={(menu) => (
                                    <>
                                    {menu}
                                    <Divider style={{margin: '8px 0',}}/>
                                    <Link to="/app/home/customers/new" style={{display:"block"}}>
                                        <Space><PlusCircleFilled/><Text>New Customer</Text></Space>
                                    </Link>
                                    </>
                                )}
                                options={customerList}
                                placeholder="Select Customer" 
                                optionFilterProp="children" 
                                filterOption={(input, option) => 
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                style={{width:"100%"}}
                                onSelect={onCustomerSelect}
                            />
                        </Form.Item>
                        <Form.Item hidden={true} name="partyName"/>
                        <Form.Item hidden={true} name="billingAddress"/>
                        <Form.Item hidden={true} name="shippingAddress"/>
                        {selectedCustomer && 
                            <Typography.Link onClick={() => setOpenDrawer(true)} >
                                <IdcardOutlined/> View Customer Details 
                            </Typography.Link>
                        }
                        <CustomerDetails 
                            data={{...selectedCustomer, orgId}} 
                            data1={cbData}
                            isOpen={openDrawer} 
                            onClose={() => setOpenDrawer(false)} 
                        />
                        </Input.Group>
                    </Space>
                </Form.Item>
                {selectedCustomer &&
                <Form.Item label wrapperCol={{span:9}}>
                    <Input.Group>
                    <Row>
                        <Col span={12}>
                            <Text type="secondary" strong>BILLING ADDRESS</Text>
                            <AddressDisplayCard datas={selectedCustomer.addresses.filter(
                                (e) => e.type === "billing"
                            ).slice(0,1)}/>
                        </Col>
                        <Col span={12}>
                            <Text type="secondary" strong>SHIPPING ADDRESS</Text>
                            <AddressDisplayCard datas={selectedCustomer.addresses.filter(
                                (e) => e.type === "shipping"
                            ).slice(0,1)}/>
                        </Col>
                    </Row>
                    </Input.Group>
                </Form.Item>
                }
                <div>
                    <Form.Item label="Invoice#" required={true} name="invoiceNumber">
                        <Input/>
                    </Form.Item>
                    <Form.Item label="Order Number" name="orderNumber">
                        <Input/>
                    </Form.Item>
                    <Form.Item label="Invoice Date" name="invoiceDate">
                        <DatePicker style={{width:"100%"}} format="DD-MM-YYYY" onChange={onCreditPeriodChange}/>
                    </Form.Item>
                    <Form.Item label="Credit Terms" wrapperCol={{span:20}}>
                        <Input.Group compact>
                            <Space style={{display: "flex"}} size={50}>
                                <Form.Item name={['creditPeriod', 'value']}>
                                    <InputNumber min={0} addonAfter={selectAfter} style={{width:"200px"}}
                                        onChange={onCreditPeriodChange}/>
                                </Form.Item>
                                <Form.Item label="Due Date" name={['creditPeriod', 'dueDate']}>
                                    <DatePicker format="DD-MM-YYYY" disabled={true} placeholder="Due date"/>
                                </Form.Item>
                            </Space>
                        </Input.Group>
                    </Form.Item>
                </div>
                <div style={{borderTop:"ridge", borderBottom:"ridge", paddingTop: "20px", marginBottom:"30px"}}>
                    <Form.Item 
                        label={<Text>Subject <InfoCircleOutlined/></Text>} 
                        name="subject"
                        wrapperCol={{span:9}}
                    >
                        <Input placeholder="Let your customer know what this Invoice is for"/>
                    </Form.Item> 
                </div>
                <ItemsListTable formObj={form} updateTotal={updateTableFigures} itemList={itemTableDetails}/>
                <div style={{marginBottom: "20px"}}>
                    <Row gutter={50}>
                        <Col span={12}>
                            <div style={{marginRight:20, display:"flex", flexDirection:"column", justifyContent:"flex-end", height:"100%"}}>
                                <Row>
                                    <Text>Customer Notes</Text>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <Form.Item name="customerNotes" wrapperCol={{span:24}} style={{marginBottom:0}}>
                                            <Input.TextArea/>
                                        </Form.Item>
                                        <Text type="secondary" style={{fontSize:12}}>Will be displayed on the invoice.</Text>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="invoiceTotalSection">
                                <Row>
                                    <Col span={18}>
                                        <Text>Sub Total</Text>
                                    </Col>
                                    <Col className="displayAmount" span={6}>
                                        <Text>{tableFigures.subTotal}</Text>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={18}>
                                        <Form.Item name={["discount", "value"]} label="Discount" labelCol={{span:8}} wrapperCol={{span:16}} style={{marginBottom:0}}>
                                            <InputNumber addonAfter={selectDiscountUnit} min={0}
                                                style={{width:"130px"}} onChange={onDiscountChange}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={6} className="displayAmount">
                                        <Text>{tableFigures.discount}</Text>
                                        <Form.Item name="discountAmount" hidden='true'/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={18} >
                                        <Text>Round Off</Text>
                                    </Col>
                                    <Col span={6} className="displayAmount">
                                        <Text>{tableFigures.round}</Text>
                                        <Form.Item hidden={true} name="roundingOff"/>
                                    </Col>
                                </Row>
                                <Row >
                                    <Col span={18}>
                                        <Text strong style={{fontSize:"large"}}>Total ( ₹ )</Text>
                                    </Col>
                                    <Col span={6} className="displayAmount">
                                        <Text strong style={{fontSize:"large", wordWrap:false}}>{tableFigures.total}</Text>
                                        <Form.Item hidden={true} name="totalAmount"/>
                                    </Col>
                                </Row>        
                            </div>
                        </Col>
                    </Row>
                </div>

                <div style={{borderTop:"ridge", paddingTop:"10px"}}>
                    <Row>
                        <Col span={16}>
                            <Space direction="vertical" style={{display:"flex"}}>
                                <Text>Terms & Conditions</Text>
                                <Form.Item name="termsAndConditions" wrapperCol={{span:24}}>
                                    <Input.TextArea placeholder="Enter the terms and conditions of your business to be displayed in your transaction"/>
                                </Form.Item>
                            </Space>
                        </Col>
                    </Row>
                </div>
            </Form>
            <div style={{position:'sticky', bottom:0, backgroundColor:"whitesmoke", borderTop:"2px outset", display:"flex", alignContent:"center", justifyContent:"flex-start",padding:"12px"}}>
                
                <Button onClick={handleSubmit} type='primary'>
                    {mode==='New' ? 'Save and Print' : 'Update'}
                </Button>
                <Button type='secondary' onClick={() => {history.goBack()}} style={{borderColor: "#ddd", margin:"0 10px"}}>Cancel</Button>
                {(isError || isError2) && <Text type="danger">{error?.data?.error || error2?.data?.error}</Text>}
                {(isError || isError2) && console.log(error)}
                {isSuccess && handleSubmit()}
                {(isSuccess || isSuccess2) && history.goBack()}
            </div>
        </Spin>
    );
};

export default CreateInvoice;
