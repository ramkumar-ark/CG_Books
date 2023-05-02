import { Button, DatePicker, Form, Input, Space, Modal, Typography } from "antd";
import TransactionTable from "./TransactionTable";
import FormDataManager from "./FormDataManager";
import { useHistory } from "react-router-dom";
import transformData from "./transformData";

const {Text} = Typography;

const CreateJournalForm = ({initialValues, onSave}) => {
    const history = useHistory();
    const [form] = Form.useForm();
    const formDataManager = new FormDataManager(form);
    const onSubmit = (data) => {
        const reqObj = transformData(data);
        const isTotalsMatched = formDataManager.isTotalsMatched();
        if (isTotalsMatched) onSave(reqObj);
        else Modal.error({
            title:'Voucher Totals does not match!', 
            content:<Text>
                    The total of debit amounts should be equal to the total of credit amounts.                
                </Text>,         
        });
    };
    return (
        <Form
            form={form}
            onFinish={onSubmit}
            initialValues={initialValues}
            labelCol={{span:24, lg:4}}
            wrapperCol={{span:24, lg:8}}
            style={{padding:'20px 20px 0px', textAlign:'left'}}
        >
            <Form.Item name='date' label='Date' rules={[{required:true, message:'Please Enter date of journal.'}]}>
                <DatePicker style={{width:'100%'}} format={"DD-MM-YYYY"}/>
            </Form.Item>
            <Form.Item name='voucherNumber' label='Journal#' rules={[{required:true, message:'Please Enter Journal Voucher Number.'}]}>
                <Input/>                
            </Form.Item>
            <Form.Item name='referenceNumber' label='Reference#'>
                <Input/>
            </Form.Item>
            <Form.Item name='notes' label='Notes' rules={[{required:true, message:'Notes cannot be empty.'}]}>
                <Input.TextArea placeholder="Max. 500 characters." maxLength={500}/>                
            </Form.Item>
            <TransactionTable data={initialValues.entries} formDataManager={formDataManager}/>
            <div style={{position:'sticky', bottom:0, marginTop:30, padding:15, 
                borderTop:'1px solid #eee', backgroundColor:'whitesmoke'}}>
                <Space size={'large'}>
                    <Button type="primary" htmlType="submit">Save</Button>
                    <Button onClick={() => {history.goBack()}}>Cancel</Button>
                </Space>                
            </div>
        </Form>
    );
};

export default CreateJournalForm;
