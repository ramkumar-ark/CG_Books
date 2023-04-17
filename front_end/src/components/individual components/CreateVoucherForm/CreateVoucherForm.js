import { Form, Input, Space, DatePicker, Typography, Row, Col, InputNumber, Select, Button } from "antd";
import { InfoCircleOutlined } from '@ant-design/icons'
import SelectEntity from "./SelectEntity";
import useManageEntity from "./useManageEntity";
import useFormDataManager from "./useFormDataManager";
import useTableDataManager from "./useTableDataManager";
import EntityDetailsView from "./EntityDetailsView";
import DisplayAddress from "./DisplayAddress";
import CreditTermsFormItem from "./CreditTermsFormItem";
import ItemsListTable from "./ItemsListTable";
import useGetAccountSelectList from "./useGetAccountSelectList";
import { useHistory } from "react-router-dom";
import useGetRequiredLedgerIds from "./useGetRequiredLedgerIds";
import transformDataOnSubmit from "./transformDataOnSubmit";

const {Text, Title} = Typography;

const CreateVoucherForm = ({initialValues, onSave, voucherType, voucherData, entityDataObj}) => {
    const entityType = voucherType === 'invoice' ? 'customer' : 'vendor';
    const entityTypeDisplay = `${entityType[0].toUpperCase()}${entityType.slice(1)}`;
    const voucherTypeDisplay = `${voucherType[0].toUpperCase()}${voucherType.slice(1)}`;
    const history = useHistory();
    const [form] = Form.useForm();
    const {changeCreditPeriod, changeDueDate, changeItemDetailsList, getItemDetailsList} 
        = useFormDataManager(form);
    const [selectedEntity, onEntitySelect] = useManageEntity(entityDataObj, changeCreditPeriod, initialValues[entityType]);
    const [tableTotals, updateTableTotals] = useTableDataManager(initialValues);
    const ledgersSelectList = useGetAccountSelectList(entityType == 'customer' ? 'Income' : 'Expense');
    const requiredLedgerIds = useGetRequiredLedgerIds();
    const itemTableDetails = voucherData?.otherDetails?.itemDetails || [{}];
    const onDiscountChange = () => {
        const {value, unit} = form.getFieldValue('discount');
        if (unit === "absolute") updateTableTotals('discount', Number(value).toFixed(2));
        else {
            let discount = (tableTotals.subTotal * Number(value).toFixed(2)) / 100;
            updateTableTotals('discount', discount.toFixed(2));
        }
    };
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
    const onSubmit = (formData) => {
        const finalData = transformDataOnSubmit(formData, tableTotals, selectedEntity, requiredLedgerIds);
        onSave(finalData);
    };
    return (
    <>
    <Form
        form={form}
        name={`create${voucherTypeDisplay}Form`}
        onFinish={onSubmit}
        labelAlign="left"
        labelCol={{span: 24, lg:4}}
        wrapperCol={{span:20, lg: 7}}
        colon={false}
        labelWrap={false}
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
        <Form.Item label={`${entityTypeDisplay} Name`} required={true} wrapperCol={{lg:9, span:20}} >
            <Space style={{display:"block"}}>
                <Input.Group>
                    <SelectEntity entityType={entityType} onEntitySelect={onEntitySelect}/>
                    {selectedEntity && 
                        <EntityDetailsView entityData={selectedEntity} 
                            entityTypeDisplay={entityTypeDisplay} />}
                    {(selectedEntity && entityType=='customer') && 
                        <DisplayAddress entityData={selectedEntity}/>}
                </Input.Group>
            </Space>
        </Form.Item>
        <div>
            <Form.Item label={`${voucherTypeDisplay}#`} required={true} name="voucherNumber">
                <Input/>
            </Form.Item>
            <Form.Item label="Order Number" name="orderNumber">
                <Input/>
            </Form.Item>
            <Form.Item label={`${voucherTypeDisplay} Date`} name={`voucherDate`} required={true}>
                <DatePicker style={{width:"100%"}} format="DD-MM-YYYY" onChange={changeDueDate}/>
            </Form.Item>
            <CreditTermsFormItem onCreditPeriodChange={changeDueDate}/>
        </div>
        { voucherType === 'invoice' &&
        <div style={{borderTop:"ridge", borderBottom:"ridge", paddingTop: "20px", marginBottom:"30px"}}>
            <Form.Item 
                label={<Text>Subject <InfoCircleOutlined/></Text>} 
                name="subject"
                wrapperCol={{span:9}}
            >
                <Input placeholder="Let your customer know what this Invoice is for"/>
            </Form.Item> 
        </div>}
        <ItemsListTable updateTotal={updateTableTotals} itemList={itemTableDetails}
            accountSelectList={ledgersSelectList} changeItems={changeItemDetailsList} 
            getItems={getItemDetailsList}/>
        <div style={{marginBottom: "20px"}}>
            <Row gutter={50}>
                <Col lg={12} span={24}>
                    <div style={{marginRight:20, display:"flex", flexDirection:"column", justifyContent:"flex-end", height:"100%"}}>
                        <Row>
                            <Text>{entityType==='customer' && 'Customer'} Notes</Text>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item name="notes" wrapperCol={{span:24}} style={{marginBottom:0}}>
                                    <Input.TextArea/>
                                </Form.Item>
                                <Text type="secondary" style={{fontSize:12}}>
                                    {entityType==='customer' ? 'Will be displayed on the invoice.' : 'It will not be shown in PDF'}
                                </Text>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col lg={12} span={24}>
                    <div className="invoiceTotalSection">
                        <Row>
                            <Col span={18}>
                                <Text>Sub Total</Text>
                            </Col>
                            <Col className="displayAmount" span={6}>
                                <Text>{tableTotals.subTotal}</Text>
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
                                <Text>{tableTotals.discount}</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={18} >
                                <Text>Round Off</Text>
                            </Col>
                            <Col span={6} className="displayAmount">
                                <Text>{tableTotals.round}</Text>
                            </Col>
                        </Row>
                        <Row >
                            <Col span={18}>
                                <Text strong style={{fontSize:"large"}}>Total ( ₹ )</Text>
                            </Col>
                            <Col span={6} className="displayAmount">
                                <Text strong style={{fontSize:"large", wordWrap:false}}>{tableTotals.total}</Text>
                            </Col>
                        </Row>        
                    </div>
                </Col>
            </Row>
        </div>
        {entityType === 'customer' &&
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
        </div>}
        <div style={{position:'sticky', bottom:0, backgroundColor:"whitesmoke", borderTop:"2px outset", display:"flex", alignContent:"center", justifyContent:"flex-start",padding:"12px", margin:'0px -20px'}}>            
            <Button onClick={() => {form.submit()}} type='primary'>
                {voucherData.voucherNumber ? 'Update' : 'Save'}
            </Button>
            <Button type='secondary' onClick={() => {history.goBack()}} style={{borderColor: "#ddd", margin:"0 10px"}}>Cancel</Button>
        </div>
    </Form>
    
    </>
    );
};

export default CreateVoucherForm;
