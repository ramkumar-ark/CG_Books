import { Divider, Typography, Layout, Spin } from "antd";
import CreateContactForm from "./CreateContactForm";
import { useCreateEntityMutation } from "../../service/mastersApi";
import { Redirect } from "react-router-dom";
import useAuthentication from "../../useAuthentication";
import { useContext } from "react";
import { useGetSelectedOrgQuery } from "../../service/appApi";

const { Title, Text } = Typography;

const CreateCustomer = () => {
    const { AuthCtx } = useAuthentication();
    const { user } = useContext(AuthCtx);
    const { data } = useGetSelectedOrgQuery(user.id);
    const orgId = data?.selectedOrg?.['_id'];
    const [createEntity, { isLoading, isSuccess, isError, error }] = useCreateEntityMutation();
    const submitFn = (formData) => {
        const entityData = {...formData, userId: user.id, orgId};
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
