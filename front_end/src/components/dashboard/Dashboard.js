import { useContext } from "react";
import useAuthentication from "../../useAuthentication";
import { Redirect } from "react-router-dom";

const Dashboard = () => {
    const {AuthCtx} = useAuthentication();
    const {user} = useContext(AuthCtx);
    const organizationId = user.defaultOrganization;

    if (organizationId === null)
        return <Redirect to={{pathname:"/app", state:{from: "/"}}}/>;
    return (
        <h1>Dashboard</h1>
    );
};

export default Dashboard;