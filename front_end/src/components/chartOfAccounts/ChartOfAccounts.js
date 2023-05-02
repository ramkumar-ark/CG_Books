import { Switch, Route } from "react-router-dom";
import ViewAllAccounts from "./ViewAllAccounts";
import ViewAccountPage from "./ViewAccountPage";

const Bills = ({basePath}) => {
    return (
        <Switch>
            <Route exact path={basePath}>
                <ViewAllAccounts/>
            </Route>
            <Route exact path={`${basePath}/:ledgerId`}>
                <ViewAccountPage/>
            </Route>
        </Switch>
    );
};

export default Bills;
