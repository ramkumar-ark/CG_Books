import { Popover, Space, Typography } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

const {Text} = Typography;

const Header = ({title, dropDownComponent, toolTip}) => {
    return (
        <div style={{backgroundColor:'#0505050f', borderColor:'#ebeaf2', fontSize:18, padding:'10px 15px',  
            borderRadius:'10px 10px 0 0', display:'flex', justifyContent:'space-between', 
            alignItems:'center'}}>
            <Space size='small'>
                <Text style={{fontSize:18}}>{title}</Text>
                <Popover content={toolTip}><QuestionCircleOutlined /></Popover>
            </Space>
            {dropDownComponent}
        </div>
    );
};

export default Header;
