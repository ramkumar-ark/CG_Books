import SubHeader from "../../individual components/SubHeader";
import { Typography } from "antd";
import { useHistory } from "react-router-dom";
import { CloseOutlined } from '@ant-design/icons';

const {Title, Link} = Typography;

const Header = ({title, componentref}) => {
    const history = useHistory();
    return (
        <SubHeader topOffset={0} componentref={componentref}>
            <Title level={3} style={{marginTop:10}}>{title}</Title>
            <Link onClick={() => history.goBack()}>
                <CloseOutlined style={{fontSize:20, color:'grey'}}/>
            </Link>
        </SubHeader>
    );
};

export default Header;
