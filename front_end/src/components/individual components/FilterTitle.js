import { Dropdown, Typography } from "antd";
import { DownOutlined } from "@ant-design/icons";

const { Title, Link } = Typography;

const FilterTitle = ({title, filterOptionsList, onItemClick, titleLevel}) => {
    const items = filterOptionsList.map(e => ({
        label:<Link onClick={() => {onItemClick(e.filterField)}}>{e.label}</Link>,
        key:e.filterField,
    }))
    return (
        <Dropdown trigger={['click']} menu={{items}}>
            <Link onClick={(e) => e.preventDefault()}>
                <Title level={titleLevel || 3}>
                    {title} <DownOutlined style={{color:"#408dfb", fontSize:"15px"}}/>
                </Title>
            </Link>
        </Dropdown>
    );
};

export default FilterTitle;
