import { useHistory, useParams } from "react-router-dom";
import SubHeader from "../individual components/SubHeader";
import { Typography } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const {Title, Link} = Typography;

const Header = ({componentref, topOffset}) => {
    const {transactionId} = useParams();
    const history = useHistory();
    const title = transactionId ? 'Edit' : 'New';
    return (
        <SubHeader componentref={componentref} topOffset={topOffset}>
            <Title level={3}>{title} Journal</Title>
            <Link onClick={() => {history.goBack()}}>
                <CloseOutlined style={{color:'#777', fontSize:20}}/>
            </Link>
        </SubHeader>
    );
};

export default Header;
