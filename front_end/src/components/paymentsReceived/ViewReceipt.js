import { Col, Row } from "antd";
import ReceiptsListView from "./ReceiptsListView";
import ViewSingleReceipt from "./ViewSingleReceipt";
import useGetViewPortHeight from "../../hooks/useGetViewPortHeight";

const ViewReceipt = () => {
    const viewPortHeight = useGetViewPortHeight();
    const height = viewPortHeight - 64;
    return (
        <Row>
            <Col lg={{span:10}} xl={{span:8}} span={0} style={{overflowY:'scroll', height}}>
                <ReceiptsListView/>
            </Col>
            <Col lg={{span:14}} xl={{span:16}} span={24} style={{overflowY:'scroll', height}}>
                <ViewSingleReceipt/>
            </Col>
        </Row>
    );
};

export default ViewReceipt;
