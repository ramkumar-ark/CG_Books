import { Button, Space, Typography, Dropdown } from "antd";
import { DownOutlined, EllipsisOutlined, PlusOutlined, InteractionTwoTone } from "@ant-design/icons"
import { Link } from "react-router-dom";
import { useGetCustomersQuery } from "../../service/mastersApi";
import CustomersTable from "./CustomersTable";
import { useGetSelectedOrgQuery } from "../../service/appApi";
import useAuthentication from "../../useAuthentication";
import { useContext, useEffect, useRef, useState } from "react";
import { useGetLedgerBalanceQuery } from "../../service/transactionsApi";

const { Title, Text } = Typography;

const Customers = () => {
    const [sortField, setSortField] = useState();
    const [filterField, setFilterField] = useState('All Customers');
    const {AuthCtx} = useAuthentication();
    const {user} = useContext(AuthCtx);
    const {data} = useGetSelectedOrgQuery(user.id);
    const selectedOrg = data?.selectedOrg;
    const {data: data1, refetch:refetch1} = useGetCustomersQuery(selectedOrg?.['_id'], {skip: !selectedOrg});
    const {data: data2, refetch:refetch2} = useGetLedgerBalanceQuery(selectedOrg?.['_id'], {skip: !selectedOrg});
    const customers = data1?.customers || [];
    let customersTableData = [];
    if (data1 && data2){
        customersTableData = customers.map(e => ({
            name:e.name, companyName:e.companyName, email:e.primaryContact?.email, 
            workPhone: e.primaryContact?.workPhone, receivables: data2[e.ledger['_id']], id:e['_id'],
            createdTime: new Date(e.createdOn), lastModifiedTime: new Date(e.lastUpdatedOn || e.createdOn), 
        }))
    }
    const headerRef = useRef(null);
    const sortfns = {
        name: (a,b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
        companyName: (a,b) => a.companyName?.toLowerCase().localeCompare(b.companyName?.toLowerCase()),
        receivables: (a,b) => a.receivables - b.receivables,
        createdTime: (a,b) => a.createdTime - b.createdTime,
        modifiedTime: (a,b) => a.lastModifiedTime - b.lastModifiedTime,
    }

    const childrenItems = [
        {label: <Link onClick={() => {setSortField('name')}}><Text>Name</Text></Link>, key:1},
        {label: <Text onClick={() => {setSortField('companyName')}}>Company Name</Text>, key:2},
        {label: <Text onClick={() => {setSortField('receivables')}}>Receivables</Text>, key:3},
        {label: <Text onClick={() => {setSortField('createdTime')}}>Created Time</Text>, key:4},
        {label: <Text onClick={() => {setSortField('modifiedTime')}}>Last Modified Time</Text>, key:5},
    ];
    
    const refetch = () => {
        refetch1();
        refetch2();
    };

    const items = [
        {label: <Text strong>SORT BY</Text>, key:0, type:'group', children:childrenItems},
        {type: 'divider'},
        {label: <Text onClick={() =>{refetch()}}>Refresh List</Text>, icon: <InteractionTwoTone style={{fontSize:"15px"}}/>,key:6},
    ];

    const filterOptions = [
        {label:'All Customers', key: 1},
        {label:'Active Customers', key: 2},
        {label:'Inactive Customers', key: 3},
        {label:'Overdue Customers', key: 4},
        {label:'Unpaid Customers', key: 5},
    ];

    const filterDropdownRender = (menu) => (
        <Text onClick={(event) => {setFilterField(event.target.innerText)}}>{menu}</Text>
    ); 

    useEffect(() => {
        customersTableData = customersTableData.sort(sortfns[sortField]);
    }, [sortField]);

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
        <div style={{borderBottom:"ridge", position:"sticky", top:0, zIndex:999, backgroundColor:"whitesmoke"}}
            ref={headerRef}>
            <div style={{textAlign:"left", margin:"0px 10px", display:"flex", justifyContent:"space-between" }}>
                <Dropdown trigger={['click']} menu={{items: filterOptions}} dropdownRender={filterDropdownRender}>
                        <Link onClick={(e) => e.preventDefault()}>
                            <Title level={3}>
                                {filterField}<DownOutlined style={{color:"#408dfb", fontSize:"15px"}}/>
                            </Title>
                        </Link>
                    </Dropdown>
                <Space>
                    <Link to="/app/home/customers/new">
                        <Button type="primary"><PlusOutlined />New</Button>
                    </Link>
                    <Dropdown trigger={['click']} menu={{items}}><Button><EllipsisOutlined /></Button></Dropdown>
                </Space>
            </div>
        </div>
        <CustomersTable data={customersTableData} offsetHeader={headerRef.current?.clientHeight+3}/>
        </>
    );
};

export default Customers;
