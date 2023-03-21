import { useState } from "react";
import { Typography, Space, Button, Dropdown } from "antd";
import { DownOutlined, PlusOutlined, EllipsisOutlined, InteractionTwoTone } from "@ant-design/icons";
import { Link, Route, Switch } from "react-router-dom";
import InvoiceTable from "./InvoiceTable";

const { Title, Text } = Typography;

const childrenItems = [
    {label: <Text>Created Time</Text>, key:1},
    {label: <Text>Last Modified Time</Text>, key:2},
    {label: <Text>Date</Text>, key:3},
    {label: <Text>Invoice Number</Text>, key:4},
    {label: <Text>Customer Name</Text>, key:5},
    {label: <Text>Due Date</Text>, key:6},
    {label: <Text>Amount</Text>, key:7},
    {label: <Text>Balance Due</Text>, key:8},
];

const items = [
    {label: <Text strong>SORT BY</Text>, key:0, type:'group', children:childrenItems},
    {type: 'divider'},
    {label: <Text>Refresh List</Text>, icon: <InteractionTwoTone style={{fontSize:"15px"}}/>,key:9},
];

const Invoices = () => {
    const [filterField, setFilterField] = useState('All')

    const items1 = [
        {label: 'All', key:11},
        {label: 'Draft', key:12},
        {label: 'Unpaid', key:13},
        {label: 'Paid', key:14},
        {label: 'Partially Paid', key:15},
        {label: 'Overdue', key:16},
    ];

    const filterDropdownRender = (menu) => (
        <Text onClick={(event) => {setFilterField(event.target.innerText)}}>{menu}</Text>
    ); 

    return (
        <>
            <div style={{borderBottom:"ridge", position:"sticky", top:"64px", zIndex:999, backgroundColor:"whitesmoke"}}>
                <div style={{textAlign:"left", margin:"0px 10px", display:"flex", justifyContent:"space-between" }}>
                    <Dropdown trigger={['click']} menu={{items: items1}} dropdownRender={filterDropdownRender}>
                        <Link onClick={(e) => e.preventDefault()}>
                            <Title level={3}>
                                {filterField} Invoices <DownOutlined style={{color:"#408dfb", fontSize:"15px"}}/>
                            </Title>
                        </Link>
                    </Dropdown>
                    <Space>
                        <Link to="/app/home/invoices/new">
                            <Button type="primary"><PlusOutlined />New</Button>
                        </Link>
                        <Dropdown trigger={['click']} menu={{items}}><Button><EllipsisOutlined /></Button></Dropdown>
                    </Space>
                </div>
            </div>
            <InvoiceTable/>
        </>        
    );
};

export default Invoices;
