import { Typography } from "antd";

const {Title, Text} = Typography;

const SuccessMessage = () => (
    <div style={{textAlign:'center', display:'flex', flexDirection:'column', justifyContent:'space-evenly'}}>
        <Title level={3} style={{color:'green'}}>Success!</Title>
        <Text>Your password has been changed successfully. You can login with your new password.</Text>
    </div>
);

export default SuccessMessage;
