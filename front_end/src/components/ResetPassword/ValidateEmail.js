import { Form, Input, Button, Typography, Alert } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { useValidateUserMutation } from "../../service/appApi";

const {Text} = Typography;

const ValidateEmail = ({onSuccess}) => {
    const [form] = Form.useForm();
    const [showAlert, setShowAlert] = useState(false);
    const [validateEmail, {data, isLoading, isSuccess, isError, error}] = useValidateUserMutation();
    useEffect(() => {
        (isSuccess && data.result === 'success') && onSuccess(data.email, data.resetToken);
        (isSuccess && data.result === 'failed') && setShowAlert(true);
        if (isError) {
            console.log(error);
            setShowAlert(true);
        }
    }, [isSuccess, isError, error, data?.result, onSuccess, data?.email, data?.resetToken]);
    return (
        <Form
            form={form}
            style={{marginTop:20}}
            name="forgotPassword"
            onFinish={(values) => {validateEmail(values.email)}}
        >
            <Text>Enter your registered email address to change your CG Books account password.</Text>
            {showAlert && 
                <Alert 
                    message={isError ? "Server Error!" : "Account does not exist. Please use a different email."} 
                    type="error"
                />}
            <Form.Item
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    }
                ]}
            >
                <Input 
                    prefix={<UserOutlined className="site-form-item-icon" />} 
                    placeholder="User Email" 
                    size="large"
                    style={{backgroundColor:'#F9F9F9', marginTop:20}}
                    id="email"
                />
            </Form.Item>
            <Button type="primary" size="large" style={{width:'100%', fontWeight:'bold', marginTop:10}} 
                htmlType="submit" loading={isLoading}>Next</Button>
        </Form>
    );
};

export default ValidateEmail;
