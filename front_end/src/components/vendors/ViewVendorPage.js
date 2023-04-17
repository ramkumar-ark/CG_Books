import { Col, Row } from "antd";
import VendorListSection from "./VendorListSection";
import ViewVendorSection from "./ViewVendorSection";
import useGetViewPortHeight from "../../hooks/useGetViewPortHeight";

const ViewVendorPage = () => {
    const viewPortHeight = useGetViewPortHeight();
    const height = viewPortHeight - 64;
    return (
        <Row>
            <Col lg={{span:7}} xl={{span:8}} span={0} style={{overflowY:'scroll', height}}>
                <VendorListSection/>
            </Col>
            <Col lg={{span:17}} xl={{span:16}} span={24} style={{overflowY:'scroll', height}}>
                <ViewVendorSection/>
            </Col>
        </Row>
    );
};

export default ViewVendorPage;
