import axios from "axios";
import { useEffect, useState } from "react";
import { userApi } from "../../Apis/api";
import toast from "react-hot-toast";
import { Select,Space  } from 'antd';


function BikeList() {
  console.log("entering the data");
  const [bike, setBike] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  useEffect(() => {
    axios.get(`${userApi}getBikeInformation`).then((res) => {
      if (res.data.success === true) {
        const bikes = res.data.bikes;
        setBike(bikes);
      } else {
        toast.error("Something went wrong!");
      }
    });
  }, []);

const onChangeCompany=(value)=>{
    console.log(`selected ${value}`);
    setSelectedBrand(value);
}
const onSearchCompany=(value)=>{
    console.log('search:', value);
}

  const onChange = (value) => {
    console.log(`selected ${value}`);
    setSelectedBrand(value);
  };

  const onSearch = (value) => {
    console.log('search:', value);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const filteredBikes = selectedBrand
    ? bike.filter((data) => data.brandName === selectedBrand)
    : bike;

  return (
    <>
    <div className="w-full h-[60px] flex justify-end p-5" ><div className="w-1/2 flex justify-around font-mono font-bold underline text-sky-600"> <a>Low price</a><a >heigh price</a><a >Normal </a></div></div>
      <div className="flex justify-center">
        <div className="p-4">
          <div className="w-[400px] h-[5 00px] p-3 flex pt-3 justify-end">
            <div className="w-[350px] h-full p-4 border border-black " style={{boxShadow:" inset 0 -3em 3em rgba(0, 0, 0, 0.1),0 0 0 2px rgb(255, 255, 255),0.3em 0.3em 1em rgba(0, 0, 0, 0.3)"}}>
              <div className="w-full h-20 border border-black flex justify-center pt-5 mb-2-">
                <h1 className="text-center font-mono font-extrabold text-2xl ">
                  Filter OUT
                </h1>
              </div>
              <div className="w-full h-16 mt-4  border border-grey-900 flex  flex-col ">
                <span>Pickup Date</span>
                <div className="flex justify-center ">
                  <input className="w-[125px] h-9 border border-grey-900 mr-1" type="date" />
                  <input className="w-[125px] h-9 border border-grey-900" type="time" />
                </div>
              </div>
              <div className="w-full mt-4  h-16 flex flex flex-col justify-end border border-grey-900 ">
                <span>DropUP Date</span>
                <div className="flex justify-center">
                  <input className="w-[125px] h-9 mr-1 border-slate-950 border border-grey-900" type="date" />
                  <input className="w-[125px] h-9 border border-grey-900" type="time" />
                </div>
              </div>
              <div className="mt-4 flex flex-col border border-grey-900">
                <span>Brand Name</span>
                <div className="w-full flex justify-center ">
                <Select
                 className="w-[200px] "
                  showSearch
                  placeholder="Select a brand"
                  optionFilterProp="children"
                  onChange={onChange}
                  onSearch={onSearch}
                  filterOption={filterOption}
                >
                  {bike.map((data) => (
                    <Select.Option key={data.brandName} value={data.brandName}>
                      {data.BrandName}
                    </Select.Option>
                  ))}
                </Select>
                </div>
               
              </div>
              <div className="mt-4 flex flex-col border border-grey-900">
                <span>Company Name</span>
                <div className="w-full flex justify-center ">
                <Select
                 className="w-[200px] "
                  showSearch
                  placeholder="Select a brand"
                  optionFilterProp="children"
                  onChange={onChangeCompany}
                  onSearch={onSearchCompany}
                  
                >
                  {bike.map((data) => (
                    <Select.Option key={data.companyName} value={data.companyName}>
                      {data.companyName}
                    </Select.Option>
                  ))}
                </Select>
                </div>
               
              </div>
              <div className="w-full flex justify-center">
                <button className="bg-green-700 text-white font-bold px-12 mt-8 py-2 rounded focus:outline-none shadow hover:bg-blue-700 transition-colors">
                  Search Now
                </button>
              </div>
            </div>
          </div>
        </div>
      
        <div className="w-2/3 p-10 h-[700px] flex justify-center overflow-y-auto">
  <div className="flex flex-col">
    {filteredBikes.length > 0 ?  (filteredBikes.map((data, index) =>
      data.requestStatus === "completed" && data.available===true ? (
        <div key={index} className="w-[750px] h-[250px] flex justify-between p-3 mb-3">
          <div className="border border-black w-[350px] h-[230px]" style={{ boxShadow: "inset 0 -3em 3em rgba(0, 0, 0, 0.1),0 0 0 2px rgb(255, 255, 255),0.3em 0.3em 1em rgba(0, 0, 0, 0.3)" }}>
            <img
              className="w-full h-full object-cover"
              src={data.image[0]}
              alt="image"
            />
          </div>
          <div className="w-[400px] h-[230px] ml-2 border border-black" style={{ boxShadow: "inset 0 -3em 3em rgba(0, 0, 0, 0.1),0 0 0 2px rgb(255, 255, 255),0.3em 0.3em 1em rgba(0, 0, 0, 0.3)" }}>
            <div className="w-full font-bold text-2xl h-[20px] font-mono text-center">
              <h1>{data.name}</h1>
            </div>
            <div className="flex flex-col h-[55px] font-mono">
              <span>Location to choose</span>
              <div className="w-full flex justify-center p-1">
                <Space direction="vertical" style={{ width: '100%' }}>
                {/* Add the Select component here */}
            <Select
              size="small"
              defaultValue="Choose a location"
              style={{ width: 200 }}
            >
          
              {data.locations.map((location, i) => (
                <Select.Option key={i} value={location}>
                  {location}
                </Select.Option>
              ))}
            </Select>
                </Space>
              </div>
            </div>
            <div className="font-mono font-light h-[25px]">
              <h1>Rent per day: {data.rentPerHour}</h1>
            </div>
            <div className="h-[50px] w-full flex justify-around font-mono">
              <div className="border border-black w-[130px] text-center">
                <h1>current Date</h1>
                <span>Time:</span>
              </div>
              <div className="border flex justify-center border-black w-[50px] pt-2 rounded-full">
                <h1>To</h1>
              </div>
              <div className="border border-black w-[130px] text-center">
                <h1>Final Date</h1>
                <span>Time:</span>
              </div>
            </div>
            <div className="h-[35px] font-mono font-bold">
              <h1>total Calculated amount:</h1>
            </div>
            <div className="flex justify-around">
              <button className="bg-yellow-300 text-white font-bold px-10 py-2 rounded focus:outline-none shadow hover:bg-blue-700 transition-colors">
                More info
              </button>
              <button className="bg-green-700 text-white font-bold px-12 py-2 rounded focus:outline-none shadow hover:bg-blue-700 transition-colors">
                Book Now!
              </button>
            </div>
          </div>
        </div>
      ) : null
    )): (<div className="font-mono text-center items-center text-3xl text-amber-600"> page Empty !</div>)}
   
  </div>
</div>

      </div>
    </>
  );
}

export default BikeList;
