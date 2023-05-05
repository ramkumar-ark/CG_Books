import { Layout, Typography } from "antd";
import useGetViewPortHeight from "../../hooks/useGetViewPortHeight";
import ValidateEmail from "./ValidateEmail";
import { useEffect, useState } from "react";
import ValidateOtp from "./ValidateOtp";
import NewPassword from "./NewPassword";
import { useHistory } from "react-router-dom";
import SuccessMessage from "./SuccessMessage";

const {Content} = Layout;
const {Title} = Typography;

const ResetPassword = () => {
    const viewportHeight = useGetViewPortHeight();
    const history = useHistory();
    const [state, setState] = useState({stage:'validateEmail', email:undefined, resetToken:undefined});
    useEffect(() => {
        state.stage === 'passwordChanged' && setTimeout(() => {history.replace('/login')}, 5000);
    }, [state.stage, history]);
    return (
    <Layout className="site-layout" style={{height:viewportHeight-64}}>
        <Content style={{position:'sticky', top:'0px', overflow:'auto', height:viewportHeight-64}}>
            <div style={{width:480, margin:'7% auto', minHeight:400, backgroundColor:'#fff', 
                boxShadow:'0px 2px 30px 0px #2b2b2b17', textAlign:'left', padding:40}}>
                <Title level={3} style={{marginTop:0}}>Forgot Password</Title>
                {state.stage === 'validateEmail' && 
                <ValidateEmail onSuccess={(email, resetToken) => {setState({stage:'validateOtp', email, resetToken})}} email={state.email}/>}
                {state.stage === 'validateOtp' && 
                <ValidateOtp email={state.email} resetToken={state.resetToken}
                    onUserChange={() => {setState({stage:'validateEmail', email:state.email, resetToken:undefined})}}
                    onSuccess={(resetToken) => setState({...state, stage:'newPassword', resetToken})}/>}
                {state.stage === 'newPassword' && 
                <NewPassword email={state.email} resetToken={state.resetToken} onSuccess={() => setState({...state, stage:'passwordChanged'})}/>}
                {state.stage === 'passwordChanged' && <SuccessMessage/>}
            </div>
        </Content>
    </Layout>
    );
};

export default ResetPassword;
