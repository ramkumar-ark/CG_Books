import { Col, Row, notification } from "antd";

import useGetViewPortHeight from "../../hooks/useGetViewPortHeight";
import AccountsListView from "./AccountsListView";
import LedgerAccountView from "./LedgerAccountView";

const ViewAccountPage = () => {
    const viewPortHeight = useGetViewPortHeight();
    const [api, contextHolder] = notification.useNotification();
    return (
        <Row>
            {contextHolder}
            <Col lg={{span:7}} xl={{span:8}} span={0} style={{overflowY:'auto', height:viewPortHeight-64}}>
                <AccountsListView api={api}/>
            </Col>
            <Col lg={{span:17}} xl={{span:16}} span={24} style={{overflowY:'scroll', height:viewPortHeight-64}}>
                <LedgerAccountView api={api}/>
            </Col>
        </Row>
    );
};

export default ViewAccountPage;
