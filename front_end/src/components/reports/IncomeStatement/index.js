import Header from "./Header";
import StatementView from "./StatementView";

const IncomeStatement = () => {
    return (
        <>
            <Header/>
            <StatementView data={{income: [{name:'Sales', balance:235000}]}}/>
        </>
    );
};

export default IncomeStatement;
