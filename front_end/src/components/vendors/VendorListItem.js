import { Space, Typography } from "antd";

const {Text} = Typography;

const VendorListItem = ({data, isSelected, onClick}) => {
    return (
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center',
            padding:'5px 10px', borderBottom:'1px solid lightgrey', textAlign:'left'}}
            className={isSelected ? "selectedDiv" : "selectableDiv"} 
            onClick={() => !isSelected && onClick()}   
        >
            <Space direction="vertical">
                <Text style={{color:'#408dfb'}}>{data.name}</Text>
                <Text type="secondary">{data.payables.toLocaleString('en-IN', {minimumFractionDigits:2})}</Text>
            </Space>
        </div>
    );
};

export default VendorListItem;
