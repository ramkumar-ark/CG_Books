import { useContext, useEffect, useState } from "react";
import useAuthentication from "../useAuthentication";
import { Switch, Route, useHistory } from "react-router-dom";
import { Spin } from "antd";
import CreateOrganization from "./createOrganization/CreateOrganization";
import AppHome from "./AppHome";
import { useGetSelectedOrgQuery, useGetUserOrgsQuery } from "../service/appApi";

const AppStart = () => {
    const {AuthCtx} = useAuthentication();
    const {user} = useContext(AuthCtx);
    let organizations, selectedOrg;
    const {data, isLoading: isLoading1} = useGetUserOrgsQuery(user.id);
    if (data) organizations = data.organizations;
    const {data: data1, isLoading: isLoading2, isError} = useGetSelectedOrgQuery(user.id);
    if (data1) selectedOrg = data1.selectedOrg;
    console.log(selectedOrg);
    const isLoading = [isLoading1, isLoading2];
    const history = useHistory();

    useEffect(() => {
        organizations?.length === 0 && history.replace({pathname:"/app/createorg"});
        (selectedOrg === null && organizations?.length > 0)
            && history.replace({pathname:"/app/selectorg"});
        selectedOrg === null && history.replace({pathname:"/app/createorg"});
        (window.location.pathname === "/app" && selectedOrg) 
            && history.replace({pathname:"/app/home"});    
    }, [selectedOrg, history, organizations]);

    return (
        <Spin spinning={isLoading.includes(true)} size="large">
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
