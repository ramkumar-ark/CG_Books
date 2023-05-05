import React, { useEffect, useContext } from "react";
import {
    Button,
    Checkbox,
    Form,
    Input,
    Typography,
    Alert,
    Modal,
  } from 'antd';
import { useLocation, useHistory } from 'react-router-dom';
import useAuthentication from "../useAuthentication";

const {Title, Link} = Typography;

const formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 8 } },
    wrapperCol: { xs: { span: 24 }, sm: { span: 16 } },
  };

const tailFormItemLayout = {
    wrapperCol: { 
        xs: { span: 24, offset: 0 },
        sm: { span: 16, offset: 8 },
    },
};

const showModal = () => {
    Modal.info({
        title:'Terms and Conditions',
        content:(
            <body>
                <p>By using this CG Books accounting app, you agree to the following terms and conditions:</p>
                <ol>
                  <li>This app is for educational purposes only and should not be used for commercial purposes.</li>
                  <li>You are responsible for maintaining the security and confidentiality of your login credentials.</li>
                  <li>We may collect and use your personal information in accordance with our privacy policy.</li>
                  <li>You agree to use this app in compliance with all applicable laws and regulations.</li>
                  <li>We reserve the right to modify or terminate this app at any time without notice.</li>
                  <li>You agree to indemnify and hold us harmless from any claims, damages, or expenses arising out of your use of this app.</li>
                </ol>
                <p>By checking the "I have read the agreement" checkbox, you acknowledge that you have read and agree to these terms and conditions.</p>
            </body>
        ),
        onOk() {},
    });
};

const SignUp = () => {
    const location = useLocation();
    const history = useHistory();
    const {AuthCtx} = useAuthentication();
    const {signup, user, error} = useContext(AuthCtx);
    const {from} = (location && location.state) || {from: {pathname: "/"}};
    const [form] = Form.useForm();

    useEffect(() => {user && history.replace(from)}, [user, from, history]);

    return (
        <>
        <Title level={3} style={{fontWeight:"bold", color:"royalblue"}}>SIGN UP</Title>
        <Title level={4} style={{marginTop:"12px"}}>To Experience the Ease Of Accounting.</Title>
        {error && <Alert style={{maxWidth: "600px", margin: "auto"}} message={error} type="error" closable/>}
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={signup}
            style={{
                maxWidth: 600,
                margin: "10px auto",
                paddingTop: "10px",
                paddingRight: "20px",
                border: "inset #BFD8FF",
                borderRadius: "5%",
                backgroundColor: "white",
            }}
            scrollToFirstError
        >
            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {required: true, message: "Please input your passoword!"}
                ]}
                hasFeedback
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm Password"
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
                    <Input.Password/>
                </Form.Item>

                <Form.Item
                    name="nickname"
                    label="Nickname"
                    tooltip="What do you want others to call you?"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your nickname!',
                        whitespace: true,
                    },
                    ]}
                >
                    <Input />
                </Form.Item>
                
                <Form.Item
                    name="phone"
                    label="Phone Number"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your phone number!',
                        },
                    ]}
                >
                    <Input
                        prefix="+91"
                        style={{
                            width: '100%',
                        }}
                    />
                </Form.Item>

                <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) =>
                            value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                        },
                    ]}
                    {...tailFormItemLayout}
                >
                    <Checkbox>
                        I have read the <Link onClick={showModal}>agreement</Link>
                    </Checkbox>
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                    Sign Up
                    </Button>
                </Form.Item>
        </Form>
        </>
    );
};


export default SignUp;

