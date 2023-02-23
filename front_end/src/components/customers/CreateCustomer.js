import { Divider, Typography, Layout } from "antd";
import CreateContactForm from "./CreateContactForm";
const { Title } = Typography;
const { Footer } = Layout;

const CreateCustomer = () => {
    return (
        <>
        <div style={{textAlign:"left", marginLeft:"20px"}}>
            <Title level={3}>New Customer</Title>
        </div>

        <Divider/>
        <CreateContactForm/>
        </>
    );
};

export default CreateCustomer;