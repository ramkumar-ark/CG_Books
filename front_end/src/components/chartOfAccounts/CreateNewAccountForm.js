import { Form, Input, InputNumber } from "antd";
import SelectAccountGroup from "./SelectAccountGroup";

const CreateNewAccountForm = ({form, onSave, initialValues, isGroupDisabled}) => {
    
    return (
        <Form
            form={form}
            wrapperCol={{lg:14, span:24}}
            labelCol={{lg:8, span:24}}
            style={{padding:'30px 10px'}}
            onFinish={(values) => {
                console.log(values);
                onSave(values);
            }}
            initialValues={initialValues}
            preserve={false}
        >
            <SelectAccountGroup isDisabled={isGroupDisabled}/>
            <Form.Item label='Account Name' name='name' required={true} rules={[
                {required: true, message: `Please provide a valid Account Name`}]}
            >
                <Input/>
            </Form.Item>
            <Form.Item label= 'Description' name='description'>
                <Input.TextArea autoSize={true}/>
            </Form.Item>
            <Form.Item label= 'Opening Balance' name='opBalance'>
                <InputNumber style={{width:'100%'}}/>
            </Form.Item>
        </Form>
    );
};

export default CreateNewAccountForm;
