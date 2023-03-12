import {Layout} from "antd";
import { Switch, Route } from "react-router-dom";
import SiderNavMenu from "./SiderNavMenu";
import Dashboard from "./dashboard/Dashboard";
import ChartOfAccounts from "./chartOfAccounts/ChartOfAccounts";
import { useState } from "react";
import Customers from "./customers/Customers";
import CreateCustomer from "./customers/CreateCustomer";
import Invoices from "./Invoices/Invoices";
import SingleInvoiceView from "./Invoices/SingleInvoiceView";
import CreateInvoice from "./Invoices/CreateInvoice";
import SingleCustomerView from "./customers/SingleCustomerView";

const {Content, Header} = Layout;

export default () =>{
    const [isSiderCollapsed, setIsSiderCollapsed] = useState(false);
    return (
        <Layout style={{ minHeight: '100vh',}} hasSider>
            <SiderNavMenu onCollapse={(value) => setIsSiderCollapsed(value)}/>
            <Layout className="site-layout" style={{marginLeft: isSiderCollapsed ? "50px" : "200px"}}>
                <Content >
                    <Switch>
                        <Route exact path="/app/home">
                            <h1>Welcome User</h1>
                        </Route>
                        <Route path={`/app/home/dashboard`}>
                            <Dashboard/>
                        </Route>
                        <Route path={`/app/home/chartofaccounts`}>
                            <ChartOfAccounts/>
                        </Route>
                        <Route exact path='/app/home/customers'>
                            <Customers/>
                        </Route>
                        <Route path='/app/home/customers/new'>
                            <CreateCustomer/>
                        </Route>
                        <Route path='/app/home/customers/view/:entityId'>
                            <SingleCustomerView/>
                        </Route>
                        <Route exact path='/app/home/invoices'>
                            <Invoices/>
                        </Route>
                        <Route path='/app/home/invoices/new'>
                            <CreateInvoice/>
                        </Route>
                        <Route path='/app/home/invoices/view/:transactionId'>
                            <SingleInvoiceView/>
                        </Route>
                        <Route path='/app/home/invoices/edit/:transactionId'>
                            <CreateInvoice/>
                        </Route>
                    </Switch>
                </Content>
            </Layout>
        </Layout>
    );
};