import {Form, Input, Typography} from "antd";
import StateSelector from "./StateSelector";

const {Title, Text} = Typography;

export default function(){
    const [form] = Form.useForm();
    return (
        <Form
            form={form}
            name="register"
            layout="vertical"
            labelAlign="left"
            colon={false}
            onFinish={() => {}}
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
            <span style={{textAlign:"left", display:"block", margin:"15px 0px"}}><Text strong={true} type="secondary">ORGANIZATION'S DETAILS</Text></span>
            <Form.Item
                name="name"
                label="Organization Name"
                rules={[
                    {required: true, message: "Please provide Name of your Organization."}
                ]}
                required={true}
            >
                <Input/>
            </Form.Item>
            <div style={{display:"flex", justifyContent:"space-between"}}>
            <Form.Item
                name="country"
                label="Organization Address"
                initialValue="India"
                required={true}
            >
                <Input disabled={true} value="India" />
            </Form.Item>

            <Form.Item
                name="state"
                label="State/Union Territory"
                required={true}
            >
                <StateSelector/>
            </Form.Item>
            </div>

            <Form.Item name="street1">
                <Input placeholder="Street 1"/>
            </Form.Item>

            <Form.Item name="street2">
                <Input placeholder="Street 2"/>
            </Form.Item>
            
            <div style={{display:"flex", justifyContent:"space-between"}}>
                <Form.Item name="city">
                    <Input placeholder="City"/>
                </Form.Item>
                <Form.Item name="pinCode">
                    <Input placeholder="Zip/Postal Code"/>
                </Form.Item>
            </div>

        </Form>
    );
}