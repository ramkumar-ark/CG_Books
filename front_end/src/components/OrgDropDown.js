import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useGetSelectedOrgQuery } from '../service/appApi';
import useAuthentication from '../useAuthentication';


const OrgDropDown = () => {
    const { AuthCtx } = useAuthentication();
    const { user } = useContext(AuthCtx);
    let selectedOrg;
    const {data} = useGetSelectedOrgQuery(user.id);
    if (data) selectedOrg = data.selectedOrg;
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
