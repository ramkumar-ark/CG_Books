import {Layout} from "antd";
import { Switch, Route } from "react-router-dom";
import SiderNavMenu from "./SiderNavMenu";
import Dashboard from "./dashboard/Dashboard";

const {Content} = Layout;

export default () =>{
    return (
        <Layout style={{ minHeight: '100vh',}} hasSider>
            <SiderNavMenu/>
            <Layout>
                <Content>
                    <Switch>
                        <Route exact path="/app/home">
                            <h1>Welcome User</h1>
                        </Route>
                        <Route path={`/app/home/dashboard`}>
                            <Dashboard/>
                        </Route>
                    </Switch>
                </Content>
            </Layout>
        </Layout>
    );
};