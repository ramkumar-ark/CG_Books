import { Select } from "antd";
import Header from "../Header";
import Chart from "./Chart";
import {periodOptions3 as periodOptions} from "../periodData";
import useGetData from "./useGetData";

const TopExpensesChart = () => {
    const [chartData, onPeriodChange] = useGetData();
    return (
        <div style={{margin:'20px 15px 40px', border:'1px solid #ebeaf2', borderRadius:10,
            backgroundColor:'#fff'}}>
            <Header title='Your Top expenses'
                dropDownComponent={
                  <Select options={periodOptions} bordered={false} defaultValue='cfy' onChange={onPeriodChange} style={{width:161}}/>}
                toolTip='Top Expenses accross various categories for the chosen period.' />
            {chartData && <Chart data={chartData}/>}
        </div>
    );
};

export default TopExpensesChart;
