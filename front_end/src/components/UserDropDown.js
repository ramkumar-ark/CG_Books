import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import useAuthentication from '../useAuthentication';
import useOrganization from '../useOrganization';

const UserDropDown = () => {
    const {AuthCtx} = useAuthentication();
    const {OrgCtx} = useOrganization();
    const {user, logOut} = useContext(AuthCtx);
    const {setSelectedOrgId} = useContext(OrgCtx);
    const items = [
        {
          label: <a href="/app">Dashboard</a>,
          key: '0',
        },
        {
          label: <a href="#">My Account</a>,
          key: '1',
        },
        {
          type: 'divider',
        },
        {
          label: <Link onClick={() => {
            logOut();
            setSelectedOrgId(null);
          }}>Log Out</Link>,
          key: '3',
        },
      ];
      return (
        <Dropdown
          menu={{
            items,
          }}
          trigger={['click']}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              {user && user.name}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
        );
};
export default UserDropDown;