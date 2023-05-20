import { Form, Select } from "antd";
import useGetGroupsList from "./useGetGroupsList";

const SelectAccountGroup = ({isDisabled}) => {
    const selectOptionsList = useGetGroupsList();
    return (
        <Form.Item label='Account Group' name='group' required={true} 
            rules={[{required: true, message: `Please Select a Account Group.`}]}>
            <Select 
                showSearch
                options={selectOptionsList}
                placeholder={`Select Account Group`} 
                optionFilterProp="children" 
                filterOption={(input, option) => 
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                style={{width:"100%"}}
                loading={!selectOptionsList}
                disabled={isDisabled}
            />
        </Form.Item>
    );
}

export default SelectAccountGroup;
