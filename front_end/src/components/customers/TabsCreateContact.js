import { Tabs } from 'antd';
import AddressTab from './AddressTab';
import OtherDetailsTab from './OtherDetailsTab';
import EditableTable from './ContactsTab';
import Remarks from './RemarksTab';

const TabsCreateContact = ({formObj}) => {
    const items = [
        {
          key: '1',
          label: `Other Details`,
          children: <OtherDetailsTab/>,
        },
        {
          key: '2',
          label: `Address`,
          children: <AddressTab formObj={formObj}/>,
        },
        {
          key: '3',
          label: `Contact Persons`,
          children: <EditableTable/>,
        },
        {
          key: '4',
          label: `Remarks`,
          children: <Remarks/>,
        }
    ];
    return <Tabs defaultActiveKey="1" items={items} />};
export default TabsCreateContact;