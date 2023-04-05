import { useHistory, useLocation } from "react-router-dom";
import { Dropdown, Button, Typography } from "antd";
import { EllipsisOutlined } from '@ant-design/icons'

const { Text } = Typography;

const SortButton = ({sortOptions}) => {
    const {pathname, search} = useLocation();
    const searchParams = new URLSearchParams(search);
    const history = useHistory();

    const onSelect = (option) => {
        if (searchParams.get('sortBy') === option) 
            searchParams.set('sortOrder', searchParams.get('sortOrder') === 'A' ? 'D' : 'A');
        else searchParams.set('sortOrder', 'A');
        searchParams.set('sortBy', option);
        const path = `${pathname}?${searchParams.toString()}`;
        history.push(path);
    };

    const childrenItems = sortOptions.map((e, i) => ({
        label:<Typography.Link onClick={() => onSelect(e.sortField)}>
                <Text>{e.label}</Text>
            </Typography.Link>, 
        key:i + 1,
    }));
    
    const items = [
        {label: <Text strong>SORT BY</Text>, key:0, type:'group', children:childrenItems},
    ];

    return (
        <Dropdown trigger={['click']} menu={{items, selectable:true}}>
            <Button style={{padding:'4px 8px'}}><EllipsisOutlined /></Button>
        </Dropdown>
    );
};

export default SortButton;
