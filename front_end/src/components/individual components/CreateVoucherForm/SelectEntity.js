import {PlusCircleFilled} from "@ant-design/icons"
import { Form, Select, Divider, Space, Typography } from "antd";
import useGetEntities from "../../../hooks/useGetEntities";

const {Link, Text} = Typography;

const SelectEntity = ({entityType, onEntitySelect}) => {
    const entityTypeDisplay = `${entityType[0].toLowerCase()}${entityType.slice(1)}`;
    const {entitySelectList} = useGetEntities(entityType);
    return (
        <Form.Item 
            name={entityType}
            wrapperCol={{span:24}}
            rules={[{required: true, message: `Please Select a ${entityTypeDisplay}`}]}
            style={{marginBottom: "0px"}}
        >                   
            <Select 
                showSearch 
                dropdownRender={(menu) => (
                    <>
                    {menu}
                    <Divider style={{margin: '8px 0',}}/>
                    <Link to={`/app/home/${entityType}/new`} style={{display:"block"}}>
                        <Space><PlusCircleFilled/><Text>New {entityTypeDisplay}</Text></Space>
                    </Link>
                    </>
                )}
                options={entitySelectList}
                placeholder={`Select ${entityTypeDisplay}`} 
                optionFilterProp="children" 
                filterOption={(input, option) => 
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                style={{width:"100%"}}
                onSelect={onEntitySelect}
                loading={!entitySelectList}
            />
        </Form.Item>
    );
};

export default SelectEntity;
