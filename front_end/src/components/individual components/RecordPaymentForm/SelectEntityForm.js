import { Form, Input, Space } from "antd";
import EntityDetailsView from "../CreateVoucherForm/EntityDetailsView";
import DisplayAddress from "../CreateVoucherForm/DisplayAddress";
import SelectEntity from "../CreateVoucherForm/SelectEntity";

const SelectEntityForm = ({entityType, selectedEntity, onEntitySelect, form, disabled,initialValues}) => {
    const entityTypeDisplay = `${entityType[0].toUpperCase()}${entityType.slice(1)}`;
    return (
        <Form
            form={form}
            labelCol={{lg:4, span:24}}
            wrapperCol={{lg:{span:9, offset:1}, span:24}}
            labelAlign='left'
            layout='horizontal'
            style={{ padding:'40px 20px 0', textAlign:'left'}}
            disabled={disabled}  
            initialValues={{[entityType]: initialValues}}
        >
            <Form.Item label={`${entityTypeDisplay} Name`} required={true}  >
                <Space style={{display:"block"}}>
                    <Input.Group>
                        <SelectEntity entityType={entityType} onEntitySelect={onEntitySelect}/>
                        {selectedEntity && 
                            <EntityDetailsView entityData={selectedEntity} 
                                entityTypeDisplay={entityTypeDisplay} />}
                        {(selectedEntity && entityType=='customer') && 
                            <DisplayAddress entityData={selectedEntity}/>}
                    </Input.Group>
                </Space>
            </Form.Item>
        </Form>
    );
};

export default SelectEntityForm;
