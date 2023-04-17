import { useEffect } from "react";
import { useDeleteEntityMutation } from "../service/mastersApi";
import useSelectedOrg from "./useSelectedOrg";
import { Modal, Typography } from 'antd';
import { useHistory } from "react-router-dom";
import { ExclamationCircleFilled } from '@ant-design/icons';

const { confirm } = Modal;
const { Text } = Typography;

export default function useDeleteEntity(entityId){
    const history = useHistory();
    const {'_id': orgId} = useSelectedOrg();
    const [deleteEntity, {isLoading, isError, error, data}] = useDeleteEntityMutation();
    const confirmDelete = () => {
        confirm({
            title: `CONFIRM DELETE!`,
            icon: <ExclamationCircleFilled />,
            content: `Are you sure to delete this entity? This action cannot be undone later.`,
            onOk() {
                deleteEntity({params:{entityId, orgId}});
            },
            onCancel() {
            },
        });
    };
    const showModalOnSubmitFailed = () => {
        Modal.error({
            title:'Entity cannot be deleted!', 
            content:<Text>
                {data?.result==='failed' 
                ? 'Cannot Delete! There are transactions associated with the entity.'
                : 'There was an error deleting the entity. Please try again later or contact support if the error persists.'}
                </Text>,         
        });
    };
    useEffect(()=>{
        data?.result === 'success' && history.goBack();
        (isError || data?.result === 'failed') && showModalOnSubmitFailed();
    },[data, isError, history]);
    return [confirmDelete, isLoading];
}