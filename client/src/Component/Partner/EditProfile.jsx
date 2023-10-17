import ImgCrop from "antd-img-crop";
import { useEffect, useRef, useState } from "react";
import { Upload } from "antd";
import { PartnerDetails } from "../../Apis/connections/partner";
import { partnerEdit } from "../../Apis/connections/partner";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import axios from "axios";
import Loading from '../../Component/Loading/loading'

function EditProfile() {
  const [fileList, setFileList] = useState([]);
  const [image, setImage] = useState("");
  const isUploadingRef4 = useRef(1);
  const [loading,setLoading] = useState(false)
const [name,setName] = useState('no data')
const [phone,setPhone] = useState('no data')
const [age,setAge] = useState('no data')
const [companyName,setCompanyName] = useState('no data')
const [area,setArea] = useState('no data')
const [post,setPost] = useState('no data')
const [pin,setPin] = useState('no data')
const [district,setDistrict] = useState('no data')
const [state,setState] = useState('no data')

  const partner = useSelector((state) => {
    return state.partnerAuth.PartnerToken;
  });
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true)
    try {
      await PartnerDetails(partner).then((res) => {
        if (res.data.success === true) {
          const partner = res.data.partner;
       
      
          setName(partner.name)
          setPhone(partner.phone)
          setAge(partner.address.age)
          setCompanyName(partner.company)
          setArea(partner.address.localArea)
          setPost( partner.address.post)
          setPin(partner.address.pin)
          setDistrict(partner.address.district)
          setState( partner.address.state)
          if (partner.image) {
            setImage(partner.image);
          } else {
            setImage(
              `https://i.pinimg.com/564x/cf/c8/a7/cfc8a77cecf698e50890d8ab4a566e34.jpg`
            );
          }
          setLoading(false)
        } else {
          toast.error("something went wrong in getData");
        }
      });
    } catch (error) {
      toast.error("something went wrong in get the details");
    }
  };

  const onChange = async ({ fileList: newFileList }) => {
    setFileList(newFileList);

    if (fileList.length > 0 && isUploadingRef4.current <= 3) {
      if (isUploadingRef4.current === 1) {
        isUploadingRef4.current = 2;
      } else if (isUploadingRef4.current === 2) {
        isUploadingRef4.current = 3;
      }
      if (isUploadingRef4.current === 3) {
        const formData = new FormData();
        formData.append("file", fileList[0].originFileObj);
        formData.append(
          "upload_preset",
          import.meta.env.VITE_APP_CLOUDINARY_NAME
        );

        const res = await axios.post(
          import.meta.env.VITE_APP_CLOUDINARY_PATH,
          formData
        );

        const imageUrl = res.data.secure_url;
      

        setImage(`${imageUrl}`);
        toast.success("image added successfully");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data={
      name:name,
      phone:phone,
      companyName:companyName,
      district:district,
      state:state,
      area:area,
      age:age,
      post:post,
      pin:pin, 
    }
   
    await partnerEdit({
      information: data,
      image: image,
      token: partner,
    })
      .then((res) => {
        if (res.data.success === true) {
          toast.success("updated successfully");
        } else {
          toast.error("something went wrong");
        }
      })
      .catch((err) => {
        toast.error(`${err.message}`);
      });
  };
  return (
    <div className="w-full h-[600px] flex">
      {loading ? (<Loading/>) : (<>
        <div className="w-[20%] h-full p-2">
        <div className="w-full h-full flex  flex-col ">
          <div className="w-full flex justify-center pt-2">
            <div
              className="w-[180px] h-[180px] p-1 border border-black"
              style={{
                boxShadow:
                  " inset 0 -3em 3em rgba(0, 0, 0, 0.1),0 0 0 2px rgb(255, 255, 255),0.3em 0.3em 1em rgba(0, 0, 0, 0.3)",
              }}
            >
              <div
                className="w-[170px] h-[170px] "
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[80%] h-full">
        <div className="w-[70%] h-[500px]">
          <div className="w-full h-[10%] border border-gray-700 flex justify-center items-center font-mono text-2xl">
            {" "}
            <h1>Edit Profile</h1>
          </div>

          <form onSubmit={handleSubmit} className="w-full h-full flex">
            <div className="w-[50%] h-full p-2">
              <div className="w-full h-[37%] px-24 py-3 flex justify-center">
                <div className=" w-full h-full flex justify-center items-center flex-col ml-2 border ">
                  <ImgCrop rotationSlider>
                    <Upload
                      action="/partner/profile"
                      listType="picture-card"
                      fileList={fileList}
                      onChange={onChange}
                    >
                      {fileList.length < 1 && "+ Upload"}
                    </Upload>
                  </ImgCrop>
                  <h1>Upload image</h1>
                </div>
              </div>

              <div className="flex w-full h-[10%] border  my-3">
                <div className="w-[50%] h-full flex justify-center items-center  font-mono ">
                  <h1>Name</h1>
                </div>
                <div className="w-[50%] mr-2 h-full flex justify-center items-center  font-mono font-extralight ">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) =>
                      setName( e.target.value )
                    }
                    className="w-full border border-gray-400"
                  />
                </div>
              </div>
              <div className="flex w-full h-[10%] border  my-3">
                <div className="w-[50%] h-full flex justify-center items-center  font-mono ">
                  <h1>Phone:</h1>
                </div>
                <div className="w-[50%] mr-2 h-full flex justify-center items-center  font-mono font-extralight ">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) =>
                      setPhone( e.target.value )
                    }
                    className="w-full border border-gray-400"
                  />
                </div>
              </div>
              <div className="flex w-full h-[10%] border  my-3">
                <div className="w-[50%] h-full flex justify-center items-center  font-mono ">
                  <h1>Age:</h1>
                </div>
                <div className="w-[50%] mr-2 h-full flex justify-center items-center  font-mono font-extralight ">
                  <input
                    type="text"
                    value={age}
                    onChange={(e) =>
                      setAge( e.target.value )
                    }
                    className="w-full border border-gray-400"
                  />
                </div>
              </div>
            </div>
            <div className="w-[50%] h-full  p-2">
              <div className="flex w-full h-[10%] border  my-3">
                <div className="w-[50%] h-full flex justify-center items-center  font-mono ">
                  <h1>Company Name:</h1>
                </div>
                <div className="w-[50%] mr-2 h-full flex justify-center items-center  font-mono font-extralight ">
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) =>
                      setCompanyName( e.target.value )
                    }
                    className="w-full border border-gray-400"
                  />
                </div>
              </div>

              <div className="flex w-full h-[10%] border  my-3">
                <div className="w-[50%] h-full flex justify-center items-center  font-mono ">
                  <h1>Area:</h1>
                </div>
                <div className="w-[50%] mr-2 h-full flex justify-center items-center  font-mono font-extralight ">
                  <input
                    type="text"
                    value={area}
                    onChange={(e) =>
                      setArea( e.target.value )
                    }
                    className="w-full border border-gray-400"
                  />
                </div>
              </div>

              <div className="flex w-full h-[10%] border  my-3">
                <div className="w-[50%] h-full flex justify-center items-center  font-mono ">
                  <h1>post:</h1>
                </div>
                <div className="w-[50%] mr-2 h-full flex justify-center items-center  font-mono font-extralight ">
                  <input
                    type="text"
                    value={post}
                    onChange={(e) =>
                      setPost( e.target.value )
                    }
                    className="w-full border border-gray-400"
                  />
                </div>
              </div>
              <div className="flex w-full h-[10%] border  my-3">
                <div className="w-[50%] h-full flex justify-center items-center  font-mono ">
                  <h1>pin:</h1>
                </div>
                <div className="w-[50%] mr-2 h-full flex justify-center items-center  font-mono font-extralight ">
                  <input
                    type="text"
                    value={pin}
                    onChange={(e) =>
                      setPin( e.target.value )
                    }
                    className="w-full border border-gray-400"
                  />
                </div>
              </div>
              <div className="flex w-full h-[10%] border  my-3">
                <div className="w-[50%] h-full flex justify-center items-center  font-mono ">
                  <h1>District:</h1>
                </div>
                <div className="w-[50%] mr-2 h-full flex justify-center items-center  font-mono font-extralight ">
                  <input
                    type="text"
                    value={district}
                    onChange={(e) =>
                      setDistrict( e.target.value )
                    }
                    className="w-full border border-gray-400"
                  />
                </div>
              </div>
              <div className="flex w-full h-[10%] border  my-3">
                <div className="w-[50%] h-full flex justify-center items-center  font-mono">
                  <h1>State:</h1>
                </div>
                <div className="w-[50%] mr-2 h-full flex justify-center items-center  font-mono font-extralight ">
                  <input
                    type="text"
                    value={state}
                    onChange={(e) =>
                      setState( e.target.value )
                    }
                    className="w-full border border-gray-400"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-green-500  text-white font-bold px-5 py-1 rounded focus:outline-none shadow hover:bg-green-700 transition-colors"
                >
                  Submit Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      </>)}
     
    </div>
  );
}

export default EditProfile;
