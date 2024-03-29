import {Col, Row, Form, Input, Switch, Typography, Button, Alert, Layout} from "antd";
import { useState, useContext, useEffect } from "react";
import {useHistory} from "react-router-dom";
import useAuthentication from "../../useAuthentication"
import StateSelector from "./StateSelector";
import createOrg from "../../service/createOrg";
import { useSetSelectedOrgMutation } from "../../service/appApi";
import useGetViewPortHeight from "../../hooks/useGetViewPortHeight";

const {Title, Text} = Typography;
const {Content} = Layout;

export default function CreateOrganization(){
    const [form] = Form.useForm();
    const [isGstEnabled, setIsGstEnabled] = useState(false);
    const [error, setIsError] = useState(false);
    const {AuthCtx} = useAuthentication();
    const {user} = useContext(AuthCtx);
    const history = useHistory();
    const [ setSelectedOrg, {isSuccess} ] = useSetSelectedOrgMutation();
    const onSubmit = (values) => {
        createOrg({...values, userId:user.id})
            .then((res) => {
                setIsError(false);
                setSelectedOrg({userId:user.id, orgId:res});
            })
            .catch((reason) => {
                alert("System Error! Contact Support.");
                setIsError(true);
            });
    };
    const viewportHeight = useGetViewPortHeight();
    useEffect(() =>{
        if(isSuccess) history.replace({pathname:"/app/home/dashboard", state:{from:"/app"}});
    }, [isSuccess, history]);
    
    return (
        <Layout className="site-layout" style={{height:viewportHeight-64}}>
        <Content style={{position:'sticky', top:'0px', overflow:'auto', height:viewportHeight-64}}>
        <Form
            form={form}
            name="createOrgForm"
            layout="vertical"
            labelAlign="left"
            labelWrap={true}
            colon={false}
            onFinish={onSubmit}
            style={{
                maxWidth: "50%",
                margin: "10px auto",
                padding: "40px 80px",
                border: "inset #BFD8FF",
                borderRadius: "5%",
                backgroundColor: "white",
            }}
            scrollToFirstError
        >
            <Title level={3}>Create your organization profile</Title>
            {error && <Alert message="System Error! Contact Support." type="error"/>}
            <span style={{textAlign:"left", display:"block", margin:"15px 0px"}}><Text strong={true} type="secondary">ORGANIZATION'S DETAILS</Text></span>
            <Form.Item
                name="name"
                label="Organization Name"
                rules={[
                    {required: true, message: "Please provide Name of your Organization."}
                ]}
                required={true}
            >
                <Input.TextArea autoSize />
            </Form.Item>
            <Row>
            <Col lg={{span:8}} sm={{span:24}}>
                <Form.Item
                    name="country"
                    label="Organization Address"
                    labelWrap={false}
                    initialValue="India"
                    required={true}
                >
                    <Input disabled={true} value="India" />
                </Form.Item>
            </Col>

            <Col lg={{span:11, offset:5}} sm={{span:24, offset:0}}>
                <Form.Item
                    name="state"
                    label="State/Union Territory"
                    required={true}
                >
                    <StateSelector onChange={(value) => {
                        form.setFieldValue({state: value});
                        }}/>
                </Form.Item>
            </Col>    
            </Row>

            <Form.Item name="street1">
                <Input placeholder="Street 1" autoSize />
            </Form.Item>

            <Form.Item name="street2">
                <Input placeholder="Street 2"/>
            </Form.Item>
        
            <Row>
                <Col md={{span:9}} >
                    <Form.Item name="city">
                        <Input placeholder="City"/>
                    </Form.Item>
                </Col>
                <Col md={{span:9, offset:6}}>
                    <Form.Item name="pinCode">
                        <Input placeholder="Zip/Postal Code"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col md={10} span={24}>
                    <Form.Item
                        name="isGst" 
                        label="Is registered under GST?" 
                        valuePropName="checked"
                    >
                        <Switch checkedChildren="Yes" unCheckedChildren="No" onChange={checked => setIsGstEnabled(checked)}/>
                    </Form.Item>
                </Col>
                <Col lg={{span:10, offset:4}}>
                    <Form.Item
                        name="gstin"
                        label="Enter your GSTIN"
                        required={true}
                        hidden={!isGstEnabled}
                    >
                        <Input style={{minWidth:150}}/>
                    </Form.Item>
                </Col>
            </Row>
            <Row justify="space-between">
                <Col md={4} span={24}>
                    <Form.Item>
                        <Button type="primary" size="large" htmlType="submit">Create</Button>
                    </Form.Item>
                </Col>
                <Col md={6} span={24}>
                    <Form.Item>
                        <Button size="large" style={{backgroundColor: "#f5f5f5"}} onClick={() => {history.goBack()}}>Back</Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
        </Content>
        </Layout>
    );
}