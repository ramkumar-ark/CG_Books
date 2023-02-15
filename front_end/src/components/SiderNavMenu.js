import { SolutionOutlined, PieChartOutlined, ShoppingCartOutlined, ShoppingOutlined, BankOutlined, WalletOutlined, BarChartOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
const { Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem(<Link to="/app/home/dashboard">Dashboard</Link>, '1', <PieChartOutlined />),
  getItem('Items', '2', <ShoppingOutlined />),
  getItem('Banking', '3', <BankOutlined />),
  getItem('Sales', 'sub1', <ShoppingCartOutlined />, [
    getItem('Customers', '4'),
    getItem('Invoices', '5'),
    getItem('Payments Received', '6'),
    getItem('Credit Notes', '7'),
  ]),
  getItem('Purchases', 'sub2', <WalletOutlined />, [
    getItem('Vendors', '8'), 
    getItem('Bills', '9'),
    getItem('Payments Made', '10'),
    getItem('Debit Notes', '11'),
]),
  getItem('Accountant', 'sub3', <SolutionOutlined />, [
    getItem('Manual Journals', '12'),
    getItem('Chart of Accounts', '13'),
  ]),
  getItem('Reports', '14', <BarChartOutlined/>)
];

const SiderNavMenu = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Sider 
            collapsible 
            collapsed={collapsed} 
            onCollapse={(value) => setCollapsed(value)}
            style={{overflow:'auto', height:'80vh', position:'fixed', left:0, backgroundColor:"#f7f7fe"}}
        >
        <Menu defaultSelectedKeys={['1']} mode="inline" items={items} style={{backgroundColor:"#f7f7fe", textAlign:"start"}} />
      </Sider>
    );
}

export default SiderNavMenu;
