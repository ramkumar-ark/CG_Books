import React, { useEffect, useState } from "react";
import { Dropdown, Layout, Menu } from 'antd';
import { Link, useLocation } from "react-router-dom";
import UserDropDown from "./UserDropDown";

const { Header} = Layout;

const navItems = {
    login: [
        {label:"Home", link:""}, 
        {label:"Sign Up", link: "signup"}
    ],
    "": [
        {label:"Home", link:""}, 
        {label:"Features", link: "#"}, 
        {label:"Pricing", link: "#"}, 
        {label:"Contact", link: "#"}, 
        {label:"Sign In", link: "login", login:true}, 
        {label:"Sign Up", link: "signup", login:true}
    ],
    signup: [
        {label:"Home", link:""}, 
        {label:"Sign In", link: "login"}
    ],
    app:[
        {dd: true}
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
          mode="horizontal"
          // defaultSelectedKeys={['2']}
          items={navMenuItems.map(({label, link, login, dd}, index) => {
            if (login && user){
              if (label === "Sign In") 
                return {key: String(index + 1), label: <UserDropDown/>};
            }
            else if(dd){
                return {key: String(index + 1), label: <UserDropDown/>};
            }else{
              return {
                key: String(index + 1),
                label: (<Link to={'/' + link}>{label}</Link>),
              };
            }
          })}
        />
      </Header>
    );
};

export default AppHeader