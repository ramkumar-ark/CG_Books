import SubHeader from "../individual components/SubHeader";
import { Typography } from "antd";
import { CloseOutlined } from '@ant-design/icons'
import { useHistory } from "react-router-dom";

const {Title, Link} = Typography;

const HeaderForRecordPaymentPage = ({componentref, topOffset, titleLevel, ...rest}) => {
    const history = useHistory();
    return (
        <SubHeader componentref={componentref} topOffset={topOffset} {...rest}>
            <Title level={titleLevel}>Bill Payment</Title>
            <div style={{borderLeft:'1px solid #e0e0e0', padding:'8px 0px 0px 8px', margin:10}}>
                <Link onClick={() => {history.goBack()}}>
                    <CloseOutlined style={{color:'#777', fontSize:20}}/>
                </Link>
            </div>
        </SubHeader>
    );
};

export default HeaderForRecordPaymentPage;
