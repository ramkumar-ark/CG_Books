import { Row, Col } from 'antd';
import { useState } from 'react';
import AddressSection from './AddressSection';

const AddressTab = ({formObj}) =>{
    const copyBillingAddress = () => {
        formObj.setFieldsValue({'shippingAddress': formObj.getFieldValue('billingAddress')});
    };
    return (
        <Row style={{textAlign:"left"}} gutter={[0,30]}>
            <Col lg={12} span={24}>
                <AddressSection type="billing" />
            </Col>
            <Col lg={12} span={24}>
                <AddressSection type="shipping" copyFunction={copyBillingAddress} />
            </Col>
        </Row>
    );
};

export default AddressTab;
