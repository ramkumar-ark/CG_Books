import { Switch, Route } from "react-router-dom";
import BankingHomePage from "./BankingHomePage";
import AddBank from "./AddBank";
import EditAccount from "./EditAccount";

const Banking = ({basePath}) => (
    <Switch>
        <Route exact path={basePath}>
            <BankingHomePage/>
        </Route>
        <Route path={`${basePath}/new`}>
            <AddBank/>
        </Route>
        <Route exact path={`${basePath}/edit/:bankDetailsId`}>
            <AddBank/>
        </Route>
        <Route path={`${basePath}/edit/cashaccount/:ledgerId`}>
            <EditAccount/>
        </Route>
        <Route path={`${basePath}/:bankDetailsId`}>
            <h1>View Bank Account</h1>
        </Route>
    </Switch>
);

export default Banking;