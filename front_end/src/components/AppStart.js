import { useContext, useEffect, useState } from "react";
import useAuthentication from "../useAuthentication";
import { Redirect } from "react-router-dom";
import getOrgsOfUsers from "../service/getOrgsOfUsers";
import { Spin } from "antd";

const AppStart = () => {
    const {AuthCtx} = useAuthentication();
    const {user} = useContext(AuthCtx);
    const [organizations, setOrganizations] =useState();
    const [defaultOrganization, setDefaultOrganization] = useState();

    useEffect(() => {
        getOrgsOfUsers(user.id)
            .then((res) => {
                setOrganizations(res.organizations);
                setDefaultOrganization(res.defaultOrganization);
            })
            .catch((error) => {console.log(error)});
    }, []);
    if (organizations === undefined && defaultOrganization === undefined)
        return <Spin loading={true} size="large"/>;
    if (organizations.length === 0)
        return <Redirect to={{pathname:"/app/createorg", state:{from: "/"}}}/>;
    if (defaultOrganization === null){
        return <h1>Company Selection Page</h1>;
    }
    return (
        <h1>Dashboard Page</h1>
    );
};

export default AppStart;