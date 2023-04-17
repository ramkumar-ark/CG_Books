import { Tabs } from "antd";
import OverviewTab from "./OverviewTab";
import StatementTab from "./StatementTab";
import useGetViewPortHeight from "../../hooks/useGetViewPortHeight";
import { useEffect, useState } from "react";

const VendorTabView = ({customer, organization, headerRef}) => {
    const viewPortHeight = useGetViewPortHeight();
    const [height, setHeight] = useState(viewPortHeight - headerRef.current?.getBoundingClientRect().bottom - 2);
    useEffect(() => {
        setHeight(viewPortHeight - headerRef.current?.getBoundingClientRect().bottom - 2);
    }, [headerRef, viewPortHeight]);
    const tabItems = [
        {key:'1', label:'Overview', children:<OverviewTab entity={customer}/>},
        {key:'2', label:'Transactions', children:'Contents of Transactions Tab'},
        {key:'3', label:'Statement', children:<StatementTab entity={customer} organization={organization}/>},
    ];
    return (
        <Tabs 
            defaultActiveKey="1" 
            items={tabItems}
            size='small' 
            tabBarStyle={{position:'sticky', top:-1,
                backgroundColor:"whitesmoke", zIndex:99, paddingLeft:'10px', marginBottom:0}}
            style={{overflow:'auto', height}}
        />
    );
};

export default VendorTabView;
