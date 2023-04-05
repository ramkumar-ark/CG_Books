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
import Banking from "./banking/Banking";
import AddBank from "./banking/AddBank";
import RecordReceipt from "./paymentsReceived/RecordReceipt";
import PaymentsReceived from "./paymentsReceived/PaymentsReceived";

const {Content, Header} = Layout;

export default () =>{
    const [isSiderCollapsed, setIsSiderCollapsed] = useState(false);
    return (
        <Layout style={{ minHeight: '89.75vh',}} hasSider>
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
                        <Route path='/app/home/customers/edit/:entityId'>
                            <CreateCustomer/>
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
                        <Route exact path='/app/home/banking'>
                            <Banking/>
                        </Route>
                        <Route path='/app/home/banking/new'>
                            <AddBank/>
                        </Route>
                        <Route path='/app/home/paymentsreceived'>
                            <PaymentsReceived basePath='/app/home/paymentsreceived'/>
                        </Route>
                    </Switch>
                </Content>
            </Layout>
        </Layout>
    );
};