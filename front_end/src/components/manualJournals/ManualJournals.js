import { Switch, Route } from "react-router-dom";
import CreateJournal from "./CreateJournal";
import ViewAllJournals from "./ViewAllJournals";
import ViewJournal from "./ViewJournal";


const ManualJournals = ({basePath}) => {
    return (
        <Switch>
            <Route exact path={basePath}>
                <ViewAllJournals/>
            </Route>
            <Route path={`${basePath}/new`}>
                <CreateJournal/>
            </Route>
            <Route exact path={`${basePath}/:transactionId`}>
                <ViewJournal/>
            </Route>
            <Route path={`${basePath}/edit/:transactionId`}>
                <CreateJournal/>
            </Route>
        </Switch>
    );
};

export default ManualJournals;
