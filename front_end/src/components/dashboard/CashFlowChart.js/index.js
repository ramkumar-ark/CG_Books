import { Col, Row, Select } from "antd";
import Header from "../Header";
import Chart from "./Chart";
import BalanceComputation from "./BalanceComputation";
import useGetData from "./useGetData";
import { periodOptions } from "../periodData";

const CashFlowChart = () => {
    const [data, onPeriodChange] = useGetData();
    return (
        <div style={{margin:'40px 15px 0px', backgroundColor:'white', border:'1px solid #ebeaf2', borderRadius:10}}>
            <Header title='Cash Flow' toolTip='Amount of money moving in and out of your business.'
                dropDownComponent={<Select options={periodOptions} bordered={false} defaultValue={'ltm'}
                    onChange={(value) => onPeriodChange(value)} style={{width:161}}/>}
            />
            <Row style={{padding:5}}>
                <Col lg={18} span={24} style={{padding:15, borderRight:'1px solid #dee2e6'}}>
                    {data?.chartData && <Chart data={data.chartData} />}
                </Col>
                <Col lg={6} span={24} style={{padding:15, display:'flex', flexDirection:'column',
                   }}>
                    {data?.chartData &&
                    <BalanceComputation {...data.otherData}/>}
                </Col>
            </Row>
        </div>
    );
};

export default CashFlowChart;
