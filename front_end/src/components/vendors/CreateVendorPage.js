import { Spin, Typography } from "antd";
import useCreateOrUpdateEntity from "../../hooks/useCreateOrUpdateEntity";
import CreateContactForm from "../customers/CreateContactForm";
import useGetEntity from "../../hooks/useGetEntity";

const {Text, Title} = Typography;

const CreateVendorPage = () => {
    const [createOrUpdateEntity, isLoading] = useCreateOrUpdateEntity();
    const {customer, isFetching} = useGetEntity();
    return(
        <Spin size="large" spinning={isLoading || isFetching}>
            <div style={{textAlign:"left", marginBottom:15, paddingLeft:20, borderBottom:'1px solid #eee'}}>
                <Title level={3}>{customer ? 'Edit' : 'New'} Vendor</Title>
            </div>
            {!isFetching &&
            <CreateContactForm onSubmit={createOrUpdateEntity} entityData={customer} entityType='vendor'/>
            }
        </Spin>
    );    
};

export default CreateVendorPage;
