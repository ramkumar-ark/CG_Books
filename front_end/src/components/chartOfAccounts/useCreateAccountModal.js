import { Modal, Form, Spin } from 'antd';
import { useState } from 'react';
import CreateNewAccountForm from './CreateNewAccountForm';
import useCreateAccount from '../../hooks/useCreateAccount';
import { useParams } from 'react-router-dom';
import useUpdateAccount from '../../hooks/useUpdateAccount';
import useGetLedger from '../../hooks/useGetLedger';

const useCreateAccountModal = (api, isEdit) => {
    let {ledgerId} = useParams();
    ledgerId = isEdit && ledgerId;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {setIsModalOpen(true)};
    const {createLedgerAccount, isLoading} = useCreateAccount(api);
    const {updateLedgerAccount, isLoading: isUpdating} = useUpdateAccount(api, ledgerId);
    const ledger = useGetLedger(ledgerId);
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    
    const onFormSubmit = (values) => {
        ledgerId ? updateLedgerAccount(values) : createLedgerAccount(values);
        setIsModalOpen(false);
    };

    const CreateAccountModal = ({}) => {
        const [form] = Form.useForm();
        return (
        <Modal
            title={`${ledgerId ? 'Update' : 'Create'} Account`}
            open={isModalOpen}
            onOk={() => {form.submit()}}
            onCancel={handleCancel}
            maskClosable={false}
            destroyOnClose={true}
            okText={ledgerId ? 'Update' : 'Create'}
            style={{top:0}}
        >
            <Spin spinning={!!(isLoading || isUpdating || (ledgerId && !ledger))}>
                {!(isLoading || isUpdating || (ledgerId && !ledger)) && 
                <CreateNewAccountForm form={form} onSave={onFormSubmit} initialValues={ledger}/>}
            </Spin>
        </Modal>
    )};
    return [CreateAccountModal, showModal];
};

export default useCreateAccountModal;
