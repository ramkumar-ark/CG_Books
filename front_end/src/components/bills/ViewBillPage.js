import { Col, Row } from "antd";
import BillsListView from "./BillsListView";
import useGetViewPortHeight from "../../hooks/useGetViewPortHeight";
import SingleVoucherView from "../individual components/SingleVoucherView";
import PurchaseVoucherView from "./PurchaseVoucherView";

const ViewBillPage = () => {
    const viewPortHeight = useGetViewPortHeight();
    return (
        <Row>
            <Col lg={{span:7}} xl={{span:8}} span={0} style={{overflowY:'auto', height:viewPortHeight-64}}>
                <BillsListView/>                
            </Col>
            <Col lg={{span:17}} xl={{span:16}} span={24} style={{overflowY:'scroll', height:viewPortHeight-64}}>
                <SingleVoucherView voucherType={'Purchase'}  VoucherViewComponent={PurchaseVoucherView}/>              
            </Col>
        </Row>
    );
};

export default ViewBillPage;
