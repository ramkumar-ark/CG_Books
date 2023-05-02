import { Form, Select } from "antd";
import useSelectedOrg from "../../../hooks/useSelectedOrg";
import { useFetchMastersQuery } from "../../../service/mastersApi";

const SelectLedgerAccount = ({name, initialValue}) => {
    const {'_id':orgId} = useSelectedOrg();
    const {data, isLoading} = useFetchMastersQuery(orgId);
    const ledgers = data?.ledgers.map(e => ({label:e.name, value:e['_id']}))
        .sort((a,b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()));
    return (
        <Form.Item name={name} wrapperCol={{span:24}} initialValue={initialValue}>
            <Select 
                showSearch
                options={ledgers}
                placeholder='Select Account'
                optionFilterProp="children"
                filterOption={(input,option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                style={{width:'50%', minWidth:200}}
                loading={isLoading}
            />
        </Form.Item>
    );
};

export default SelectLedgerAccount;
