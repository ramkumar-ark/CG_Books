import { Typography, Form, Button, Input, Row, Col, InputNumber, Space } from "antd";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { useGetSelectedOrgQuery } from "../../service/appApi";
import { useCreateBankAccountMutation } from "../../service/mastersApi";
import useAuthentication from "../../useAuthentication";

const {Title, Text } = Typography;

const AddBank = () => {
    const history = useHistory();
    const { AuthCtx } = useAuthentication();
    const { user } = useContext(AuthCtx);
    const { data } = useGetSelectedOrgQuery(user.id);
    const orgId = data?.selectedOrg?.['_id'];
    const [ createBankAccount, {isError, isSuccess, error, isLoading} ] = useCreateBankAccountMutation();
    return (
        <>
        <div style={{borderBottom:"ridge", position:"sticky", top:"64px", zIndex:999, backgroundColor:"whitesmoke"}}>
            <div style={{textAlign:"left", margin:"0px 20px", display:"flex", justifyContent:"space-between",
                flexWrap:'wrap'}}>
                <Title level={3}>Add Bank</Title>
            </div>
        </div>

        <Form
            labelCol={{lg:8, span:24}}
            wrapperCol={{lg:{span:12, offset:1}, span:24}}
            labelAlign='left'
            layout='horizontal'
            style={{maxWidth:'100%', margin:'30px 10px'}}  
            onFinish={(values) => {
                console.log(values);
                createBankAccount({body: values, params:{orgId}});
            }}
        >
            <Row>
            <Col span={24} lg={10}>
                <Form.Item label='Account Name' name='name' required={true} 
                    rules={[{required:true, message:'Please provide Account Name.'}]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Account Holder's Name" name='beneficiaryName'>
                    <Input />
                </Form.Item>
                <Form.Item label='Account Number' name='accountNumber'>
                    <InputNumber style={{width:'100%'}} controls={false}/>
                </Form.Item>
                <Form.Item label='Bank Name' name='bankName'>
                    <Input />
                </Form.Item>
                <Form.Item label='IFSC' name='ifsc'>
                    <Input />
                </Form.Item>
                <Form.Item label='Description' name='description'>
                    <Input.TextArea placeholder="Max. 500 characters"/>
                </Form.Item>
            </Col>
            </Row>
            <div style={{padding:15, borderTop:'1px solid #dee2e6', textAlign:'left'}}>
                <Space size='middle'>
                    <Button type="primary" htmlType="submit" loading={isLoading}>Save</Button>
                    <Button onClick={() => {history.goBack();}}>Cancel</Button>
                </Space>
            </div>
            <div>
                {isError && console.log(error)}
                {isError && 
                    <Text type="danger">
                        {typeof error.data.error === 'string' ? error.data.error : `Error in creating Bank account! Contact Support.`}                       
                    </Text>}
                {isSuccess && history.goBack()}
            </div>
        </Form>
        </>
    );
};

export default AddBank;
