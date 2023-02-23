import { Row, Col } from 'antd';
import { useState } from 'react';
import AddressSection from './AddressSection';

const AddressTab = ({formObj}) =>{
    const copyBillingAddress = () => {
        formObj.setFieldsValue({'shippingAddress': formObj.getFieldValue('billingAddress')});
    };
    return (
        <Row style={{textAlign:"left"}}>
            <Col span={12}>
                <AddressSection type="billing" />
            </Col>
            <Col span={12}>
                <AddressSection type="shipping" copyFunction={copyBillingAddress} />
            </Col>
        </Row>
    );
};

export default AddressTab;
