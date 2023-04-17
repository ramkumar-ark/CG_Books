import { Row, Col, Typography } from 'antd';
import AddressDisplayCard from '../../Invoices/AddressDisplayCard';

const {Text} = Typography;

const DisplayAddress = ({entityData}) => {
    return (
        <Row style={{marginTop:20}}>
            <Col span={12} style={{padding:'0px 10px'}}>
                <Text type="secondary" strong>BILLING ADDRESS</Text>
                <AddressDisplayCard datas={entityData.addresses.filter((e) => e.type === "billing")
                    .slice(0,1)}/>
            </Col>
            <Col span={12} style={{padding:'0px 10px'}}>
                <Text type="secondary" strong>SHIPPING ADDRESS</Text>
                <AddressDisplayCard datas={entityData.addresses.filter((e) => e.type === "shipping")
                    .slice(0,1)}/>
            </Col>
        </Row>
    );
};

export default DisplayAddress;
