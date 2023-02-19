import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import useOrganization from '../useOrganization';

const OrgDropDown = () => {
    const {OrgCtx} = useOrganization();
    const {selectedOrg} = useContext(OrgCtx);
    const items = [
        {
            label: 'Settings',
            key: 0,
        },
        {
            label: 'Address',
            key: 1,
        }
    ];

    return (
        <Dropdown menu={{items}} trigger={['click']} >
            <a onClick={e => e.preventDefault()}>
                <Space>
                    {/* <Space direction='vertical'> */}
                        Organization:
                        {selectedOrg && selectedOrg.name}
                    {/* </Space> */}
                    <DownOutlined/>
                </Space>
            </a>
        </Dropdown>

    );

};

export default OrgDropDown;
