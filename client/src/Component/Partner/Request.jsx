import { useEffect, useState } from "react";
import { listBike } from "../../Apis/connections/partner";
import { useSelector } from "react-redux";
import { EditBike } from "../../Apis/connections/partner";
import PropTypes from 'prop-types';
import toast from "react-hot-toast";
import {
  Table,
  Button,
  Tag,
  Popconfirm,
  message,
  Modal,
  Form,
  Input,
  notification,
  Select,
} from "antd";
import { SyncOutlined } from "@ant-design/icons";

import { bikeDelete } from "../../Apis/connections/partner";
const { Column } = Table;

function Request({ refreshed }) {
  const partner = useSelector((state) => {
    return state.partnerAuth.PartnerToken;
  });

  const [bike, setBike] = useState([]);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const listedBike = async () => {
      await listBike().then((res) => {
        if (res.data.success) {
          setBike(res.data.bikes);
        } else {
          toast.error("Something went wrong");
        }
      });
    };
    listedBike();
  }, [partner, refresh]);

  const handleRefresh = () => {
    if (refresh === true) {
      setRefresh(false);
      refreshed();
    } else {
      setRefresh(true);
      refreshed();
    }
  };
  return (
    <div>
      {bike.length > 0 ? (
        <MyTable bike={bike} refresh={handleRefresh} />
      ) : (
        <div className="w-full h-[600px]  flex justify-center items-center">
          <div
            className="w-[50%] h-[300px]"
            style={{
              backgroundImage:
                "url(https://i.pinimg.com/564x/ae/8a/c2/ae8ac2fa217d23aadcc913989fcc34a2.jpg)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
            }}
          ></div>
        </div>
      )}
    </div>
  );
}

export default Request;
Request.propTypes = {
    refreshed: PropTypes.func.isRequired,
    authorized: PropTypes.bool.isRequired, 
  };



  
const MyTable = ({ bike, refresh }) => {
  const [form] = Form.useForm();
  const [modal2Open, setModal2Open] = useState(false);
  const deleted = async (id) => {
    toast.success(`adsfs${id._id}`);
    console.log(id);

    await bikeDelete(id._id).then((res) => {
      if (res.data.success) {
        toast.success("deleted successfully");
        refresh();
      } else {
        toast.error("something went wrong");
      }
    });
  };

  const detailsHandler = (id) => {
    toast.success(`entering to the bike details  id-${id}`);
    console.log(bike);
  };
  const cancel = (e) => {
    console.log(e);
    message.error("cancel");
  };

  const onFinish = async (values) => {
    await EditBike(values)
      .then((res) => {
        if (res.data.success === true) {
          toast.success("bike edited successfully");
          refresh();
          setModal2Open(false);
        } else {
          toast.error("something went wrong");
        }
      })
      .catch((err) => {
        toast.error(`${err.message}`);
      });
    console.log("Form values:", values);
  };
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, id) => {
    api[type]({
      message: "Rejected Reason !",
      description: `=>..${id.reason}`,
    });
  };
  return (
    <Table dataSource={bike}>
      <Column
        title="Image"
        dataIndex="image"
        key="image"
        render={(image) => (
          <div className="w-[100px] h-[60px]">
            <img src={image[0]} alt="" className="w-full h-full" />
          </div>
        )}
      />
      <Column title="Name" dataIndex="name" key="name" />
      <Column
        title="Status"
        dataIndex="requestStatus"
        key="requestStatus"
        render={(requestStatus) =>
          requestStatus === "requested" ? (
            <Tag icon={<SyncOutlined spin />} color="processing">
              processing
            </Tag>
          ) : requestStatus === "completed" ? (
            <Tag color="#87d068">Available Now</Tag>
          ) : requestStatus === "requestingAgain" ? (
            <div>
              <Tag color="orange">Re Requesting</Tag>
            </div>
          ) : (
            <div>
              <Tag color="#f50">Rejected</Tag>
            </div>
          )
        }
      />
      <Column
        title="Tags"
        dataIndex="_id"
        key="tags"
        render={(_id) => (
          <Button
            className="w-[100px bg-teal-400"
            onClick={() => {
              detailsHandler(_id);
            }}
          >
            Details
          </Button>
        )}
      />
      <Column
        title="Action"
        key="action"
        dataIndex="requestStatus"
        render={(requestStatus, _id) =>
          requestStatus === "requested" ? (
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={() => {
                deleted(_id);
              }}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button className="bg-red-500">Remove</Button>
            </Popconfirm>
          ) : requestStatus === "completed" ? (
            <Button className="bg-lime-500">List Now</Button>
          ) : requestStatus === "requestingAgain" ? (
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={() => {
                deleted(_id);
              }}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button className="bg-red-500">Remove</Button>
            </Popconfirm>
          ) : (
            <div>
              <Button
                className="bg-amber-300 mr-2"
                type="primary"
                onClick={() => setModal2Open(true)}
              >
                Edit
              </Button>
              <Modal
                title="Edit bike"
                centered
                visible={modal2Open}
                onOk={() => form.submit()}
                onCancel={() => setModal2Open(false)}
                width={600}
              >
                <Form
                  form={form}
                  name="validateOnly"
                  layout="vertical"
                  autoComplete="off"
                  onFinish={onFinish}
                  initialValues={{
                    name: _id.name, // Set the initial value for each field
                    brand: _id.BrandName,
                    Rent: _id.rentPerHour,
                    category: _id.NormalCategory,
                    id: _id._id,
                    cc: _id.cc,
                    plateNumber: _id.PlateNumber,
                  }}
                >
                  <Form.Item
                    name="name"
                    label="Name Of the bike"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input defaultValue={_id.name} />
                  </Form.Item>
                  <Form.Item
                    name="brand"
                    label="Brand Name"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input defaultValue={_id.BrandName} />
                  </Form.Item>
                  <Form.Item
                    name="Rent"
                    label="Rent perHour"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input defaultValue={_id.rentPerHour} />
                  </Form.Item>
                  <Form.Item
                    name="category"
                    label="Category"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Select defaultValue={_id.NormalCategory}>
                      <Select.Option value="New">New</Select.Option>
                      <Select.Option value="Racing">Racing</Select.Option>
                      <Select.Option value="Adventure">Adventure</Select.Option>
                      <Select.Option value="Normal">Normal</Select.Option>
                      <Select.Option value="Old">Old</Select.Option>
                      <Select.Option value="Branded">Branded</Select.Option>
                      <Select.Option value="Tripping">Tripping</Select.Option>
                      <Select.Option value="E-bike">E-bike</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="id"
                    label="id"
                    hidden
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input defaultValue={_id._id} />
                  </Form.Item>
                  <Form.Item
                    name="cc"
                    label="CC"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input defaultValue={_id.cc} />
                  </Form.Item>
                  <Form.Item
                    name="plateNumber"
                    label="Plate Number"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input defaultValue={_id.PlateNumber} />
                  </Form.Item>
                </Form>
              </Modal>

              {contextHolder}
              <Button
                className="ml-1 bg-blue-500"
                onClick={() => openNotificationWithIcon("warning", _id)}
              >
                Reason
              </Button>
              <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this task?"
                onConfirm={() => {
                  deleted(_id);
                }}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <Button className="bg-red-500">Remove</Button>
              </Popconfirm>
            </div>
          )
        }
      />
    </Table>
  );
};
MyTable.propTypes = {
    bike: PropTypes.arrayOf(PropTypes.object).isRequired, 
    refresh: PropTypes.func.isRequired, 
  };