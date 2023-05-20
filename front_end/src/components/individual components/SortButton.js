import { Dropdown, Button, Typography } from "antd";
import { EllipsisOutlined, InteractionTwoTone } from '@ant-design/icons'

const { Text } = Typography;

const SortButton = ({sortOptions, refetchFunction, onItemSelect}) => {
    const childrenItems = sortOptions.map((e, i) => ({
        label:<Typography.Link onClick={() => onItemSelect(e.sortField)} key={i+1}>
                <Text>{e.label}</Text>
            </Typography.Link>, 
        key:i + 1,
    }));
    
    const items = [
        {label: <Text strong>SORT BY</Text>, key:0, type:'group', children:childrenItems},
    ];

    if (refetchFunction){
        items.push({type: 'divider'});
        items.push({
            label: <Text onClick={() =>{refetchFunction()}}>Refresh List</Text>, 
            icon: <InteractionTwoTone style={{fontSize:"15px"}}/>,key:'r1'})
    }

    return (
        <Dropdown trigger={['click']} menu={{items, selectable:true}}>
            <Button style={{padding:'4px 8px'}}><EllipsisOutlined /></Button>
        </Dropdown>
    );
};

export default SortButton;
