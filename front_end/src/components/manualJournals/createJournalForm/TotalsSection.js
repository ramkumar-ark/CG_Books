import { Col, Row, Space, Typography } from "antd";

const {Text} = Typography;

const TotalsSection = ({totalAmounts}) => {
    return (
        <Row>
            <Col lg={{span:15, offset:9}} span={24}>
                <div style={{width:'100%', backgroundColor:'white', paddingRight:50}}>
                    <div style={{display:'flex', justifyContent:'flex-start', alignItems:'center'}}>
                        <div style={{flex:'50%', padding:10}}><Text>Sub Total</Text></div>
                        <div style={{flex:'25%', textAlign:'right', padding:'10px 15px'}}><Text type="secondary">
                            {totalAmounts.debit.toLocaleString('en-IN', {minimumFractionDigits:2})}
                        </Text></div>
                        <div style={{flex:'25%', textAlign:'right', padding:'10px 15px'}}><Text type="secondary">
                            {totalAmounts.credit.toLocaleString('en-IN', {minimumFractionDigits:2})}
                        </Text></div>
                    </div>
                    <div style={{display:'flex', justifyContent:'flex-start', alignItems:'center'}}>
                        <div style={{flex:'50%', padding:10}}><Text style={{fontSize:18}} strong>Total {'(₹)'}</Text></div>
                        <div style={{flex:'25%', textAlign:'right', padding:'10px 15px'}}><Text style={{fontSize:18}} strong>
                            {totalAmounts.debit.toLocaleString('en-IN', {minimumFractionDigits:2})}
                        </Text></div>
                        <div style={{flex:'25%', textAlign:'right', padding:'10px 15px'}}><Text style={{fontSize:18}} strong>
                            {totalAmounts.credit.toLocaleString('en-IN', {minimumFractionDigits:2})}
                        </Text></div>
                    </div>
                    <div style={{display:'flex', justifyContent:'flex-start', alignItems:'center'}}>
                        <div style={{flex:'50%', padding:10}}><Text type="danger">Difference</Text></div>
                        <div style={{flex:'25%', textAlign:'right', padding:'10px 15px'}}><Text type="danger">
                            {totalAmounts.difference.debit.toLocaleString('en-IN', {minimumFractionDigits:2})}
                        </Text></div>
                        <div style={{flex:'25%', textAlign:'right', padding:'10px 15px'}}><Text type="danger">
                            {totalAmounts.difference.credit.toLocaleString('en-IN', {minimumFractionDigits:2})}
                        </Text></div>
                    </div>
                </div>
            </Col>
        </Row>
    );
};

export default TotalsSection;
