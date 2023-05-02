import { Space, Typography } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import SubHeader from "../individual components/SubHeader";
import { useHistory } from "react-router-dom";

const {Title, Text, Link} = Typography;

const Header = ({topOffset, componentref, titelLevel, ledgerName, ledgerGroupName}) => {
    const history = useHistory();

    return (
        <SubHeader topOffset={topOffset} componentref={componentref}>
            <Space direction="vertical" size={1} style={{fontSize:12, textAlign:'left', paddingTop:10}}>
                <Text type="secondary">{ledgerGroupName}</Text>
                <Title level={titelLevel || 3} style={{marginTop:0}}>{ledgerName}</Title>
            </Space>
            <Link onClick={() => history.goBack()}>
                <CloseOutlined style={{fontSize:20, color:'grey'}}/>
            </Link>
        </SubHeader>
    );
};

export default Header;
