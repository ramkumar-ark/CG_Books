import { Form, Typography, Input, Space, Button, Modal } from "antd";
import { useResetPasswordMutation } from "../../service/appApi";
import { useCallback, useEffect } from "react";

const {Text} = Typography;

const NewPassword = ({email, resetToken, onSuccess, onFaliure}) => {
    const [updatePassword, {isSuccess, isError, error, isLoading}] = useResetPasswordMutation();
    const showModalOnError = useCallback(() => {
        Modal.error({
            title: 'Password not changed!',
            content: <Text>System error has occured on updating password. Please try again. If the error persists contact support.</Text>,
            onOk() {onFaliure()}
        });
    }, [onFaliure]);
    useEffect(() => {
        if (isSuccess) onSuccess();
        else if (isError) {
            console.log(error);
            showModalOnError();
        };
    }, [isSuccess, onSuccess, showModalOnError, isError, error]);
    const [form] = Form.useForm();
    return (
        <Form
            form={form}
            style={{marginTop:20}}
            name="newPassword"
            onFinish={(values) => {updatePassword({email, password:values.password, requestToken:resetToken})}}
        >
            <Space style={{border:'1px solid #eeeeee', marginBottom:20, borderRadius:7, padding:10}}>
                <Text>{email}</Text>
            </Space>
            <br/>
            <Text>Enter new password for your CG Books account password.</Text>
            <Form.Item
                name="password"
                rules={[
                    {required: true, message: "Please input your passoword!"},
                    {min: 6, message: 'Password must be at least 6 characters long'},
                    {max:12, message:'Password must not exceed 12 characters'},
                ]}
                hasFeedback
                style={{marginTop:20}}
            >
                <Input.Password placeholder="New Password"/>
            </Form.Item>

            <Form.Item
                name="confirm"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {required: true, message: "Please confirm your password!"},
                    ({getFieldValue}) => ({
                        validator(_, value){
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve()
                            }
                            return Promise.reject(new Error('The two passwords that you entered do not match!'))
                        },
                    }),
                ]}
                >
                    <Input.Password placeholder="Confirm Password"/>
                </Form.Item>
            <Button type="primary" size="large" style={{width:'100%', fontWeight:'bold', marginTop:10}} htmlType="submit" loading={isLoading}>Submit</Button>
        </Form>
    );
};

export default NewPassword;
