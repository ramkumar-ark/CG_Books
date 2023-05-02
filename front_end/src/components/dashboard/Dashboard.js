import { Col, Row, Spin } from "antd";
import ReceivablesOverview from "./ReceivablesOverview";
import PayablesOverview from "./PayablesOverview";
import CashFlowChart from "./CashFlowChart.js";
import IncomeAndExpenseChart from "./IncomeAndExpenseChart";
import TopExpensesChart from "./TopExpensesChart.js";

const Dashboard = () => {
    return (
        <Spin spinning={false}>
            <Row>
                <Col lg={12} span={24}>
                    <ReceivablesOverview/>
                </Col>
                <Col lg={12} span={24}>
                    <PayablesOverview/>
                </Col>
            </Row>
            <div >
                <CashFlowChart/>
            </div>
            <Row>
                <Col lg={12} span={24}>
                    <IncomeAndExpenseChart/>
                </Col>
                <Col lg={12} span={24}>
                    <TopExpensesChart/>
                </Col>
            </Row>
        </Spin>
    );
};

export default Dashboard;