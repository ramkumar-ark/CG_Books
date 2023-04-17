import {Layout} from "antd";
import { Switch, Route, useHistory } from "react-router-dom";
import SiderNavMenu from "./SiderNavMenu";
import Dashboard from "./dashboard/Dashboard";
import ChartOfAccounts from "./chartOfAccounts/ChartOfAccounts";
import { useEffect, useState } from "react";
import Customers from "./customers/Customers";
import CreateCustomer from "./customers/CreateCustomer";
import Invoices from "./Invoices/Invoices";
import SingleInvoiceView from "./Invoices/SingleInvoiceView";
import CreateInvoice from "./Invoices/CreateInvoice";
import SingleCustomerView from "./customers/SingleCustomerView";
import Banking from "./banking/Banking";
import AddBank from "./banking/AddBank";
import PaymentsReceived from "./paymentsReceived/PaymentsReceived";
import Vendors from "./vendors/Vendors";
import Bills from "./bills/bills";
import useGetViewPortHeight from "../hooks/useGetViewPortHeight";
import PaymentsMade from "./paymentsMade/paymentsMade";

const {Content, Header} = Layout;

export default () =>{
    const history = useHistory();
    const [isSiderCollapsed, setIsSiderCollapsed] = useState(false);
    const viewportHeight = useGetViewPortHeight();
    useEffect(() =>{
        if(window.location.pathname === '/app/home'){
        setTimeout(() => {window.location.reload()}, 1000);
        history.replace('/app/home/dashboard');
    }
    }, [])
    return (
        <Layout hasSider>
            <SiderNavMenu onCollapse={(value) => setIsSiderCollapsed(value)}/>
            <Layout className="site-layout" style={{marginLeft: isSiderCollapsed ? "50px" : "200px", 
                height:viewportHeight-64}}>
                <Content style={{position:'sticky', top:'0px', overflow:'auto', height:viewportHeight-64}}>
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
                        <Route path='/app/home/vendors'>
                            <Vendors basePath='/app/home/vendors'/>
                        </Route>
                        <Route path='/app/home/bills'>
                            <Bills basePath='/app/home/bills'/>
                        </Route>
                        <Route path='/app/home/paymentsmade'>
                            <PaymentsMade basePath='/app/home/paymentsmade'/>
                        </Route>
                    </Switch>
                </Content>
            </Layout>
        </Layout>
    );
};