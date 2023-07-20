import { Switch, Route} from 'react-router-dom';
import ReportsHomePage from './ReportsHomePage';
import './styles.css';
import IncomeStatement from './IncomeStatement';

const Reports = ({basePath}) => {
    return (
        <Switch>
            <Route exact path={basePath}>
                <ReportsHomePage/>
            </Route>
            <Route path={basePath + '/incomestatement'}>
                <IncomeStatement/>
            </Route>
        </Switch>
    );
};

export default Reports
