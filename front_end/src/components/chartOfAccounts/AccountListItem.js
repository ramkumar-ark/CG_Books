import { Space, Typography } from "antd";

const {Text, Link} = Typography;

const AccountListItem = ({data, isSelected, onClick}) => {
    return (
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center',
            padding:'5px 10px', borderBottom:'1px solid lightgrey', textAlign:'left'}}
            className={isSelected ? "selectedDiv" : "selectableDiv"} 
            onClick={() => !isSelected && onClick()}   
        >
            <Space direction="vertical">
                <Text>{data.name}</Text>
                <Text type="secondary">{data.group}</Text>                
            </Space>
        </div>
    );
};

export default AccountListItem;
