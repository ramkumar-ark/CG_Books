import { Switch, Route } from "react-router-dom";
import CreateBillPage from "./CreateBillPage";
import ViewAllBills from "./ViewAllBills";
import ViewBillPage from "./ViewBillPage";

const Bills = ({basePath}) => {
    return (
        <Switch>
            <Route exact path={basePath}>
                <ViewAllBills/>
            </Route>
            <Route path={`${basePath}/new`}>
                <CreateBillPage/>
            </Route>
            <Route exact path={`${basePath}/:transactionId`}>
                <ViewBillPage/>
            </Route>
            <Route path={`${basePath}/edit/:transactionId`}>
                <CreateBillPage/>
            </Route>
        </Switch>
    );
};

export default Bills;
