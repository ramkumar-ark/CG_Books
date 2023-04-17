import React, { useEffect, useState } from "react";
import { Dropdown, Layout, Menu, Typography } from 'antd';
import { Link, useLocation } from "react-router-dom";
import UserDropDown from "./UserDropDown";
import OrgDropDown from "./OrgDropDown";

const { Header} = Layout;

const scrollToElement = (elementId) => {
  const element = document.getElementById(elementId);
  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const navItems = {
    login: [
        {label:<Link to='/'>Home</Link>}, 
        {label:<Link to='/signup'>Sign Up</Link>}
    ],
    "": [
        {label:<Typography.Link onClick={() => {scrollToElement(`homeSection`)}}>Home</Typography.Link>}, 
        {label:<Typography.Link onClick={() => {scrollToElement(`featuresSection`)}}>Features</Typography.Link>}, 
        {label:<Typography.Link onClick={() => {scrollToElement(`pricingSection`)}}>Pricing</Typography.Link>}, 
        {label:<Typography.Link onClick={() => {scrollToElement(`contactSection`)}}>Contact</Typography.Link>, link: "#"}, 
        {label:<Link to='/login'>Sign In</Link>, login:true}, 
        {label:<Link to='/signup'>Sign Up</Link>, login:true}
    ],
    signup: [
      {label:<Link to='/'>Home</Link>}, 
      {label:<Link to='/login'>Sign In</Link>}
    ],
    app:[
        {dd: true, name: "user"},
        {dd: true, name: "org"}
    ]
};

const AppHeader = ({user}) => {
    const location = useLocation();
    const [navMenuItems, setNavMenuItems] = useState(navItems[""]);
    

    useEffect(() => {
        let option = location.pathname.split('/')[1];
        setNavMenuItems(navItems[option]);
    });

    
    return (
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          backgroundColor: "royalblue",
        }}
      >
        <div
          style={{
            float: 'left',
            width: 120,
            height: 31,
            margin: '16px 24px 16px 0',
            color: '#e0f4ac',
            // background: 'rgba(255, 255, 255, 0.2)',
          }}
        ><h1 style={{margin: '0px', lineHeight: 'normal'}}>CG BOOKS</h1></div>
        <Menu
          style={{
            justifyContent: "flex-end",
            backgroundColor: "royalblue",
            color: '#FFFFFF',
            fontWeight: 'bold',
          }}  
          selectable={false}
          mode="horizontal"
          // defaultSelectedKeys={['2']}
          items={navMenuItems?.map(({label, login, dd, name}, index) => {
            if (login && user){
              if (label === "Sign In") 
                return {key: String(index + 1), label: <UserDropDown/>};
            }
            else if(dd){
                if (name==="user") return {key: String(index + 1), label: <UserDropDown/>};
                if (name==="org") return {key: String(index + 1), label: <OrgDropDown/>};
            }else{
              return {
                key: String(index + 1),
                label: label,
              };
            }
          })}
        />
      </Header>
    );
};

export default AppHeader