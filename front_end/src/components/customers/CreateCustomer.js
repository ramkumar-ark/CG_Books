import { Divider, Typography, Layout, Spin } from "antd";
import CreateContactForm from "./CreateContactForm";
import { useCreateEntityMutation, useGetCustomersQuery, useUpdateEntityMutation } from "../../service/mastersApi";
import { Redirect, useRouteMatch, useParams } from "react-router-dom";
import useAuthentication from "../../useAuthentication";
import { useContext } from "react";
import { useGetSelectedOrgQuery } from "../../service/appApi";

const { Title, Text } = Typography;

const CreateCustomer = () => {
    const {url, path} = useRouteMatch();
    let mode = url.split('/')[4];
    mode = `${mode[0].toUpperCase()}${mode.slice(1)}`;
    const entityId = useParams()?.entityId;
    const { AuthCtx } = useAuthentication();
    const { user } = useContext(AuthCtx);
    const { data } = useGetSelectedOrgQuery(user.id);
    const orgId = data?.selectedOrg?.['_id'];
    const { data:data1, isLoading } = useGetCustomersQuery(orgId, {skip: !orgId});
    const customer = data1?.customers.find(e => e['_id'] === entityId);
    const [createEntity, { isLoading: isLoading1, isSuccess, isError, error }] = useCreateEntityMutation();
    const [updateEntity, { isLoading: isLoading2, isSuccess:isSuccess1, isError:isError1, error:error1}] =
        useUpdateEntityMutation();    
    const submitFn = (formData) => {
        const entityData = {...formData, userId: user.id, orgId};
        mode === 'New' && createEntity(entityData);
        mode === 'Edit' && updateEntity({params:{entityId}, body:entityData});
    };
    if (mode=='New' || customer)
    return (
        <Spin size="large" spinning={(isLoading || isLoading1) || (mode == 'Edit' && !customer)}>
            <div style={{textAlign:"left", marginLeft:"20px"}}>
                <Title level={3}>{mode} Customer</Title>
            </div>
            <Divider/>
            {error && console.log(error)}
            {error1 && console.log(error1)}
            {(isError || isError1) && <div><Text type="danger">Error Creating Customer</Text></div>}
            {(isSuccess || isSuccess1) && <Redirect to="/app/home/customers" />}
            <CreateContactForm onSubmit={submitFn} entityData={customer}/>
        </Spin>
    );
};

export default CreateCustomer;
