import { Switch, Route } from "react-router-dom";
import RecordPaymentMade from "./RecordPaymentMade";
import ViewAllPayments from "./ViewAllPayments";
import ViewPaymentPage from "./ViewPaymentPage";

const PaymentsMade = ({basePath}) => {
    return (
        <Switch>
            <Route exact path={basePath}>
                <ViewAllPayments/>
            </Route>
            <Route path={`${basePath}/new`}>
                <RecordPaymentMade/>
            </Route>
            <Route exact path={`${basePath}/:transactionId`}>
                <ViewPaymentPage/>
            </Route>
            <Route path={`${basePath}/edit/:transactionId`}>
                <RecordPaymentMade/>
            </Route>
        </Switch>
    );
};

export default PaymentsMade;
