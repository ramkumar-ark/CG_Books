import { Col, Row } from "antd";
import ReceiptsListView from "./ReceiptsListView";
import ViewSingleReceipt from "./ViewSingleReceipt";

const ViewReceipt = () => {
    return (
        <Row>
            <Col lg={{span:10}} xl={{span:8}} span={0} style={{overflowY:'scroll', height:'89.75vh'}}>
                <div >
                    <ReceiptsListView/>
                </div>
                
            </Col>
            <Col lg={{span:14}} xl={{span:16}} span={24} style={{overflowY:'scroll', height:'89.75vh'}}>
                <div >
                    <ViewSingleReceipt/>
                </div>
               
            </Col>
        </Row>
    );
};

export default ViewReceipt;
