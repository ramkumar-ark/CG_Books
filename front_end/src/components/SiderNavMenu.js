import { SolutionOutlined, PieChartOutlined, ShoppingCartOutlined, ShoppingOutlined, BankOutlined, WalletOutlined, BarChartOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
const { Sider } = Layout;
const keyObj = {
  dashboard:1, items:2, banking:3, customers:4, invoices:5, paymentsreceived:6, creditnotes:7, 
  vendors:8, bills:9, paymentsmade:10, debitnotes:11, manualjournals:12, chartofaccounts:13, reports:14,
}
function getOpenendMenuKey(key){
  if (key>3 && key<8) return ['sub1'];
  else if (key>7 && key<12) return ['sub2'];
  else if (key>11 && key <14) return ['sub3'];
  else return [];
}
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
  // getItem(<Link to="/app/home/dashboard">Items</Link>, '2', <ShoppingOutlined />),
  getItem(<Link to="/app/home/banking">Banking</Link>, '3', <BankOutlined />),
  getItem('Sales', 'sub1', <ShoppingCartOutlined />, [
    getItem(<Link to="/app/home/customers">Customers</Link>, '4'),
    getItem(<Link to="/app/home/invoices">Invoices</Link>, '5'),
    getItem(<Link to="/app/home/paymentsreceived">Payments Received</Link>, '6'),
    // getItem('Credit Notes', '7'),
  ]),
  getItem('Purchases', 'sub2', <WalletOutlined />, [
    getItem(<Link to="/app/home/vendors">Vendors</Link>, '8'), 
    getItem(<Link to="/app/home/bills">Bills</Link>, '9'),
    getItem(<Link to="/app/home/paymentsmade">Payments Made</Link>, '10'),
    // getItem('Debit Notes', '11'),
]),
  getItem('Accountant', 'sub3', <SolutionOutlined />, [
    getItem(<Link to="/app/home/manualjournals">Manual Journals</Link>, '12'),
    getItem(<Link to="/app/home/chartofaccounts">Chart Of Accounts</Link>, '13'),
  ]),
  // getItem('Reports', '14', <BarChartOutlined/>)
];

const SiderNavMenu = ({onCollapse}) => {
    const initState = () => {
      let option = window.location.pathname.split('/')[3];
      if (keyObj[option]) 
        return {
          selected: String(keyObj[option]),
          expanded: getOpenendMenuKey(keyObj[option])
        }
      return {
        selected: '1',
        expanded: []
      }
    };
    const [collapsed, setCollapsed] = useState(false);
    const selection = initState();
    
    return (
        <Sider 
            collapsible 
            collapsed={collapsed} 
            onCollapse={(value) => {
              setCollapsed(value);
              onCollapse(!collapsed);
            }}
            collapsedWidth={50}
            style={{overflow:'auto', height:520, position:'fixed', left:0, backgroundColor:"#f7f7fe"}}
        >
        <Menu defaultSelectedKeys={[selection.selected]} defaultOpenKeys={selection.expanded} mode="inline" items={items} style={{backgroundColor:"#f7f7fe", textAlign:"start"}} />
      </Sider>
    );
}

export default SiderNavMenu;
