import { Switch, Route } from "react-router-dom";
import RecordReceipt from "./RecordReceipt";
import ViewAllReceipts from "./ViewAllReceipts";
import ViewReceipt from "./ViewReceipt";


const PaymentsReceived = ({basePath}) => {
    return (
        <Switch>
            <Route exact path={basePath}>
                <ViewAllReceipts/>
            </Route>
            <Route path={`${basePath}/new`}>
                <RecordReceipt/>
            </Route>
            <Route exact path={`${basePath}/:transactionid`}>
                <ViewReceipt/>
            </Route>
            <Route path={`${basePath}/edit/:transactionid`}>
                <RecordReceipt edit={true} />
            </Route>
        </Switch>
    );
};

export default PaymentsReceived;
