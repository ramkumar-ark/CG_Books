import { useContext } from "react";
import useAuthentication from "../useAuthentication";
import { Redirect } from "react-router-dom";

const AppStart = () => {
    const {AuthCtx} = useAuthentication();
    const {user} = useContext(AuthCtx);
    const organizationId = null;
    if (organizationId === null)
        return <Redirect to={{pathname:"/app/createorg", state:{from: "/"}}}/>;
    return (
        <h1>App Start Page</h1>
    );
};

export default AppStart;