import { Col, Row } from "antd";
import useGetViewPortHeight from "../../hooks/useGetViewPortHeight";
import PaymentsListView from "./PaymentListView";
import SingleVoucherView from "../individual components/SingleVoucherView";
import PaymentVoucherView from "../individual components/PaymentVoucherView";

const ViewPaymentPage = () => {
    const viewPortHeight = useGetViewPortHeight();
    return (
        <Row>
            <Col lg={{span:7}} xl={{span:8}} span={0} style={{overflowY:'auto', height:viewPortHeight-64}}>
                <PaymentsListView/>                
            </Col>
            <Col lg={{span:17}} xl={{span:16}} span={24} style={{overflowY:'scroll', height:viewPortHeight-64}}>
                <SingleVoucherView voucherType={'Payment'}  VoucherViewComponent={PaymentVoucherView}/>              
            </Col>
        </Row>
    );
};

export default ViewPaymentPage;
