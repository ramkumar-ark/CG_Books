import { Typography, Space } from "antd";
import { ContainerOutlined, CarOutlined } from "@ant-design/icons";
import AddressDisplayCard from "./AddressDisplayCard";

const { Text } = Typography;

const AddressDisplayTab = ({data}) => {
    const billingAddresses = data.filter(e => e.type === "billing");
    const shippingAddresses = data.filter(e => e.type === "shipping");
    return (
        <div>
            <Space direction="vertical">
                <Space size="middle">
                    <ContainerOutlined style={{color:"green"}}/>
                    <Text strong>BILLING ADDRESS</Text>
                </Space>
                <Space direction="vertical" style={{paddingLeft:"30px"}}>
                    {billingAddresses ? <AddressDisplayCard datas={billingAddresses}/>
                            :<Text type="secondary" strong>No Billing Address</Text>} 
                </Space>
                <Space size="middle">
                    <CarOutlined style={{color:"orange"}}/>
                    <Text strong>SHIPPING ADDRESS</Text>
                </Space>
                <Space direction="vertical" style={{paddingLeft:"30px"}}>
                    {shippingAddresses ? <AddressDisplayCard datas={shippingAddresses}/>
                            :<Text type="secondary" strong>No Shipping Address</Text>}
                </Space>
            </Space>
        </div>
    );
};

export default AddressDisplayTab;
