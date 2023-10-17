import { useState, Fragment } from "react";
import Navbar from "../../Component/Admin/Navbar";
import Request from "../../Component/Admin/Request";
import Partner from "../../Component/Admin/Partner";
import UserManagment from "../../Component/Admin/userManagment";
import BikeManagement from "../../Component/Admin/bikemanagement";
import Requestd from "../../Component/Admin/BikeRequested";
import RejectPage from "../../Component/Admin/BikeReject";
import { bikeDetails } from "../../Apis/connections/admin";
import { RequestDetails } from "../../Apis/connections/admin";
import { Badge } from "antd";
import { useEffect } from "react";
import Loading from '../../Component/Loading/loading'
import Sales from "../../Component/Admin/Sales";
import Coupon from "../../Component/Admin/Coupon";

import {
  MenuFoldOutlined,
  FrownOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
  ToolOutlined,
  LaptopOutlined,
  SafetyCertificateOutlined
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import toast from "react-hot-toast";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu; // Add this line to import SubMenu

const HomePage = () => {
  const [loading,setLoading] = useState(false)

  const [user, setUser] = useState(0);
  const [bike, setBike] = useState(0);
  const [refresh1, setRefresh1] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("1");
  const [refresh, setRefresh] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMenuItemClick = (item) => {
    setSelectedKey(item.key); // Update selectedKey when a menu item is clicked
  };

  const onLoad = () => {
    if (refresh === false) {
      setRefresh(true);
    } else {
      setRefresh(false);
    }
  };

  useEffect(() => {
    const call = async () => {
      setLoading(true)
      await RequestDetails().then((res) => {
        if (res.data.success === true) {
          const number = res.data.request;
          const fill = number.filter((data) => {
            return data.access === "requesting";
          });
          const last = fill.length;
          setUser(last);
          setLoading(false)
        }
      });
    };

    call();

    const getBikes = async () => {
      setLoading(true)
      await bikeDetails().then((res) => {
        if (res.data.success === true) {
          const data = res.data.bikes;
          const newData = data.filter((bike) => {
            return (
              bike.requestStatus === "requested" ||
              bike.requestStatus === "requestingAgain"
            );
          });
          setBike(newData.length);
          setLoading(false)
        } else {
          toast.error("something went wrong!");
        }
      });
    };
    getBikes();
  }, [refresh, refresh1]);

  const receiveDataFromChild = () => {
    if (refresh1 === false) {
      setRefresh1(true);
    } else {
      setRefresh1(false);
    }
  };

  return (
    <Fragment>
      <Navbar />
      <Layout>
      {loading ? (<Loading/>) : (<>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            selectedKeys={[selectedKey]}
            onClick={handleMenuItemClick}
          >
            <Menu.Item key="1" icon={<LaptopOutlined />} label="Dashboard">
              Dashboard
            </Menu.Item>
           
            <Menu.Item
              key="2"
              icon={
                <Badge className="pr-2 " count={user}>
                  <UsergroupAddOutlined />
                </Badge>
              }
              label="Partner-Requests"
            >
              Partner-Requests
            </Menu.Item>
            <Menu.Item key="3" icon={<TeamOutlined />} label="Partners">
              Partners
            </Menu.Item>
            <Menu.Item key="4" icon={<UserOutlined />} label="User Management">
              User Management
            </Menu.Item>
            <SubMenu
              key="5"
              icon={
                <Badge className="pr-2 " count={bike}>
                  <ToolOutlined />
                </Badge>
              }
              title="Bike Management"
            >
              <Menu.Item key="5-1" onClick={() => setSelectedKey("5-1")}
                icon={
                  <SafetyCertificateOutlined />
                }
              >
                Active Bikes
              </Menu.Item>
              <Menu.Item key="5-2" onClick={() => setSelectedKey("5-2")}
                 icon={
                  <FrownOutlined />
              }
              >
                Rejected
              </Menu.Item>
              <Menu.Item
                key="5-3"
                onClick={() => setSelectedKey("5-3")}
                icon={
                  <Badge className="pr-2 " count={bike}>
                    <ToolOutlined />
                  </Badge>
                }
              >
                Requests
              </Menu.Item>
              
            </SubMenu>
            <Menu.Item key="6" icon={<LaptopOutlined />} label="Dashboard">
             Coupon management
            </Menu.Item>
            <Menu.Item key="7" icon={<LaptopOutlined />} label="Dashboard">
             sales
            </Menu.Item>
          </Menu>
         
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 595,
              background: colorBgContainer,
            }}
          >
            {(() => {
              switch (selectedKey) {
                case "1":
                  return <h1>Admin Dashboard</h1>;
                case "2":
                  return <Request sendDataToParent={receiveDataFromChild} />;
                case "3":
                  return <Partner />;
                case "4":
                  return <UserManagment />;
                case "5-1":
                  return <BikeManagement />;
                case "5-2":
                  return <RejectPage />;
                case "5-3":
                  return <Requestd requested={onLoad} />;
                case "6":
                  return <Coupon />;
                case "7":
                  return <Sales />;  
                default:
                  return <h1>Page not found</h1>;
              }
            })()}
          </Content>
        </Layout>
      </>)}
       
      </Layout>
    </Fragment>
  );
};

export default HomePage;
