import { Space, Spin, Typography } from "antd";
import Header from "./HeaderSingleAccount";
import { useRef } from "react";
import useGetLedgers from "../../hooks/useGetLedgers";
import { useParams } from "react-router-dom";
import SubHeaderSingleView from "../individual components/SubHeaderSingleView";
import useCreateAccountModal from "./useCreateAccountModal";
import useDeleteAccount from "./useDeleteAccount";

const {Text} = Typography;

const LedgerAccountView = ({api}) => {
    const headerRef = useRef();
    const {ledgerId} = useParams();
    const ledgers = useGetLedgers();
    const ledger = ledgers?.find(e => e.key === ledgerId);
    const [CreateAccountModal, showModal] = useCreateAccountModal(api, true);
    const {deleteLedgerAccount, isLoading} = useDeleteAccount(ledgerId);
    return (
        <Spin spinning={!ledger || isLoading}>
            <Header componentref={headerRef} topOffset={0} ledgerGroupName={ledger?.group} 
                ledgerName={ledger?.name} titelLevel={4}/>
            <SubHeaderSingleView 
                deleteFunction={deleteLedgerAccount}
                editFunction={showModal}
                topOffset={headerRef?.current?.clientHeight}
            />
            <CreateAccountModal/>
            <div style={{padding:15, textAlign:'left'}}>
                <Space direction="vertical" size={1}>
                    <Text type='secondary'>CLOSING BALANCE</Text>
                    <Text style={{fontSize:24, color:'#356BFF'}}>₹{ledger?.clBal.toLocaleString('en-IN', {minimumFractionDigits:2})}</Text>
                </Space>
                <br/>
                <Text italic>Description : </Text>
                <Text>{ledger?.description}</Text>
            </div>

        </Spin>
    );
};

export default LedgerAccountView;
