import { useContext, useEffect, useState } from "react";
import useAuthentication from "../useAuthentication";
import { Switch, Route, useHistory } from "react-router-dom";
import getOrgsOfUsers from "../service/getOrgsOfUsers";
import { Spin } from "antd";
import CreateOrganization from "./createOrganization/CreateOrganization";
import AppHome from "./AppHome";

const AppStart = () => {
    const {AuthCtx} = useAuthentication();
    const {user} = useContext(AuthCtx);
    const [organizations, setOrganizations] =useState();
    const [defaultOrganization, setDefaultOrganization] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    useEffect(() => {
        setIsLoading(true);
        getOrgsOfUsers(user.id)
            .then((res) => {
                setIsLoading(false);
                setOrganizations(res.organizations);
                setDefaultOrganization(res.defaultOrganization);
            })
            .catch((error) => {console.log(error)});
    }, []);

    useEffect(() => {
        organizations?.length === 0 && history.replace({pathname:"/app/createorg"});
        defaultOrganization === null && history.replace({pathname:"/app/selectorg"});
        (window.location.pathname === "/app" && defaultOrganization) 
            && history.replace({pathname:"/app/home"});    
    }, [defaultOrganization]);

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
        </Spin>
    );
};

export default AppStart;
