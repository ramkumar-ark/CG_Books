import { Form, Input, Row, Space, Typography } from "antd";

const { Text } = Typography;

const Remarks = () => 
    <Form.Item wrapperCol={{span:20}}>
        <Space direction="vertical" style={{width:"100%", textAlign:"left"}}>
            <Text>Remarks <Text type="secondary">(For Internal Use)</Text></Text>
            <Form.Item name="remarks" wrapperCol={{span:20}}>
                <Input.TextArea style={{minHeight:"76px"}}/>
            </Form.Item>
        </Space>
    </Form.Item>

export default Remarks;
