import SubHeader from "../../individual components/SubHeader";
import { Button, Space, Typography } from "antd";
import { CloseOutlined, FilePdfOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { downloadPdf } from "../../../utilities/downloadPdf";
import StatementView from "./StatementView";

const {Title} = Typography;

const Header = () => {
    const history = useHistory();
    return (
        <SubHeader topOffset={0}>
            <Title level={2} style={{marginTop: 15}}>Income Statement</Title>
            <Space size={"large"}>
                <Button className="downloadButton" onClick={() => {downloadPdf(StatementView, {data:{income: [{name:'Sales', balance:235000}]}, isPdf:true})}}>
                    <FilePdfOutlined/> Download PDF
                </Button>
                <Button className="closeButton" onClick={() => {history.goBack()}}>
                    <CloseOutlined/> 
                </Button>
            </Space>
        </SubHeader>
    );
};

export default Header;
