import useGetEntities from "./useGetEntities";
import { useParams } from "react-router-dom";

export default function useGetEntityData(entityType){
    const {entityId} = useParams();
    const {entityDataObj} = useGetEntities(entityType);
    const entityData = entityDataObj?.[entityId];
    return entityData;
}