import { Divider, Typography, Layout, Spin } from "antd";
import CreateContactForm from "./CreateContactForm";
import { useCreateEntityMutation } from "../../service/mastersApi";
import { Redirect } from "react-router-dom";
import useAuthentication from "../../useAuthentication";
import useOrganization from "../../useOrganization";
import { useContext } from "react";

const { Title, Text } = Typography;

const CreateCustomer = () => {
    const { AuthCtx } = useAuthentication();
    const { user } = useContext(AuthCtx);
    const { OrgCtx } = useOrganization();
    const { selectedOrg } = useContext(OrgCtx);
    const [createEntity, { isLoading, isSuccess, isError, error }] = useCreateEntityMutation();
    const submitFn = (formData) => {
        const entityData = {...formData, userId: user.id, orgId: selectedOrg['_id']};
        createEntity(entityData);
    };
    return (
        <Spin size="large" spinning={isLoading}>
            <div style={{textAlign:"left", marginLeft:"20px"}}>
                <Title level={3}>New Customer</Title>
            </div>
            <Divider/>
            {error && console.log(error)}
            {isError && <div><Text type="danger">Error Creating Customer</Text></div>}
            {isSuccess && <Redirect to="/app/home/customers" />}
            <CreateContactForm onSubmit={submitFn}/>
        </Spin>
    );
};

export default CreateCustomer;