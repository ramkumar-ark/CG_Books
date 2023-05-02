import { Select } from "antd";
import Header from "../Header";
import Chart from "./Chart";
import Footer from "./Footer";
import useGetData from "./useGetData";
import { periodOptions2 as periodOptions } from "../periodData";
const IncomeAndExpenseChart = () => {
    const [data, onPeriodChange] = useGetData();
    return (
        <div style={{margin:'20px 15px 40px', border:'1px solid #ebeaf2', borderRadius:10,
        backgroundColor:'#fff'}}>
            <Header title='Income And Expense'
                dropDownComponent={
                <Select options={periodOptions} bordered={false} defaultValue='ltm' onChange={onPeriodChange} style={{width:161}}/>}
                toolTip='Displays total sales and expenses for the period' />
            {data && <Chart data={data?.chartData}/>}
            {data && <Footer {...data?.otherData}/>}
        </div>
    );
};

export default IncomeAndExpenseChart;
