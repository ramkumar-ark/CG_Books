import { Button, Space, Typography, Dropdown } from "antd";
import { DownOutlined, EllipsisOutlined, PlusOutlined, InteractionTwoTone } from "@ant-design/icons"
import { Link } from "react-router-dom";
import { useGetCustomersQuery } from "../../service/mastersApi";
import CustomersTable from "./CustomersTable";

const { Title, Text } = Typography;

const childrenItems = [
    {label: <Text>Name</Text>, key:1},
    {label: <Text>Company Name</Text>, key:2},
    {label: <Text>Receivables</Text>, key:3},
    {label: <Text>Created Time</Text>, key:4},
    {label: <Text>Last Modified Time</Text>, key:5},
];

const items = [
    {label: <Text strong>SORT BY</Text>, key:0, type:'group', children:childrenItems},
    {type: 'divider'},
    {label: <Text>Refresh List</Text>, icon: <InteractionTwoTone style={{fontSize:"15px"}}/>,key:6},
];


const Customers = () => {
    const {data} = useGetCustomersQuery();
    let customers = [];
    if (data){
        console.log(data);
        customers = data.result;
    }
    if (customers.length === 0){
        return (
            <div style={{display:"flex", flexDirection:"column", placeContent:"space-around",minHeight:"70%"}}>
                <div>
                    <h3><i>"The customer's perception is your reality. Make every interaction count." </i>- Kate Zabriskie</h3>
                    <h2>Create and Manage your Customer all in one place.</h2>
                    <Link to="/app/home/customers/new">
                        <Button type="primary" size="large">Create Customer</Button>
                    </Link>
                </div>
            </div>
        );
    }
    return (
        <>
        <div style={{borderBottom:"ridge", position:"sticky", top:"64px", zIndex:999, backgroundColor:"whitesmoke"}}>
            <div style={{textAlign:"left", margin:"0px 10px", display:"flex", justifyContent:"space-between" }}>
                <Typography.Link><Title level={3}>Active Customers<DownOutlined style={{color:"#408dfb", fontSize:"15px"}}/></Title></Typography.Link>
                <Space>
                    <Link to="/app/home/customers/new">
                        <Button type="primary" href="/app/home/cutomers/new"><PlusOutlined />New</Button>
                    </Link>
                    <Dropdown trigger={['click']} menu={{items}}><Button><EllipsisOutlined /></Button></Dropdown>
                </Space>
            </div>
        </div>
        <CustomersTable/>
        </>
    );
};

export default Customers;