import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import toast from "react-hot-toast";
import  "../Partner/ANT/ANT.css"
import {listBike} from '../../Apis/connections/partner'
import Loading from '../../Component/Loading/loading'
import {list} from '../../Apis/connections/partner'
import { EditBike } from "../../Apis/connections/partner";
import {
  Button,
  Modal,
  Form,
  Input,
  Select,
} from "antd";
function ListBike() {
 
const [loading,setLoading] = useState(true)
const [refresh,setRefresh] = useState(false)
  const partner = useSelector((state) => {
    return state.partnerAuth.PartnerToken;
  });

  const [bike, setBike] = useState([]);

  useEffect(() => {
    const listedBike=async()=>{
   await listBike().then((res) => {
        if (res.data.success) {
          setBike(res.data.bikes);
          setLoading(false)
        } else {
          toast.error("Something went wrong");
        }
      
      });
    }
    listedBike()
  }, [partner,refresh]);

  const handleListing =(id)=>{
    list(id)
    .then((res)=>{
      if(res.data.success==true){
        toast.success("bike listed successfully")
        if(refresh==true){
          setRefresh(false);
        }else{
          setRefresh(true)
        }
      }else{
        toast.error("something went wrong")
      }
    })
  }
  const [modal2Open, setModal2Open] = useState(false);
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    setLoading(true)
    await EditBike(values)
      .then((res) => {
        if (res.data.success === true) {
          toast.success("sent the information to admin to verify");
      
          setModal2Open(false);
          setLoading(false)
        } else {
          toast.error("something went wrong");
        }
      })
      .catch((err) => {
        toast.error(`${err.message}`);
      });
    console.log("Form values:", values);
  };
  return (

    <div className="p-6">
      {loading ? (<div className="flex justify-center">
        
        <Loading/>
        </div>):(<>
      
        <div className="grid grid-cols-3 gap-4">
        {bike.length > 0 ? (
          bike.map((data) =>
            data.requestStatus === "completed" && data.available===false ? (
              <div
                key={data._id}
                className="w-[280px] h-[350px] p-2 bg-slate-50"
                style={{
                  boxShadow:
                    "inset 0 -3em 3em rgba(0, 0, 0, 0.1),0 0 0 2px rgb(255, 255, 255),0.3em 0.3em 1em rgba(0, 0, 0, 0.3)",
                }}
              >
                <div className="w-full h-48">
                  <div className="h-full">
                    <img
                      className="w-full h-full object-cover"
                      src={data.image[0]}
                      alt="image"
                    />
                  </div>
                </div>
                <div>
                  <h1 className="font font-semibold font-mono">
                    Bike:<span className="ml-10 font-bold text-lg">{data.name}</span>
                  </h1>
                </div>
                <div>
                  <h1 className="font font-semibold font-mono">
                    Brand-Name:{data.BrandName}
                  </h1>
                </div>
                <div>
                  <h1 className="font font-semibold font-mono">
                    RentPer:<span className="ml-10">{data.rentPerHour}</span>
                  </h1>
                </div>
                <div className="flex justify-around">
                  <button onClick={()=>{handleListing(data._id)}} className="bg-cyan-500 text-white font-mono font-semibold px-5 py-2 rounded focus:outline-none shadow hover:bg-cyan-900 transition-colors">
                    ListBike
                  </button>
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
                    name: data.name, // Set the initial value for each field
                    brand: data.BrandName,
                    Rent: data.rentPerHour,
                    category: data.NormalCategory,
                    id: data._id,
                    cc: data.cc,
                    plateNumber: data.PlateNumber,
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
                    <Input defaultValue={data.name} />
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
                    <Input defaultValue={data.BrandName} />
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
                    <Input defaultValue={data.rentPerHour} />
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
                    <Select defaultValue={data.NormalCategory}>
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
                    <Input defaultValue={data._id} />
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
                    <Input defaultValue={data.cc} />
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
                    <Input defaultValue={data.PlateNumber} />
                  </Form.Item>
                </Form>
              </Modal>
                </div>
              </div>
            ) : null
          )
        ) : (
          <div className="w-[700px] h-[200px] flex justify-center items-center">
            <div
              className="animated-box"
              style={{
                boxShadow:
                  "inset 0 -3em 3em rgba(0, 0, 0, 0.1),0 0 0 2px rgb(255, 255, 255),0.3em 0.3em 1em rgba(0, 0, 0, 0.3)",
                backgroundImage:
                  'url(https://i.pinimg.com/564x/65/20/5f/65205f3ee1b5dd65b91d3fa279990927.jpg)',
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                width: "300px",
                height: "250px",
              }}
            ></div>
          </div>
        )}
      </div>
      </>)}
    
    </div>
  );
  
}

export default ListBike;
