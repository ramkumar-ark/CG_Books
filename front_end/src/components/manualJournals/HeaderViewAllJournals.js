import { Typography } from "antd";
import SubHeader from "../individual components/SubHeader";
import NewButton from "../individual components/NewButton";

const {Title} = Typography;

const HeaderViewAllJournals = ({componentref, topOffset}) => (
    <SubHeader componentref={componentref} topOffset={topOffset}>
        <Title level={3}>Manual Journals</Title>
        <NewButton buttonText='New Journal'/>
    </SubHeader>
);

export default HeaderViewAllJournals;
