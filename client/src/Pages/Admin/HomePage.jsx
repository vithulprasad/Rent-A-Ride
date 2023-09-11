import { useState  ,Fragment} from 'react';
import Navbar from '../../Component/Admin/Navbar';
import Request from '../../Component/Admin/Request'
import Partner from '../../Component/Admin/Partner';

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  TeamOutlined ,
  UsergroupAddOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';

const { Header, Sider, Content } = Layout;

const HomePage = () => {
  
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('1'); // State variable to track selected item's key
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMenuItemClick = (item) => {
    setSelectedKey(item.key); // Update selectedKey when a menu item is clicked
  };
  return (
    <Fragment>
      <Navbar/>
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          selectedKeys={[selectedKey]} // Set the selectedKeys prop to track the selected item
          onClick={handleMenuItemClick} // Handle menu item click event
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'DashBord',
            },
            {
              key: '2',
              icon: <UsergroupAddOutlined />,
              label: 'Partner-Requests',
            },
            {
              key: '3',
              icon:<TeamOutlined />,
              label: 'Partners',
            },
            {
              key: '4',
              icon:<UserOutlined />,
              label: 'userManage',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 595,
            background: colorBgContainer,
          }}
        >
          {(() => {
            switch (selectedKey) { // Use selectedKey instead of key
              case '1':
                return <h1>admin dash board</h1>;
              case '2':
                return <Request/>;
              case'3':
                return <Partner/>
              case'4':
                return <div>hai this is user</div> 
              default:
                return  <h1>yes</h1>;
            }
          })()}
        </Content>
      </Layout>
    </Layout>
    </Fragment>
  );
};

export default HomePage;
