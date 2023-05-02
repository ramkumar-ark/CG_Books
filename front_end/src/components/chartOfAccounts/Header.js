import { PlusOutlined } from '@ant-design/icons';
import { Button, Typography } from "antd";
import SubHeader from "../individual components/SubHeader";
import useCreateAccountModal from './useCreateAccountModal';

const {Title} = Typography;

const Header = ({componentref, topOffset, api}) => {
    const [CreateAccountModal, showModal] = useCreateAccountModal(api);
    return (
        <SubHeader componentref={componentref} topOffset={topOffset}>
            <Title level={3} style={{margin:"10px 0"}}>Active Accounts</Title>
            <Button type="primary" style={{padding:'4px 5px'}} onClick={showModal}>
                <PlusOutlined/> New Account
            </Button>
            <CreateAccountModal/>
        </SubHeader>
    );
};

export default Header;
