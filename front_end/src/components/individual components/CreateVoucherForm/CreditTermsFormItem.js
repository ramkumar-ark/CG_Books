import { Form, Input, Space, DatePicker, InputNumber, Select } from "antd";

const SelectAfter = ({onSelect}) => (
    <Form.Item name={["creditPeriod", "unit"]} style={{marginBottom:0}}>
        <Select
        style={{
            width: 90,
        }}
        options={[
            {label:"Days", value:"days"},
            {label:"Months", value:"months"},
            {label:"Years", value:"years"},
        ]}
        onSelect={onSelect}
        />
    </Form.Item>
);

const CreditTermsFormItem = ({onCreditPeriodChange}) => {
    return (
        <Form.Item label="Credit Terms" wrapperCol={{span:24}}>
            <Input.Group compact>
                <Space style={{display: "flex", flexWrap:'wrap'}} size={50}>
                    <Form.Item name={['creditPeriod', 'value']} wrapperCol={{span:12, md:24}}>
                        <InputNumber min={0} addonAfter={<SelectAfter onSelect={onCreditPeriodChange}/>} 
                            style={{width:"150px"}} onChange={onCreditPeriodChange}/>
                    </Form.Item>
                    <Form.Item label="Due Date" name={['creditPeriod', 'dueDate']} 
                        wrapperCol={{span:12, md:24}} style={{width:'100%'}}>
                        <DatePicker format="DD-MM-YYYY" disabled={true} placeholder="Due date"
                            style={{width:'150px'}}/>
                    </Form.Item>
                </Space>
            </Input.Group>
        </Form.Item>
    );
};

export default CreditTermsFormItem;
