import { Switch, Route } from "react-router-dom";
import ViewAllReceipts from "./ViewAllReceipts";
import ViewReceipt from "./ViewReceipt";
import RecordPaymentReceived from "./RecordPaymentReceived";


const PaymentsReceived = ({basePath}) => {
    return (
        <Switch>
            <Route exact path={basePath}>
                <ViewAllReceipts/>
            </Route>
            <Route path={`${basePath}/new`}>
                <RecordPaymentReceived />
            </Route>
            <Route exact path={`${basePath}/:transactionId`}>
                <ViewReceipt/>
            </Route>
            <Route path={`${basePath}/edit/:transactionId`}>
                <RecordPaymentReceived />
            </Route>
        </Switch>
    );
};

export default PaymentsReceived;
