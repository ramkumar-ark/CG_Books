import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space, Typography } from 'antd';
import { useContext } from 'react';
import useAuthentication from '../useAuthentication';

const UserDropDown = () => {
    const {AuthCtx} = useAuthentication();
    const {user, logOut} = useContext(AuthCtx);
    const items = [
        {
          label: <a href="/app">Dashboard</a>,
          key: '0',
        },
        // {
        //   label: <a href="#">My Account</a>,
        //   key: '1',
        // },
        {
          type: 'divider',
        },
        {
          label: <Typography.Link onClick={() => {
            logOut();
          }}>Log Out</Typography.Link>,
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
          <Typography.Link onClick={(e) => e.preventDefault()}>
            <Space>
              {user && user.name}
              <DownOutlined />
            </Space>
          </Typography.Link>
        </Dropdown>
        );
};
export default UserDropDown;