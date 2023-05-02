import { Typography, Form, Button, Input, Row, Col, InputNumber, Space } from "antd";
import { useHistory, useParams } from "react-router-dom";
import { useCreateBankAccountMutation, useGetBankAccountQuery, useUpdateBankAccountMutation } from "../../service/mastersApi";
import useSelectedOrg from "../../hooks/useSelectedOrg";

const {Title, Text } = Typography;

const AddBank = () => {
    const history = useHistory();
    const {bankDetailsId} = useParams();
    const {'_id': orgId} = useSelectedOrg();
    const {data:bankDetail} = useGetBankAccountQuery({params:{orgId, bankDetailsId}}, {skip:!bankDetailsId || !orgId});
    const [ createBankAccount, {isError, isSuccess, error, isLoading} ] = useCreateBankAccountMutation();
    const [ updateBankAccount, {isError:isUpdateError, isSuccess:isUpdated, error:updateError, isLoading:isUpdating}]
        = useUpdateBankAccountMutation();
    return (
        <>
        <div style={{borderBottom:"ridge", position:"sticky", top:0, zIndex:999, backgroundColor:"whitesmoke"}}>
            <div style={{textAlign:"left", margin:"0px 20px", display:"flex", justifyContent:"space-between",
                flexWrap:'wrap'}}>
                <Title level={3}>Add Bank</Title>
            </div>
        </div>
        {!(bankDetailsId && !bankDetail) &&
        <Form
            labelCol={{lg:8, span:24}}
            wrapperCol={{lg:{span:12, offset:1}, span:24}}
            labelAlign='left'
            layout='horizontal'
            style={{maxWidth:'100%', margin:'30px 10px'}}  
            onFinish={(values) => {
                bankDetailsId 
                    ? updateBankAccount({body: values, params:{orgId, bankDetailsId}}) 
                    : createBankAccount({body: values, params:{orgId}});
            }}
            initialValues={bankDetail}
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
                    <Input.TextArea placeholder="Max. 500 characters" autoSize={true}/>
                </Form.Item>
                <Form.Item label="Opening Balance" name="opBalance">
                    <InputNumber addonBefore={"₹"} style={{width:"100%"}}/>
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
                {(isError || isUpdateError) && 
                    <Text type="danger">
                        {typeof (error?.data.error || updateError?.data.error) === 'string' 
                            ? error.data.error : `Error in creating Bank account! Contact Support.`}                       
                    </Text>}
                {(isSuccess || isUpdated) && history.goBack()}
            </div>
        </Form>
        }
        </>
    );
};

export default AddBank;
