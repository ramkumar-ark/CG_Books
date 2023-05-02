import { Col, Row } from "antd";
import useGetViewPortHeight from "../../hooks/useGetViewPortHeight";
import SingleVoucherView from "../individual components/SingleVoucherView";
import JournalsListView from "./JournalsListView";
import JournalVoucherView from "./JournalVoucherView";

const ViewJournal = () => {
    const viewPortHeight = useGetViewPortHeight();
    return (
        <Row>
            <Col lg={{span:7}} xl={{span:8}} span={0} style={{overflowY:'auto', height:viewPortHeight-64}}>
                <JournalsListView/>
            </Col>
            <Col lg={{span:17}} xl={{span:16}} span={24} style={{overflowY:'scroll', height:viewPortHeight-64}}>
                <SingleVoucherView voucherType={'Journal'}  VoucherViewComponent={JournalVoucherView}/>              
            </Col>
        </Row>
    );
};

export default ViewJournal;
