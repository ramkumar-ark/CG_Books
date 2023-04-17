import { Form, InputNumber, Checkbox } from 'antd';

const AmountReceivedField = ({onAmountChange, onCheckBoxChange, selectedEntity, isEditMode, 
    voucherType}) => {
    const status = voucherType === 'Receipt' ? 'Received' : 'Paid';
    return (
    <Form.Item label={`Amount ${status}`} required={true}>
        <Form.Item name='amount' style={{marginBottom:10}}
            rules={[{required:true, message:`Please enter the amount ${status.toLowerCase()}.`}]} 
        >
            <InputNumber min={0} addonBefore={"₹"} style={{width:"100%"}} 
                onChange={onAmountChange}
                formatter={(value, info)=> {
                    if (!info.userTyping)
                        return Number(value).toLocaleString('en-IN', {minimumFractionDigits:2, maximumFractionDigits:2})}
                }
            />
        </Form.Item>
        {(selectedEntity?.closingBalance > 0 && !isEditMode) &&
        <Checkbox onChange={onCheckBoxChange}>
            {status} full amount ( ₹{Number(selectedEntity.closingBalance).toLocaleString('en-IN', 
                {minimumFractionDigits:2, maximumFractionDigits:2})})
        </Checkbox>
        }
    </Form.Item>
    );
};

export default AmountReceivedField;
