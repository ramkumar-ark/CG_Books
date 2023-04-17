import SubHeader from "../individual components/SubHeader";
import { Space, Typography } from 'antd';
import NewButton from "../individual components/NewButton";
import RefreshButton from "../individual components/RefreshButton";
import SortButton from "../individual components/SortButton";
import { useChangeUrlQueryParams } from "../../hooks/useSearchQueryHooks";

const { Title } = Typography;

const Header = ({onRefresh, sortOptions, titleLevel, topOffset, componentRef}) => {
    const changeUrlOnClick = useChangeUrlQueryParams('sort');
    return (
        <SubHeader topOffset={topOffset} componentref={componentRef}>
            <Title level={titleLevel || 3} style={{margin:'20px 40px 20px 0'}}>All Payments</Title>
            <Space>
                <NewButton/>
                <RefreshButton onClick={onRefresh}/>
                <SortButton sortOptions={sortOptions} onItemSelect={changeUrlOnClick}/>
            </Space>
        </SubHeader>
    );
};

export default Header;
