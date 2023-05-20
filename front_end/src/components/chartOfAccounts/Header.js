import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Space, Typography } from "antd";
import SubHeader from "../individual components/SubHeader";
import useCreateAccountModal from './useCreateAccountModal';
import useDeleteLedgers from './useDeleteLedgers';

const {Title} = Typography;

const Header = ({componentref, topOffset, api, ledgerIdsToDelete}) => {
    const [CreateAccountModal, showModal] = useCreateAccountModal(api);
    const {deleteLedgerAccounts} = useDeleteLedgers();
    return (
        <SubHeader componentref={componentref} topOffset={topOffset}>
            <Title level={3} style={{margin:"10px 0"}}>Active Accounts</Title>
            <Space>
                {ledgerIdsToDelete?.length > 0 && 
                <Button type='primary' style={{padding:'4px 5px'}} onClick={() => deleteLedgerAccounts(ledgerIdsToDelete)}>
                    <DeleteOutlined/> Delete
                </Button>
                }
                <Button type="primary" style={{padding:'4px 5px'}} onClick={showModal}>
                    <PlusOutlined/> New Account
                </Button>
            </Space>
            <CreateAccountModal/>
        </SubHeader>
    );
};

export default Header;
