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

const CreateContactForm = ({onSubmit}) => {
    const history = useHistory();
    const [form] = Form.useForm(); 
    const onSave = (values) => {
        console.log(values);
        const data = {...values, type:"customer"};
        onSubmit(data);
    };
    const handleSubmit = () => {form.submit();};
    return (
        <>
        <Form
            form={form}
            name='createCustomerContact'
            onFinish={onSave}
            initialValues={{
                creditPeriod: {unit: "days"}
            }}
            labelAlign='left'
            labelCol={{
                span: 4,
            }}
            colon={false}
            wrapperCol={{
                span: 7,
            }}
            labelWrap={true}
            layout="horizontal"
            scrollToFirstError
            style={{
            // maxWidth: 600,
            display:"block",
            marginLeft:"20px"
            }}
        >
            <Form.Item label="Customer Type" name="customerType">
            <Radio.Group>
                <Radio value="business"> Business </Radio>
                <Radio value="individual"> Individual </Radio>
            </Radio.Group>
            </Form.Item>
            <Form.Item label="Primary Contact" wrapperCol={{span:12}}>
                <Input.Group style={{textAlign:"left"}}>
                    <Row gutter={10}>
                        <Col span={5}>
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
                        <Col span={7}>
                            <Form.Item name={['primaryContact', 'firstName']}>
                                <Input placeholder='First Name'/>        
                            </Form.Item>
                        </Col>
                        <Col span={7}>
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
            <Form.Item label="Customer Display Name" name="name" required={true}
                rules={[{required: true, message: "Enter the Display Name of your contact."}]}
            >
                <Input/>
            </Form.Item>
            <Form.Item label="Customer Email" name={["primaryContact", "email"]}>
                <Input/>
            </Form.Item>
            <Form.Item label="Customer Phone">
                <Input.Group style={{textAlign:"left"}}>
                    <Row style={{justifyContent:"space-between"}}>
                        <Col span={10}>
                            <Form.Item name={["primaryContact", "workPhone"]}>
                                <Input placeholder='Work Phone'/>
                            </Form.Item>
                        </Col>
                        <Col span={10}>
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
            <TabsCreateContact formObj={form}/>
            
        </Form>
        
        <div style={{position:'sticky', bottom:0, backgroundColor:"whitesmoke", borderTop:"2px outset", display:"flex", alignContent:"center", justifyContent:"flex-start",padding:"12px"}}>
                <Button onClick={handleSubmit} type='primary'>Save</Button>
                <Button type='secondary' onClick={() => {history.goBack()}} style={{borderColor: "#ddd", marginLeft:"10px"}}>Cancel</Button>
        </div>
        </>
    );
};
export default CreateContactForm;