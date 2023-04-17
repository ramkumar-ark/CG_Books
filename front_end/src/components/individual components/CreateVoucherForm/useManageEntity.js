import { useState } from "react";

export default function useManageEntity(entitiesDataObj, changeCreditPeriod, entityId){
    const [selectedEntity, setSelectedEntity] = useState(() => {if (entityId) return entitiesDataObj[entityId]});
    const changeSelectedEntity = (entityId) => {
        const entity = entitiesDataObj[entityId];
        changeCreditPeriod(entity.creditPeriod);
        setSelectedEntity(entity);
    };
    return [selectedEntity, changeSelectedEntity];
}