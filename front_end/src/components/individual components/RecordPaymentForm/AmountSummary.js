import { Col, Row, Space } from "antd";
import { WarningFilled } from "@ant-design/icons";

const AmountRow = ({label, value}) => (
    <Row style={{marginBottom:10}}>
        <Col span={24} lg={{span:16}} style={{paddingRight:15}}>{label}</Col>
        <Col span={24} lg={{span:8}} style={{paddingRight:15}}>₹ {Number(value).toLocaleString('en-IN', {minimumFractionDigits:2, maximumFractionDigits:2})}</Col>
    </Row>
);

const AmountSummary = ({data, voucherType}) => {
    const status = voucherType === 'Receipt' ? 'Received' : 'Paid';
    return (
        <Row justify={'end'} style={{textAlign:'right', margin:'30px 0'}}>
            <Col span={24} lg={{span:10}} style={{padding:'10px 0', borderRadius:'17px', 
                backgroundColor:'white'}}>
                <AmountRow label={`Amount ${status} :`} value={data.received}/>
                <AmountRow label='Amount used for Payments :' value={data.used}/>
                <AmountRow label={<><WarningFilled style={{color:'#f7525a'}}/> Amount in Excess :</>} 
                    value={data.received - data.used}/>
            </Col>
        </Row>
    );
};
export default AmountSummary;
