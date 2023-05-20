import { Form, InputNumber, DatePicker, Input, Select } from 'antd';
import SelectEntityForm from './SelectEntityForm';
import useManageEntity from './useManageEntity';
import useSummaryDataManager from './useSummaryDataManager';
import useFormDataManager from './useFormDataManager';
import AmountReceivedField from './AmountReceivedField';
import UnpaidInvoices from './UnpaidInvoicesTable';
import AmountSummary from './AmountSummary';
import useGetSubmitFunction from './useGetSubmitFunction';
import FormFooter from './FormFooter';

const RecordPaymentForm = ({initialValues, onSave, voucherType, voucherData, entityDataObj, 
    closingBalances, unpaidVouchers, bankSelectOpts}) => {
    const entityType = voucherType === 'Receipt' ? 'customer' : 'vendor';
    const [form] = Form.useForm();
    const isEdit = !!voucherData.voucherNumber;
    const [selectedEntity, onEntitySelect] = useManageEntity(entityDataObj, closingBalances, 
        unpaidVouchers, voucherData);
    const {summaryData, changeReceivedAmount, changeUsedAmount} = useSummaryDataManager(voucherData);
    const {changeAmountReceivedField} = useFormDataManager(form);
    const onCheckBoxChange = (event) => {
        const amountReceived = event.target.checked ? selectedEntity.closingBalance : null
        changeAmountReceivedField(amountReceived);
        changeReceivedAmount(amountReceived);
    };
    const onFinish = (values) => {onSave({...values, selectedEntity})}
    const onSubmit = useGetSubmitFunction(voucherType, onFinish);
    return (
        <>
        <SelectEntityForm disabled={isEdit} entityType={entityType} form={form} 
            onEntitySelect={onEntitySelect} initialValues={isEdit && voucherData.otherDetails.linkedEntity} 
            selectedEntity={selectedEntity}
        />
        <Form
            form={form}
            labelCol={{lg:4, span:24}}
            wrapperCol={{lg:{span:9, offset:1}, span:24}}
            labelAlign='left'
            layout='horizontal'
            style={{padding:'0 20px 50px', textAlign:'left'}}  
            onFinish={(values) => {
                summaryData.received === summaryData.used ? onFinish(values) : onSubmit(values, summaryData);
            }}
            disabled={!selectedEntity}
            initialValues={initialValues}
            
        >
            <AmountReceivedField isEditMode={isEdit} onAmountChange={changeReceivedAmount}
                voucherType={voucherType} selectedEntity={selectedEntity} 
                onCheckBoxChange={onCheckBoxChange} />

            {voucherType === 'Receipt' &&
            <Form.Item label='Bank Charges (if any)' name='bankCharges'>
                <InputNumber style={{width:"100%"}} min={0}/>
            </Form.Item>}

            <Form.Item label={`${voucherType} Date`} name='date' 
                rules={[{required:true, message:`Please enter the ${voucherType} date.`}]}>
                <DatePicker style={{width:'100%'}} format="DD-MM-YYYY"/>
            </Form.Item>
            
            <Form.Item label={`${voucherType} #`} name='voucherNumber' required={true}
                rules={[{required:true, message:`Please enter the ${voucherType} voucher number.`}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item label={`${voucherType} Mode`} name='mode'>
                <Select 
                    options={[{label:'Cash', value:'cash'}, {label:'Bank Remittance', value:'bank'}, 
                        {label:'Cheque', value:'cheque'}, {label:'Credit Card', value:'credit card'}]}
                />
            </Form.Item>

            <Form.Item label={voucherType==='Receipt' ? "Deposit To" : "Paid Through"} name="bankLedger" 
                rules={[{required:true, message:'Please select bank/cash account.'}]}>
                <Select
                    options={bankSelectOpts}
                    placeholder="Select Account"
                />
            </Form.Item>
            
            <Form.Item label='Reference#' name='referenceNumber'>
                <Input/>
            </Form.Item>
            
            <UnpaidInvoices InvoiceData={selectedEntity?.unpaid || []} form={form} 
                onUsedAmtChange={changeUsedAmount} voucherType={voucherType}
                isFullAmtRcd={selectedEntity?.closingBalance === summaryData.received}/>

            <AmountSummary data={summaryData} voucherType={voucherType}/>

            <Form.Item label={`Notes (Internal use. Not visible to ${entityType})`} name='notes' 
                labelCol={{span:24}} wrapperCol={{span:24}}>
                <Input.TextArea/>
            </Form.Item>
            
            <FormFooter isEdit={isEdit} formObj={form}/>

        </Form>
        </>
    );
};

export default RecordPaymentForm;
