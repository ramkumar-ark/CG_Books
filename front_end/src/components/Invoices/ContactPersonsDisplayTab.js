import { Typography, Space, Avatar } from "antd";
import { UserOutlined, PhoneOutlined, MobileOutlined, StarFilled } from "@ant-design/icons";

const { Text } = Typography;

const ContactCard = ({contact}) => {
    return (
        <Space style={{alignItems:"flex-start"}}>
            <div><Avatar shape="square" size='large' icon={<UserOutlined/>}/></div>
            <div style={{paddingLeft:"10px"}}>
                <Space direction="vertical" size={1}>
                    {(contact.firstName) && 
                        <Text strong>
                            {`${contact.salutation || ''} ${contact.firstName} ${contact.lastName || ''}`}
                            {contact.type === "primary" && <StarFilled />}
                        </Text>
                    }
                    {contact.email && <Text>{contact.email}</Text>}
                    {contact.workPhone && <Text><PhoneOutlined />  {contact.workPhone}</Text>}
                    {contact.mobile && <Text><MobileOutlined />  {contact.mobile}</Text>}
                </Space>
            </div>
        </Space>
    );
};

const ContactPersonsDisplayTab = ({data}) => {
    const contacts = [{...data.primaryContact, type:"primary"}, ...data.contacts];
    return (
        <div>
            <Space direction="vertical">
                {contacts.map(e => <ContactCard key={e['_id']} contact={e}/>)}
            </Space>
        </div>
    );
};

export default ContactPersonsDisplayTab;
