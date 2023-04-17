import {
  Button,
  Col,
  Form,
  Input,
  Radio,
  Row,
  Select,
} from 'antd';
import TabsCreateContact from './TabsCreateContact';
import { useHistory } from 'react-router-dom';
import constructInitialValues from './constructInitialValues';

const CreateContactForm = ({onSubmit, entityData, entityType}) => {
    const entityTypeDisplay = `${entityType[0].toUpperCase()}${entityType.slice(1)}`
    const history = useHistory();
    const [form] = Form.useForm();
    const initialValues = entityData ? constructInitialValues(entityData) : {creditPeriod: {unit: "days"}};
    const onSave = (values) => {
        const data = {...values, type:entityType};
        onSubmit(data);
    };
    const handleSubmit = () => {form.submit();};
    return (
        <>
        <Form
            form={form}
            name={`create${entityTypeDisplay}Contact`}
            onFinish={onSave}
            initialValues={initialValues}
            labelAlign='left'
            labelCol={{
                span: 24, lg:4
            }}
            colon={false}
            wrapperCol={{
                span: 20, lg:{span:7, offset:1}
            }}
            labelWrap={true}
            layout="horizontal"
            scrollToFirstError
            style={{
            display:"block",
            marginLeft:"20px"
            }}
        >
            {entityType==='customer' &&
            <Form.Item label="Customer Type" name="customerType">
                <Radio.Group>
                    <Radio value="business"> Business </Radio>
                    <Radio value="individual"> Individual </Radio>
                </Radio.Group>
            </Form.Item>}
            <Form.Item label="Primary Contact" wrapperCol={{lg:{span:12, offset:1}, span:20}}>
                <Input.Group style={{textAlign:"left"}}>
                    <Row gutter={10}>
                        <Col span={24} md={5}>
                            <Form.Item name={['primaryContact', 'salutation']} >
                                <Select 
                                    placeholder="Salutation"
                                    options={[
                                        {label:"Mr.", value:"Mr."},
                                        {label:"Mrs.", value:"Mrs."},
                                        {label:"Ms.", value:"Ms."},
                                        {label:"Miss.", value:"Miss."},
                                        {label:"Dr.", value:"Dr."},
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24} md={7}>
                            <Form.Item name={['primaryContact', 'firstName']}>
                                <Input placeholder='First Name'/>        
                            </Form.Item>
                        </Col>
                        <Col span={24} md={7}>
                            <Form.Item name={['primaryContact', 'lastName']}>
                                <Input placeholder='Last Name'/>        
                            </Form.Item>
                        </Col>
                    </Row>
                </Input.Group>
            </Form.Item>
            <Form.Item label="Company Name" name="companyName">
                <Input />
            </Form.Item>
            <Form.Item label={`${entityTypeDisplay} Display Name`} name="name" required={true}
                rules={[{required: true, message: "Enter the Display Name of your contact."}]}
            >
                <Input/>
            </Form.Item>
            <Form.Item label={`${entityTypeDisplay} Email`} name={["primaryContact", "email"]}>
                <Input/>
            </Form.Item>
            <Form.Item label={`${entityTypeDisplay} Phone`}>
                <Input.Group style={{textAlign:"left"}}>
                    <Row style={{justifyContent:"space-between"}}>
                        <Col md={10} span={24}>
                            <Form.Item name={["primaryContact", "workPhone"]}>
                                <Input placeholder='Work Phone'/>
                            </Form.Item>
                        </Col>
                        <Col md={10} span={24}>
                            <Form.Item name={["primaryContact", "mobile"]}>
                                <Input placeholder='Mobile'/>
                            </Form.Item>
                        </Col>
                    </Row>
                </Input.Group>
            </Form.Item>
            <Form.Item label="Website" name="website" >
                <Input/>
            </Form.Item>
            <TabsCreateContact formObj={form} contactsData={entityData?.contacts || [{}]} 
                bankDetails={initialValues.bankDetails} entityType={entityType}/>
            
        </Form>
        
        <div style={{position:'sticky', bottom:0, backgroundColor:"whitesmoke", borderTop:"2px outset", display:"flex", alignContent:"center", justifyContent:"flex-start",padding:"12px"}}>
                <Button onClick={handleSubmit} type='primary'>{entityData ? 'Update' : 'Save'}</Button>
                <Button type='secondary' onClick={() => {history.goBack()}} style={{borderColor: "#ddd", marginLeft:"10px"}}>Cancel</Button>
        </div>
        </>
    );
};
export default CreateContactForm;