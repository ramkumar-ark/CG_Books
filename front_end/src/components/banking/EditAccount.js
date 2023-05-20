import { useHistory, useParams } from "react-router-dom";
import useUpdateAccount from "../../hooks/useUpdateAccount";
import CreateNewAccountForm from "../chartOfAccounts/CreateNewAccountForm";
import { Button, Form, Space, Spin, Typography, notification } from "antd";
import useGetLedger from "../../hooks/useGetLedger";
import SubHeader from "../individual components/SubHeader";
import { useEffect } from "react";

const EditAccount = () => {
    const {ledgerId} = useParams();
    const ledger = useGetLedger(ledgerId);
    const history = useHistory();
    const [api, contextHolder] = notification.useNotification();
    const {updateLedgerAccount, isLoading: isUpdating, isSuccess} = useUpdateAccount(api, ledgerId);
    const [form] = Form.useForm();
    useEffect(() => {isSuccess && history.goBack()}, [isSuccess, history])
    return (
        <Spin spinning={isUpdating || !ledger}>
            {contextHolder}
            <SubHeader topOffset={0}>
                <Typography.Title level={3}>Edit Account</Typography.Title>
            </SubHeader>
            {ledger && 
            <CreateNewAccountForm 
                form={form}
                initialValues={ledger}
                onSave={updateLedgerAccount}
                isGroupDisabled={true}
            />}
            <div style={{borderTop:'1px solid #dee2e6', textAlign:'left', padding:10}}>
                <Space>
                    <Button type='primary' onClick={() => {form.submit()}}>Save</Button>
                    <Button onClick={() => {history.goBack()}}>Cancel</Button>
                </Space>
            </div>
        </Spin>
    );
};

export default EditAccount;
