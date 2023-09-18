import { Input, InputNumber, Select,Spin,Space } from "antd";
import { FieldTimeOutlined, FireOutlined } from "@ant-design/icons";
import {  useState } from "react";
import PropTypes from 'prop-types';
import { partnerApi } from "../../Apis/api";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";




function AddBike({onDataReceived}) {
  const [dataToSend, setDataToSend] = useState("false");
  const { Option } = Select;
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  // Form model to store field values
  const [formValues, setFormValues] = useState({
    bikeName: "",
    bikeBrand: "",
    rentPerHour: null,
    bikeCategory: "New",
    bikeCC: null,
    plateNumber: "",
  });



  const partner = useSelector((state) => {
    return state.partnerAuth.PartnerToken;
  });

  // ------------------------image management ------------------------//
  let image = [];
  const handleImage = (e) => {
    const file = e.target.files;
    console.log(file);
    for (let i = 0; i < file.length; i++) {
      const fileType = file[i].type;
      const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
      if (validImageTypes.includes(fileType)) {
        setFiles((prevFiles) => [...prevFiles, file[i]]);
      } else {
        toast.error("Invalid image type");
      }
    }
  };

  // -------------------------------form managements -------------------------------//
  const handleSubmit = async (e) => {
    setUploading(true);
    e.preventDefault();
    setFormValues(e.target);
    let currentIndex = 0;
    const formData = new FormData();
    const uploadImage = async () => {
      if (currentIndex < files.length) {
        formData.append("file", files[currentIndex]);
        formData.append(
          "upload_preset",
          import.meta.env.VITE_APP_CLOUDINARY_NAME
        );
        try {
          const res = await axios.post(
            import.meta.env.VITE_APP_CLOUDINARY_PATH,
            formData
          );
          const imageUrl = res.data.secure_url;
          image.push(imageUrl);
          currentIndex++;
          if (currentIndex === files.length) {
            axios
              .post(`${partnerApi}AddBike`, { data: formValues, image: image, partner: partner })
              .then((res) => {
                if (res.data.success === true) {
                  setUploading(false);
                    setDataToSend("false");
                    onDataReceived(dataToSend);
                  setUploading(false);
                  toast.success("Product successfully uploaded");
                } else {
                  toast.error("something went wrong");
                }
              });
          } else {
            await uploadImage();
          }
        } catch (error) {
          console.log(error.message);
          toast.error("something went wrong in uploading image");
        }
      }
    };
    // Start the image upload process
    await uploadImage();
  };
  
  // ----------------------------------------form submission end ----------------------------------------//
  const handleFieldChange = (e) => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });
  };

  const handleNumberFieldChange = (id, value) => {
    setFormValues({ ...formValues, [id]: value });
  };

  return (
    <>

    {uploading ? <div className="w-1/4 m-24 p-5 flex flex-col justify-center items-center" >
  <div className="bg-white border border-gray-300 rounded-lg h-40 w-full flex flex-col justify-center items-center"   style={{boxShadow: "inset 0 -3em 3em rgba(0, 0, 0, 0.1), 0 0 0 2px rgb(255, 255, 255), 0.3em 0.3em 1em rgba(0, 0, 0, 0.3)", }} >
    <div className="w-full flex justify-center ">
      <Space size="middle">
        <Spin size="large" />
      </Space>
    </div>
    <div className="w-full flex justify-center">
      <span className="dots-loader">Loading&#8230;</span>
    </div>
  </div>
</div>
:

<div className="w-[700px] flex justify-center mt-10">
<div
  className="w-[500px]  p-4 rounded"
  style={{
    boxShadow:
      "inset 0 -3em 3em rgba(0, 0, 0, 0.1), 0 0 0 2px rgb(255, 255, 255), 0.3em 0.3em 1em rgba(0, 0, 0, 0.3)",
  }}
>
  <form onSubmit={handleSubmit}>
    <div
      className="h-[70px] bg-cyan-500 rounded"
      style={{
        boxShadow:
          "inset 0 -3em 3em rgba(0, 0, 0, 0.1), 0 0 0 2px rgb(255, 255, 255), 0.3em 0.3em 1em rgba(0, 0, 0, 0.3)",
      }}
    >
      <h1 className="font-mono text-2xl font-extrabold text-center pt-5">
        ADD A BIKE
      </h1>
    </div>
    <div className="h-[70px] pt-5">
      <label htmlFor="bikeName">Name of the bike</label>
      <Input
        className="h-[40px] text-lg"
        id="bikeName"
        placeholder="Name"
        value={formValues.bikeName}
        onChange={handleFieldChange}
      />
    </div>
    <div className="h-[70px] pt-5">
      <label htmlFor="bikeBrand">Brand of the Bike</label>
      <Input
        className="h-[40px] text-lg"
        id="bikeBrand"
        placeholder="Brand"
        value={formValues.bikeBrand}
        onChange={handleFieldChange}
      />
    </div>
    <div className="h-[70px] pt-5">
      <label htmlFor="rentPerHour">Rent Per Hour</label>
      <InputNumber
        className="text-lg"
        id="rentPerHour"
        addonBefore={<FieldTimeOutlined />}
        prefix="$"
        style={{ width: "100%", height: "48px" }}
        value={formValues.rentPerHour}
        onChange={(value) =>
          handleNumberFieldChange("rentPerHour", value)
        }
      />
    </div>
    <div className="h-[70px] pt-5">
      <label htmlFor="bikeCategory">Category</label>
      <br />
      <Select
        id="bikeCategory"
        style={{ width: 200, height: "50px" }}
        defaultValue="New"
        value={formValues.bikeCategory}
        onChange={(value) =>
          handleFieldChange({ target: { id: "bikeCategory", value } })
        }
      >
        <Option value="New">New</Option>
        <Option value="Racing">Racing</Option>
        <Option value="Adventure">Adventure</Option>
        <Option value="Normal">Normal</Option>
        <Option value="Old">Old</Option>
        <Option value="Branded">Branded</Option>
        <Option value="Tripping">Tripping</Option>
        <Option value="E-bike">E-bike</Option>
      </Select>
    </div>
    <div className="h-[70px] pt-5">
      <label htmlFor="bikeCC">CC</label>
      <InputNumber
        id="bikeCC"
        addonBefore={<FireOutlined />}
        prefix="@"
        style={{ width: "100%" }}
        value={formValues.bikeCC}
        onChange={(value) => handleNumberFieldChange("bikeCC", value)}
      />
    </div>
    <div className="h-[70px] pt-5">
      <label htmlFor="plateNumber">Plate Number</label>
      <Input
        className="h-[40px] text-lg"
        id="plateNumber"
        placeholder="Name"
        value={formValues.plateNumber}
        onChange={handleFieldChange}
      />
    </div>
    <div className="h-[150px] pt-5">
      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
        htmlFor="multiple_files"
      >
        Bike Images
      </label>
      <input
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:border-gray-600   dark:placeholder-gray-400"
        id="multiple_files"
        name="images"
        type="file"
        multiple
        onChange={handleImage}
      />
    </div>

    <div className="flex justify-center">
      <button
        className="bg-green-600 h-14 text-white font-bold px-16 py-2 rounded focus:outline-none shadow hover:bg-green-900 transition-colors"
        type="submit"
      >
        Add Bike Now
      </button>
    </div>
  </form>
</div>
</div>  
}




    </>
  );
}
AddBike.propTypes = {
  onDataReceived: PropTypes.func.isRequired,
  authorized: PropTypes.bool.isRequired, 
};
export default AddBike;
