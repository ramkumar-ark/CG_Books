import { Form, Input } from 'antd'
import React from 'react';

const BankDetailsSection = ({index}) => (
    <React.Fragment key={index + 1}>
    <Form.Item label='Beneficiary Name' name={['bankDetails', index, 'beneficiaryName']} initialValue={''}>
        <Input/>
    </Form.Item>
    <Form.Item label='Bank Name' name={['bankDetails', index, 'bankName']} 
        rules={[{required: true, message: "Enter Bank Name."}]}>
        <Input/>
    </Form.Item>
    <Form.Item label='Account Number' name={['bankDetails', index, 'accountNo']} 
        rules={[{required: true, message: "Enter Account Number."}]}>
        <Input/>
    </Form.Item>
    <Form.Item label='IFSC' name={['bankDetails', index, 'ifsc']} 
        rules={[{required: true, message: "Enter IFSC."}]}>
        <Input/>
    </Form.Item>
    <div style={{borderBottom:'1px solid #0505050f', margin:'20px 10px'}}/>
    </React.Fragment>
);

export default BankDetailsSection;
