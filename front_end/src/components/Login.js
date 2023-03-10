import { useContext, useEffect } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Alert } from 'antd';
import {Typography} from "antd";
import { useLocation, useHistory } from 'react-router-dom';
import useAuthentication from '../useAuthentication';

const {Title} = Typography;

export default function Login(){
    const location = useLocation();
    const history = useHistory();
    const {from} = (location && location.state) || {from: {pathname: "/"}};
    const {AuthCtx} = useAuthentication();
    const {signin, user, error} = useContext(AuthCtx);

    useEffect(() => {user && history.replace(from)}, [user, from, history]);

    return (
        <>
        <Title level={3}>Start Using  <Title level={2} style={{display:"inline", fontWeight:"bolder", color:"#7088ff" }}><u>CG BOOKS</u></Title></Title>
        <Title level={3} style={{fontWeight:"bold", color:"royalblue"}}>Login</Title>
        <Form
        name="normal_login"
        className="login-form"
        initialValues={{remember: true,}}
        onFinish={signin}
        >
            {error ? <Alert style={{marginBottom: "12px"}} message={error} type="error" /> : null}
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
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="User Email" />
            </Form.Item>

            <Form.Item
                name="password"
                rules={[
                {
                    required: true,
                    message: 'Please input your Password!',
                },
                ]}
            >
                <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                />
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                Forgot password
                </a>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
                </Button>
                Or <a href="/signup">Sign Up Now!</a>
            </Form.Item>
    </Form>
    </>
    );
}