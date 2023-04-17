import { useState } from "react";
import EntityDetailsDrawer from "../EntityDetailsDrawer";
import { Typography } from "antd";
import { IdcardOutlined } from '@ant-design/icons'

const EntityDetailsView = ({entityData, entityTypeDisplay}) => {
    const [openDrawer, setOpenDrawer] = useState(false);
    return (
        <>
            <Typography.Link onClick={() => setOpenDrawer(true)} >
                <IdcardOutlined/> View {entityTypeDisplay} Details 
            </Typography.Link>
            <EntityDetailsDrawer 
                data={entityData} 
                isOpen={openDrawer} 
                onClose={() => setOpenDrawer(false)} 
                entityTypeDisplay={entityTypeDisplay}
            />
        </>
    );
};

export default EntityDetailsView;
