import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { useEffect, useState, useCallback, useRef } from "react";
import { profileEditDataDetails } from "../../Apis/connections/user";
import { editProfileData } from "../../Apis/connections/user";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import PropTypes from "prop-types";

function EditProfileComponent({ sendDataToParent }) {
  const [refresh, setRefresh] = useState(false);

  const [fileList1, setFileList1] = useState([]);
  const [fileList2, setFileList2] = useState([]);
  const [fileList3, setFileList3] = useState([]);
  const [fileList4, setFileList4] = useState([]);
  const [fileList5, setFileList5] = useState([]);

  const [imageUrlF, setImageUrl] = useState("");
  const [imageUrl1, setImageUrl1] = useState("");
  const [imageUrl2, setImageUrl2] = useState("");
  const [imageUrl3, setImageUrl3] = useState("");
  const [imageUrl4, setImageUrl4] = useState("");

  const [croppedImage, setCroppedImage] = useState(null);
  const [firstName, setFirstName] = useState("no Data");
  const [lastName, setLastName] = useState("no Data");
  const [email, setEmail] = useState("no Data");
  const [phone, setPhone] = useState("no Data");
  const [state, setState] = useState("no Data");
  const [district, setDistrict] = useState("no Data");
  const [street, setStreet] = useState("no Data");
  const [post, setPost] = useState("no Data");
  const [pin, setPin] = useState(0);

  const isUploadingRef = useRef(false);
  const isUploadingRef1 = useRef(false);
  const isUploadingRef2 = useRef(false);
  const isUploadingRef3 = useRef(false);
  const isUploadingRef4 = useRef(false);

  const user = useSelector((state) => state?.userAuth.token);

  const onChange2 = async ({ fileList: newFileList }) => {
    setFileList2(newFileList);
    if (fileList2.length > 0 && !isUploadingRef1.current) {
      isUploadingRef1.current = true;
      const formData = new FormData();
      formData.append("file", fileList2[0].originFileObj);
      formData.append(
        "upload_preset",
        import.meta.env.VITE_APP_CLOUDINARY_NAME
      );

      const res = await axios.post(
        import.meta.env.VITE_APP_CLOUDINARY_PATH,
        formData
      );

      const imageUrl = res.data.secure_url;
      setImageUrl1(imageUrl);
      toast.success("image added successfully");
    }
  };

  const onChange3 = async ({ fileList: newFileList }) => {
    setFileList3(newFileList);
    if (fileList3.length > 0 && !isUploadingRef2.current) {
      isUploadingRef2.current = true;
      const formData = new FormData();
      formData.append("file", fileList3[0].originFileObj);
      formData.append(
        "upload_preset",
        import.meta.env.VITE_APP_CLOUDINARY_NAME
      );

      const res = await axios.post(
        import.meta.env.VITE_APP_CLOUDINARY_PATH,
        formData
      );

      const imageUrl = res.data.secure_url;
      setImageUrl2(imageUrl);
      toast.success("image added successfully");
    }
  };

  const onChange4 = async ({ fileList: newFileList }) => {
    setFileList4(newFileList);
    if (fileList4.length > 0 && !isUploadingRef3.current) {
      isUploadingRef3.current = true;
      const formData = new FormData();
      formData.append("file", fileList4[0].originFileObj);
      formData.append(
        "upload_preset",
        import.meta.env.VITE_APP_CLOUDINARY_NAME
      );

      const res = await axios.post(
        import.meta.env.VITE_APP_CLOUDINARY_PATH,
        formData
      );

      const imageUrl = res.data.secure_url;
      setImageUrl3(imageUrl);
      toast.success("image added successfully");
    }
  };

  const onChange5 = async ({ fileList: newFileList }) => {
    setFileList5(newFileList);
    if (fileList5.length > 0 && !isUploadingRef4.current) {
      isUploadingRef4.current = true;
      const formData = new FormData();
      formData.append("file", fileList5[0].originFileObj);
      formData.append(
        "upload_preset",
        import.meta.env.VITE_APP_CLOUDINARY_NAME
      );

      const res = await axios.post(
        import.meta.env.VITE_APP_CLOUDINARY_PATH,
        formData
      );

      const imageUrl = res.data.secure_url;
      setImageUrl4(imageUrl);
      toast.success("image added successfully");
    }
  };

  const getData = useCallback(async () => {
    try {
      const res = await profileEditDataDetails(user);
      if (res.data.success === true) {
        const uData = res.data.user;
        setFirstName(uData.firstName);
        setLastName(uData.lastName);
        setEmail(uData.email);
        setPhone(uData.phone);
        setState(uData.address.state);
        setDistrict(uData.address.district);
        setStreet(uData.address.localArea);
        setPost(uData.address.post);
        setPin(uData.address.pin);
        setImageUrl(uData.Profile);
        setImageUrl1(uData.license.front);
        setImageUrl2(uData.license.back);
        setImageUrl3(uData.userInfo.front);
        setImageUrl4(uData.userInfo.back);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch user data");
    }
  }, [user]);

  useEffect(() => {
    getData();
  }, [getData, refresh]);

  const onChange1 = async ({ fileList: newFileList }) => {
    setFileList1(newFileList);
    if (newFileList.length > 0 && !isUploadingRef.current) {
      isUploadingRef.current = true; // Set to true to indicate upload in progress
      cropAndUploadImage(newFileList[0].originFileObj);
    }
  };

  const cropAndUploadImage = async (file) => {
    try {
      const image = new Image();
      image.src = URL.createObjectURL(file);
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Set the canvas dimensions to create a square (1/1) aspect ratio
        const size = Math.min(image.width, image.height);
        canvas.width = size;
        canvas.height = size;

        // Calculate crop position for centering
        const offsetX = (image.width - size) / 2;
        const offsetY = (image.height - size) / 2;

        ctx.drawImage(image, offsetX, offsetY, size, size, 0, 0, size, size);

        canvas.toBlob(async (blob) => {
          const croppedFile = new File([blob], file.name, {
            type: file.type,
            lastModified: Date.now(),
          });
          const formData = new FormData();
          formData.append("file", croppedFile);
          formData.append(
            "upload_preset",
            import.meta.env.VITE_APP_CLOUDINARY_NAME
          );

          const res = await axios.post(
            import.meta.env.VITE_APP_CLOUDINARY_PATH,
            formData
          );

          const imageUrl = res.data.secure_url;
          setImageUrl(imageUrl);
          toast.success("image added successfully");
        }, file.type);
      };
    } catch (error) {
      console.error("Error cropping image:", error);
    }
  };

  const onImageCrop = useCallback((file) => {
    setCroppedImage(file.url);
    console.log(croppedImage);
    console.log();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formValues = {};
    const formInputs = e.target.querySelectorAll("[name]");
    formInputs.forEach((input) => {
      formValues[input.name] = input.value;
    });
    const datas = {
      formValues: formValues,
      image1: imageUrlF,
      image2: imageUrl1,
      image3: imageUrl2,
      image4: imageUrl3,
      image5: imageUrl4,
    };

    await editProfileData(user, datas)
      .then((res) => {
        if (res.data.success === true) {
          parent();
          toast.success("profile updated successfully ...");

          if (refresh === true) {
            setRefresh(false);
          } else {
            setRefresh(true);
          }
        }
      })
      .catch(() => {
        toast.error("something went wrong in server!");
      });
  };

  const parent = () => {
    sendDataToParent("dfs");
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-start ">
        <div
          className="w-[400px] h-[520px] border border-black p-3"
          style={{
            boxShadow:
              " inset 0 -3em 3em rgba(0, 0, 0, 0.1),0 0 0 2px rgb(255, 255, 255),0.3em 0.3em 1em rgba(0, 0, 0, 0.3)",
          }}
        >
          <div className="w-full h-16 flex justify-center items-center">
            <h1 className="text-center font-mono font-bold text-2xl">
              {" "}
              Profile
            </h1>
          </div>

          <div className="flex justify-between h-46  mb-5 ">
            <div className="w-[30%] h-46 flex flex-col">
              <h1 className="font-mono font-bold"> add profile</h1>

              <ImgCrop className="w-full" showGrid aspect={1 / 1} onImageCrop={onImageCrop}>
                <Upload
                  className="pl-2"
                  action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                  listType="picture-card"
                  fileList={fileList1}
                  onChange={onChange1}
                
                >
                  {fileList1.length < 1 && "+ Upload"}
                </Upload>
              </ImgCrop>
            </div>
            <div className="w-[70%] h-46 pb-5 p-2  pr-0 font-mono ">
              <div className="h-[19px] w-[100%] flex justify-center items-center font-mono font-bold ">
                <h1>Address</h1>
              </div>
              <div className="h-[94%] w-[100%]  p-1 pt-2">
                <div className="flex justify-center w-full mb-1">
                  <h1 className="w-[30%] text-center">State:</h1>{" "}
                  <span className="w-[70%] flex justify-end">
                    <input
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      type="text"
                      className="border border-black font-mono font-bold"
                      name="state"
                    />{" "}
                  </span>
                </div>
                <div className="flex justify-center w-full mb-1">
                  <h1 className="w-[30%] text-center">District:</h1>{" "}
                  <span className="w-[70%] flex justify-end">
                    <input
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      type="text"
                      className="border border-black font-mono font-bold"
                      name="district"
                    />{" "}
                  </span>
                </div>
                <div className="flex justify-center w-full mb-1">
                  <h1 className="w-[30%] text-center">Street:</h1>
                  <span className="w-[70%] flex justify-end">
                    <input
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      type="text"
                      className="border border-black font-mono font-bold"
                      name="street"
                    />{" "}
                  </span>
                </div>
                <div className="flex justify-center w-full mb-1">
                  <h1 className="w-[30%] text-center">Pin:</h1>
                  <span className="w-[70%] flex justify-end">
                    <input
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      type="number"
                      className="border border-black font-mono font-bold"
                      name="pin"
                    />{" "}
                  </span>
                </div>
                <div className="flex justify-center w-full mb-1">
                  <h1 className="w-[30%] text-center">Post:</h1>
                  <span className="w-[70%]flex justify-end">
                    <input
                      value={post}
                      onChange={(e) => setPost(e.target.value)}
                      type="text"
                      className="border border-black font-mono font-bold"
                      name="post"
                    />{" "}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-10 border border-black flex justify-center items-center mb-3">
            <div className="w-[50%] h-10 flex items-center justify-center">
              {" "}
              <h1>First Name:</h1>{" "}
            </div>
            <div className="w-[50%] h-10 flex items-center justify-center">
              {" "}
              <input
                type="text"
                className="border border-black font-mono font-bold"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />{" "}
            </div>
          </div>

          <div className="w-full h-10 border border-black flex justify-center items-center mb-3">
            <div className="w-[50%] h-10 flex items-center justify-center">
              {" "}
              <h1>Last Name:</h1>{" "}
            </div>
            <div className="w-[50%] h-10 flex items-center justify-center">
              {" "}
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="border border-black font-mono font-bold"
                name="lastName"
              />{" "}
            </div>
          </div>

          <div className="w-full h-10 border border-black flex justify-center items-center mb-3">
            <div className="w-[50%] h-10 flex items-center justify-center">
              {" "}
              <h1>Phone:</h1>{" "}
            </div>
            <div className="w-[50%] h-10 flex items-center justify-center">
              {" "}
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="text"
                className="border border-black font-mono font-bold"
                name="phone"
              />{" "}
            </div>
          </div>

          <div className="w-full h-10 border border-black flex justify-center items-center ">
            <div className="w-[50%] h-10 flex items-center justify-center">
              {" "}
              <h1>Email:</h1>{" "}
            </div>
            <div className="w-[50%] h-10 flex items-center justify-center">
              {" "}
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                className="border border-black font-mono font-bold"
                name="email"
              />{" "}
            </div>
          </div>
        </div>
        <div
          className="w-[400px] h-[520px] border border-black ml-10 p-3"
          style={{
            boxShadow:
              " inset 0 -3em 3em rgba(0, 0, 0, 0.1),0 0 0 2px rgb(255, 255, 255),0.3em 0.3em 1em rgba(0, 0, 0, 0.3)",
          }}
        >
          <div className="h-14 flex items-center pl-10 font-mono font-bold text-xl">
            <h1>License details</h1>
          </div>
          <div className="w-full flex border border-black ">
            <div className="w-1/2 ">
              <h1 className="pl-4 font-mono font-bold">front Side</h1>
              <div
                className="w-full flex pl-10 justify-center "
                style={{
                  backgroundImage: `url(${imageUrl1})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              >
                <Upload
                  action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                  listType="picture-card"
                  fileList={fileList2}
                  onChange={onChange2}
                >
                  {fileList2.length < 1 && "+ Upload"}
                </Upload>
              </div>
            </div>
            <div className="w-1/2 ">
              <h1 className="pl-4 font-mono font-bold">Back Side</h1>
              <div
                className="w-full flex pl-10 justify-center "
                style={{
                  backgroundImage: `url(${imageUrl2})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                }}
              >
                <Upload
                  action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                  listType="picture-card"
                  fileList={fileList3}
                  onChange={onChange3}
                >
                  {fileList3.length < 1 && "+ Upload"}
                </Upload>
              </div>
            </div>
          </div>

          <div className="h-14 flex items-center pl-10 font-mono font-bold text-xl">
            <h1>Identity</h1>
          </div>
          <div className="w-full flex border border-black ">
            <div className="w-1/2 ">
              <h1 className="pl-4 font-mono font-bold">front Side</h1>
              <div
                className="w-full flex pl-10 justify-center "
                style={{
                  backgroundImage: `url(${imageUrl3})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              >
                <Upload
                  action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                  listType="picture-card"
                  fileList={fileList4}
                  onChange={onChange4}
                >
                  {fileList4.length < 1 && "+ Upload"}
                </Upload>
              </div>
            </div>
            <div className="w-1/2 ">
              <h1 className="pl-4 font-mono font-bold">Back Side</h1>
              <div
                className="w-full flex pl-10 justify-center "
                style={{
                  backgroundImage: `url(${imageUrl4})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              >
                <Upload
                  action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                  listType="picture-card"
                  fileList={fileList5}
                  onChange={onChange5}
                >
                  {fileList5.length < 1 && "+ Upload"}
                </Upload>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <button
              style={{
                color: "black",
                boxShadow:
                  " inset 0 -3em 3em rgba(0, 0, 0, 0.1),0 0 0 2px rgb(255, 255, 255),0.3em 0.3em 1em rgba(0, 0, 0, 0.3)",
              }}
              className="bg-green-400 font-mono mt-7 text-lg btn w-1/2 h-12  rounded"
              type="submit"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
EditProfileComponent.propTypes = {
  sendDataToParent: PropTypes.func.isRequired,
  authorized: PropTypes.bool.isRequired,
};

export default EditProfileComponent;
