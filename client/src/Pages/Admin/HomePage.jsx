import { useState  ,Fragment} from 'react';
import Navbar from '../../Component/Admin/Navbar';
import Request from '../../Component/Admin/Request'
import Partner from '../../Component/Admin/Partner';
import UserManagment from '../../Component/Admin/userManagment';
import BikeManagement from '../../Component/Admin/bikemanagement';
import {Badge} from 'antd'
import { useEffect } from 'react';


import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  TeamOutlined ,
  UsergroupAddOutlined,
  ToolOutlined,
  LaptopOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import axios from 'axios';
import { adminApi } from '../../Apis/api';

const { Header, Sider, Content } = Layout;

const HomePage = () => {
  const[user,setUser]=useState(0)
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('1'); 
  const [refresh,setRefresh] = useState(false)
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMenuItemClick = (item) => {
    setSelectedKey(item.key); // Update selectedKey when a menu item is clicked
  };
  useEffect(() => {
    axios.get(`${adminApi}request`).then((res) => {
      if (res.data.success === true) {
        const number = res.data.request
             const fill = number.filter((data)=>{return data.access==="requesting"})
             const last = fill.length
        setUser(last);
      }
    });
  }, [refresh]);


  const receiveDataFromChild=()=>{
       if(refresh===false){
        setRefresh(true);
       }else{
        setRefresh(false)
       }
  }


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
              icon: <LaptopOutlined />,
              label: 'DashBord',
            },
            {
              key: '2',
              icon:<Badge className="pr-2 " count={user}> <UsergroupAddOutlined /></Badge>,
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
            {
              key: '5',
              icon:<ToolOutlined />,
              label: 'bikeList',
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
                return <Request sendDataToParent={receiveDataFromChild} />;
              case'3':
                return <Partner/>
              case'4':
                return <UserManagment/>
              default:
                return  <BikeManagement/>;
            }
          })()}
        </Content>
      </Layout>
    </Layout>
    </Fragment>
  );
};

export default HomePage;
