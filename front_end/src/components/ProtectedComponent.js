import React from "react";
import {Route, Redirect} from "react-router-dom";

const ProtectedComponent = ({user, children, ...rest}) => {
    return (
        <Route {...rest}
            render={({location}) => user ? (children) : 
                (<Redirect to={{pathname:"/login", state:{from:location}}}/>)}
        />
    );
};

export default ProtectedComponent;
