import useSelectedOrg from "./useSelectedOrg";
import { useCreateEntityMutation, useUpdateEntityMutation } from "../service/mastersApi";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Modal, Typography } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons"

const {Text} = Typography;

export default function useCreateOrUpdateEntity(){
    const history = useHistory();
    const params = useParams();
    const entityId = params.entityId;
    const {'_id': orgId, userId} = useSelectedOrg();
    const [createEntity, { isLoading:isCreating, isSuccess:isCreated, isError:isCreateError, 
        error:createError }] = useCreateEntityMutation();
    const [updateEntity, { isLoading:isUpdating, isSuccess:isUpdated, isError:isUpdateError, 
        error:updateError }] = useUpdateEntityMutation();
    const showModalOnError = () => {
        Modal.error({
            title:'Form Submission Failed', 
            icon: <ExclamationCircleFilled />,
            content:<Text>
                There was an error in submiting the form. Please try again later. If the error persists, contact support.
                </Text>,         
        });
    }
    const onCreateOrUpdateEntity = (formData) => {
        const entityData = {...formData, userId, orgId};
        entityId ? updateEntity({params:{entityId}, body:entityData}) : createEntity({...entityData, orgId});  
    };
    useEffect(() => {
        (isCreateError || isUpdateError) && showModalOnError();
        (isCreated || isUpdated) && history.goBack();
    }, [isCreated, isUpdated, isCreateError, isUpdateError, history]);

    return [onCreateOrUpdateEntity, isCreating || isUpdating ];
}
