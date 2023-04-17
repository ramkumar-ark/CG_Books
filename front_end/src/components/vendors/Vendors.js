import { Switch, Route } from "react-router-dom";
import CreateVendorPage from "./CreateVendorPage";
import ViewAllVendors from "./ViewAllVendors";
import ViewVendorPage from "./ViewVendorPage";

const Vendors = ({basePath}) => {
    return (
        <Switch>
            <Route exact path={basePath}>
                <ViewAllVendors/>
            </Route>
            <Route path={`${basePath}/new`}>
                <CreateVendorPage/>
            </Route>
            <Route exact path={`${basePath}/:entityId`}>
                <ViewVendorPage/>
            </Route>
            <Route path={`${basePath}/edit/:entityId`}>
                <CreateVendorPage/>
            </Route>
        </Switch>
    );
};

export default Vendors;
