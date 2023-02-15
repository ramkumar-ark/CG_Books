import { useContext, useEffect, useState } from "react";
import useAuthentication from "../useAuthentication";
import { Redirect, Switch, Route, useHistory, useLocation } from "react-router-dom";
import getOrgsOfUsers from "../service/getOrgsOfUsers";
import { Spin } from "antd";
import CreateOrganization from "./createOrganization/CreateOrganization";
import AppHome from "./AppHome";

const AppStart = () => {
    const {AuthCtx} = useAuthentication();
    const {user} = useContext(AuthCtx);
    const [organizations, setOrganizations] =useState();
    const [defaultOrganization, setDefaultOrganization] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();
    const location = useLocation();
    const {from} = (location && location.state) || {from: {pathname: "/"}};

    useEffect(() => {
        getOrgsOfUsers(user.id)
            .then((res) => {
                setIsLoading(false);
                setOrganizations(res.organizations);
                setDefaultOrganization(res.defaultOrganization);
            })
            .catch((error) => {console.log(error)});
    }, []);

    // useEffect(() => {
    //     console.log(from);
    //     organizations?.length === 0 && <Redirect to={{pathname:"/app/createorg", state:{from: "/"}}}/>;
    //     defaultOrganization === null && <Redirect to={{pathname:"/app/selectorg", state:{from: "/"}}}/>;
    //     defaultOrganization && history.replace({pathname:"/app/home"});
    // }, [defaultOrganization]);

    return (
        <Spin spinning={isLoading} size="large">
        <Switch>
            <Route path="/app/createorg">
                <CreateOrganization/>
            </Route>
            <Route path="/app/selectorg">
                <h1>Select Company.</h1>
                {/* <SelectOrganization/> */}
            </Route>
            <Route path="/app/home">
                <AppHome/>
            </Route>
        </Switch>
        
        {organizations?.length === 0 && <Redirect to={{pathname:"/app/createorg", state:{from: "/"}}}/>}
        {defaultOrganization === null && <Redirect to={{pathname:"/app/selectorg", state:{from: "/"}}}/>}
        {defaultOrganization && <Redirect to={{pathname:"/app/home", state:{from: "/"}}}/>}
        </Spin>
    );
};

export default AppStart;