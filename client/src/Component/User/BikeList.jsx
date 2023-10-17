import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { userApi } from "../../Apis/api";
import toast from "react-hot-toast";
import { Select, Space ,Drawer  } from "antd";
import Loading from "../../Component/Loading/loading";
import $ from "jquery";
import "timepicker/jquery.timepicker.min.css";
import "timepicker/jquery.timepicker.min.js";
import { useDispatch, useSelector } from "react-redux";

import moment from "moment";
import { addDateTime,bookedDetails } from "../../Redux/storeSlices/dateAndTime";
import {setBikeList,filterCategory,filterBrand,filterLow,filterHigh,filterNormal,searching} from "../../Redux/storeSlices/bikeList"
import { notification } from "antd";
import { useNavigate } from "react-router-dom";


function BikeList() {
  const [bikeArray,setBikeArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrandName,SetSelectedBrandName] = useState("noValue")
  const [selectCategory,setSelectedCategory] = useState("noValue")
  const [loadLocation,setLoadLocation] = useState("noValue");
  const [locations,setLocations]=useState([])
  const [bikesingle,setBikesingle] = useState([])
  const date = useSelector((state) => {
    return state?.dateAndTime;
  });
  const [check,setCheck] =useState(true)
  const [pickupDate, setPickupDate] = useState(date.startDate || "");
  const [dropDate, setDropDate] = useState(date.endDate || "");
  const [time1, setTime1] = useState(date.startTime || "");
  const [time2, setTime2] = useState(date.endTime || "");
  const [selectedLocation, setSelectedLocation] = useState("Choose a location");
  

  const navigate = useNavigate()
  const [Brand,setBrand] = useState([])
  useEffect(() => {
    axios.get(`${userApi}getBikeInformation?location=${loadLocation}`).then((res) => {
      if (res.data.success === true) {
        const bikes = res.data.bikes;
        const brand = res.data.Brand;
        const locations = res.data.locations;
        const single = res.data.bikesingle
        setBikesingle(single)
        setLocations(locations)
        setBikeArray(bikes)
        setDrawerData(bikes[0])
        dispatch(setBikeList(bikes))
        setBrand(brand)
        setLoading(false);
      } else {
        toast.error("Something went wrong!");
      }
    });
  }, [loadLocation]);

  const filteredBikes = useSelector((state)=>{
    return state.Bike
  }) ;


  
  const pickupTimeRef = useRef(null);
  const dropTimeRef = useRef(null);
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useDispatch();

  useEffect(() => {
    $(pickupTimeRef.current).timepicker();
    $(dropTimeRef.current).timepicker();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      pickupDate === "" ||
      !pickupTimeRef.current.value ||
      dropDate === "" ||
      !dropTimeRef.current.value
    ) {
      openNotificationWithIcon("warning");
    } else {
      //--------------------------------time difference ---------------------------------------//
      const pickupTimeLine = pickupTimeRef.current.timepickerObj.selectedValue;
      const dropTimeLine = dropTimeRef.current.timepickerObj.selectedValue;
      setTime1(pickupTimeLine);
      setTime2(dropTimeLine);
      const pickupTime = moment(pickupTimeLine, "hh:mm A");
      const dropTime = moment(dropTimeLine, "hh:mm A");
      const timeDifferenceMinutes = dropTime.diff(pickupTime, "minutes");
      const hoursDifference = Math.floor(timeDifferenceMinutes / 60);
      // ------------------------------day difference ---------------------------------------//
     
      const pickUpDateLine = new Date(pickupDate);
      const dropDateLine = new Date(dropDate);
      const timeDifference = dropDateLine - pickUpDateLine;
      const dayDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

      if (dayDifference < 0) {
        toast.error("invalid date please choose a valid date...");
        setCheck(false)
      } else {
        setCheck(true)
        const information = {
          startingDate: pickupDate,
          endingDate: dropDate,
          startingTime: pickupTimeLine,
          endingTime: dropTimeLine,
          differenceInDays: dayDifference===0 ? 1 : dayDifference,
          differenceInHour: hoursDifference ===0 ? 1: hoursDifference
        };
      
        dispatch(addDateTime(information));
         
         dispatch(setBikeList(bikeArray))
        if(selectCategory !== "noValue" ){
          dispatch(filterCategory(selectCategory))
        }
        if(selectedBrandName !== "noValue"){
          dispatch(filterBrand(selectedBrandName))
        }
    
        toast.success("Data was filtered successfully")
      }
    }


  };

  // -----------------------------------------min date showing in calander---------------------------------------------------------------//

  const currentDate = new Date().toISOString().split("T")[0];
  // --------------------------------------------notifications for when the user is not clicking the data-------------------------------------//

  const openNotificationWithIcon = (type) => {
    api[type]({
      message: "Reminder",
      description:
        "Please select the PICKUP date and time and select the DROP date and time to get the information for You",
    });
  };

  // ---------------------------------------------booking onwords---------------------------------------------------------------//




  const handleBooking = (day,rent,hour,id,locations) => {
    
    const inputValue = Math.round(rent / 24)*hour+day*rent
  
    if(selectedLocation==="Choose a location"){
      toast.error("please select a location")
    }else{
      const data = locations.find((value)=>value === selectedLocation)
  
      if(data){
      
        const information = {
          startingDate: pickupDate,
          endingDate: dropDate,
          startingTime: time1,
          endingTime: time2,
          differenceInDays:day,
          differenceInHour:hour,
          rent:rent,
          total:inputValue,
          bike:id,
          location:selectedLocation,
          helmet:1
        };
        let correctInfoChecking = true
        for (const key in information) {
          if (Object.prototype.hasOwnProperty.call(information, key)) {
            const value = information[key];
            if (value === "" || value === false) {
            
              correctInfoChecking = false;
            }
          }
        }
        if(correctInfoChecking===true){
          if(check===true){
            toast.success("sucssess");
            dispatch(bookedDetails(information))
            navigate('/order')
          }else{
            toast.error("invalid date please select a correct date !")
          }
     
        }else{
          toast.error(`please select the correct date and time`)
        }
        
      }else{
        toast.error("select a location")
      }
      }
  }
  const options = [
    { label: "All", value: "All" },
    { label: "New", value: "New" },
    { label: "Racing", value: "Racing" },
    { label: "Adventure", value: "Adventure" },
    { label: "Normal", value: "Normal" },
    { label: "Old", value: "Old" },
    { label: "Branded", value: "Branded" },
    { label: "Tripping", value: "Tripping" },
    { label: "E-bike", value: "E-bike" },
  ];

  const handleChange = (value) => {
    if(value=="All" ){
      setSelectedCategory("noValue")
    }else{
      setSelectedCategory(value)
    }
  };

  const options1 = Brand.map((brandName) => ({ label: brandName.name, value: brandName.name }));
  options1.unshift({ label: 'All', value: 'All' });
  const handleChange1 = (value) => {
    if(value=="All" ){
      SetSelectedBrandName("noValue")
    }else{
      SetSelectedBrandName(value)
    }
  };

  const ordering =(value)=>{
     if(value==="low"){
        dispatch(filterLow("low"))
     }else if(value==="high"){
       dispatch(filterHigh("high"))
     }else{
       dispatch(filterNormal("all"))
     }
  }
const searchRef = useRef("")
   const searchNow =()=>{
    dispatch(setBikeList(bikeArray))
    const value =searchRef.current.value
    dispatch(searching(value))

   }
const handleChangeLocation = (value)=>{
  setLoadLocation(value)
}
const [open, setOpen] = useState(false);
const [drawerData,setDrawerData] = useState({})




const showDrawer = (data) => {
 
  const one =bikesingle.find((value)=>{return value._id == data._id})
  console.log(one);
  setDrawerData(one)
  setOpen(true);
};









const onClose = () => {
  setOpen(false); 
};
  return (
    <>
      <div className="w-full h-[60px] flex justify-end p-5">
        <div className="w-1/2 flex justify-around font-mono font-bold  text-sky-600">
          {" "}
          <div className="w-[140px] flex pr-2" >
            <div className="w-[30%] h-full flex justify-end items-center">
            <i className="fa-solid fa-map-location" style={{color: "#03070c"}}></i>

            </div>
            <div className="w-[70%] h-full flex items-center pt-1">
            <Select
            defaultValue="Location"
            style={{ width: 120 }}
            bordered={false}
            onChange={handleChangeLocation}
           
          >
            {locations.map((location, i) => (
                  <Select.Option key={i} value={location.name}>
                    {location.name}
                    </Select.Option>
                  ))}
            </Select>
                             
            </div>
          </div>
      
          <a  type="button" className="animate-bounce underline animate-infinite text-blue-900 shadow-lg shadow-red transition-transform transform-gpu hover:scale-105 focus:shadow-none active:shadow-none active:scale-100" onClick={()=>{ordering("low")}}>Low price</a>
          <a className="animate-bounce animate-infinite underline text-blue-900 shadow-lg shadow-red transition-transform transform-gpu hover:scale-105 focus:shadow-none active:shadow-none active:scale-100" onClick={()=>{ordering("high")}}>heigh price</a>
          <a className="animate-bounce animate-infinite underline text-blue-900 shadow-lg shadow-red transition-transform transform-gpu hover:scale-105 focus:shadow-none active:shadow-none active:scale-100" onClick={()=>{ordering("all")}}>Relevance </a>
          <input type="text" ref={searchRef} className="  shadow underline-none border border-blue-900 pl-4" onChange={searchNow}  placeholder="Search"/>
          <div className="w-20 h-full flex "> <span>count:</span><span className="font-bold  text-2xl">{filteredBikes.length}</span></div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="p-4 ">
          <div className="w-[290px] h-[500px] p-3 flex pt-3 justify-end border border-blue-800" style={{boxShadow:" inset 0 -3em 3em rgba(0, 0, 0, 0.1),0 0 0 2px rgb(255, 255, 255),0.3em 0.3em 1em rgba(0, 0, 0, 0.3)"}}>
            <form onSubmit={handleSubmit}>
              <div className="w-full h-20 border border-black flex justify-center pt-5 mb-2">
                <h1 className="text-center font-mono font-extrabold text-2xl">
                  Filter!
                </h1>
              </div>
              <div className="w-full h-16 mb-8 mt-3 border border-grey-900 flex flex flex-col">
                <span>Pickup Date</span>
                <div>
                  <input
                    value={pickupDate}
                    className="w-[125px] h-9 border border-grey-900 mr-1"
                    type="date"
                    min={currentDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                  />

                  <input
                   defaultValue={time1}
                    style={{
                      backgroundImage:
                        "url(https://i.pinimg.com/564x/42/ac/06/42ac0695e28df7528cdc5cde6b7ba8cd.jpg)",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right center",
                      backgroundSize: "auto 100%",
                      paddingLeft: "10px",
                      paddingRight: "60px",
                    }}
                    className="timepicker border w-[125px] h-9"
                    type="text"
                    ref={pickupTimeRef}
                  />
                </div>
              </div>
              <div className="w-full h-16 flex flex flex-col border border-grey-900">
                <span>DropUP Date</span>
                <div>
                  <input
                    className="w-[125px] h-9 mr-1 border-slate-950 border border-grey-900"
                    defaultValue={date.endDate}
                    min={currentDate}
                    type="date"
                    onChange={(e) => setDropDate(e.target.value)}
                  />
                  <input
                  defaultValue={time2}
                    style={{
                      backgroundImage:
                        "url(https://i.pinimg.com/564x/42/ac/06/42ac0695e28df7528cdc5cde6b7ba8cd.jpg)",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right center",
                      backgroundSize: "auto 100%",
                      paddingLeft: "10px",
                      paddingRight: "60px",
                    }}
                    className="timepicker border w-[125px] h-9"
                    type="text"
                    ref={dropTimeRef}
                  />
                </div>
              </div>
              <div className="w-full h-16 flex flex flex-col border border-grey-900 mt-2">
                <span>Brand Name</span>
                <div className="flex justify-center">
                <Select
                  size="middle"
                  placeholder="select Brand Name"
                  onChange={handleChange1}
                  style={{
                    width: 250,
                  }}
                  options={options1}
                />
                </div>
              </div>
              <div className="w-full h-16 flex flex flex-col border border-grey-900 mt-5">
                <span>Category</span>
                <div  className="flex justify-center">
                <Select
                  size="middle"
                placeholder="select Category"
                  onChange={handleChange}
                  style={{
                    width: 250,
                  }}
                  options={options}
                />
                </div>
              </div>
              <div className="w-full flex justify-center">
                {contextHolder}
                <button
                  className="bg-green-700 text-white font-bold px-12 mt-8 py-2 rounded focus:outline-none shadow hover:bg-blue-700 transition-colors"
                  type="submit"
                >
                  Search Now
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="w-2/3 p-10 h-[700px] flex justify-center overflow-y-auto">
          {loading ? (
            <Loading />
          ) : (
            <>
              <div className="flex flex-col">
                {filteredBikes.length > 0 ? (
                  filteredBikes.map((data, index) =>
                    data.requestStatus === "completed" &&
                    data.available === true ? (
                      <div
                        key={index}
                        className="w-[750px] h-[250px] flex justify-between p-3 mb-3"
                      >
                        <div
                          className="border border-black w-[350px] h-[230px]"
                          style={{
                            boxShadow:
                              "inset 0 -3em 3em rgba(0, 0, 0, 0.1),0 0 0 2px rgb(255, 255, 255),0.3em 0.3em 1em rgba(0, 0, 0, 0.3)",
                          }}
                        >
                          <img
                            className="w-full h-full object-cover"
                            src={data.image[0]}
                            alt="image"
                          />
                        </div>
                        <div
                          className="w-[400px] h-[230px] ml-2 border border-black"
                          style={{
                            boxShadow:
                              "inset 0 -3em 3em rgba(0, 0, 0, 0.1),0 0 0 2px rgb(255, 255, 255),0.3em 0.3em 1em rgba(0, 0, 0, 0.3)",
                          }}
                        >
                          <div className="w-full font-bold text-2xl h-[20px] font-mono text-center">
                            <h1>{data.name}</h1>
                          </div>
                          <div className="flex flex-col h-[55px] font-mono">
                            <span>Location to choose</span>
                            <div className="w-full flex justify-center p-1">
                              <Space
                                direction="vertical"
                                style={{ width: "100%" }}
                              >
                                {/* Add the Select component here */}
                                <Select
                                  defaultValue="select a location"
                                  onChange={(value) => setSelectedLocation(value)}
                                  size="small"
                                 
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
                            <h1>Rent per day: <i className="icon  rupee sign "></i>{data.rentPerHour}</h1>
                          </div>
                          <div className="h-[50px] w-full flex justify-around font-mono">
                            <div className="border border-black w-[130px] text-center">
                              {pickupDate == "" ? (
                                <h1>current Date</h1>
                              ) : (
                                <h1>{pickupDate}</h1>
                              )}
                              {time1 == "" ? (
                                <span>Time:</span>
                              ) : (
                                <h1>{time1}</h1>
                              )}
                            </div>
                            <div className="border flex justify-center border-black w-[50px] pt-2 rounded-full">
                              <h1>To</h1>
                            </div>
                            <div className="border border-black w-[130px] text-center">
                              {dropDate == "" ? (
                                <h1>final date</h1>
                              ) : (
                                <h1>{dropDate}</h1>
                              )}
                              {time2 == "" ? (
                                <span>Time:</span>
                              ) : (
                                <h1>{time2}</h1>
                              )}
                            </div>
                          </div>
                          <div className="h-[35px] font-mono font-bold flex">
                            <h1>total Calculated amount:</h1>
                            <span><i className="icon  rupee sign "></i>
                              {Math.floor(data.rentPerHour / 24) *
                                date.differenceInHour +
                                date.differenceInDays * data.rentPerHour ===0 ? data.rentPerHour :Math.floor(data.rentPerHour / 24) *
                                date.differenceInHour +
                                date.differenceInDays * data.rentPerHour}
                            </span>
                            
                          </div>
                          {data.isBooked ? <div className="flex justify-around  w-full h-10 "><div className="bg-blue-200 h-full w-1/2 flex justify-center items-center shadow rounded font-mono font-bold"><h1 className="text-red-600">Unavilable</h1></div></div>:
                          <div className="flex justify-around">
                           
                           <button onClick={() => showDrawer(data)} className="bg-yellow-300 text-white font-bold px-10 py-2 rounded focus:outline-none shadow hover:bg-blue-700 transition-colors">
                              More info
                            </button>

                            <Drawer width={800} title="BIKE DETAILS" placement="right" onClose={onClose} open={open}>
                            {drawerData ? (
                                  <div>
                                    <div>
                                      <h1 className="font-mono font-bold">Available picture of bike</h1>
                                    {
                                      drawerData.image.map((value,key)=>(
                                        <div className="w-[700px] h-[200px] grid grid-cols-2 border border-black overflow-y-scroll" key={key} >
                                             <div className="w-[300px] h-[200px]" style={{backgroundImage:`url(${value})`, backgroundRepeat:"no-repeat", backgroundSize:"cover"}}>
                                             
                                             </div>
                                        </div>
                                      
                                      ))
                                    }
                                    </div>
                                  <div className="w-[700px] h-[400px]  ">
                                  <p className="font-mono w-full h-10 ">Name : <span className="font-bold ext-center">{drawerData.name}</span></p>
                                    <p className="font-mono w-full h-10 ">Brand :<span className="font-bold text-center">{drawerData.BrandName}</span> </p>
                                    <p className="font-mono w-full h-10 ">cc :<span className="font-bold text-center">{drawerData.cc}</span> </p>
                                    <p className="font-mono w-full h-10 ">PlateNumber :<span className="font-bold text-center">{drawerData.PlateNumber}</span> </p>
                                    <p className="font-mono w-full h-10 ">Owner Name : <span className="font-bold text-center">{drawerData.partnerId.name }</span></p>
                                    <p className="font-mono w-full h-10 ">Category :<span className="font-bold text-center">{drawerData.NormalCategory}</span> </p>
                                    <p className="font-mono w-full h-10 ">date the bike added :<span className="font-bold text-center">{new Date(drawerData.date).toLocaleDateString()}</span> </p>
                                    <p className="font-mono w-full h-10">companyName :<span className="font-bold text-center"> {drawerData.companyName}</span></p>
                                    <p className="font-mono w-full h-10 ">District : <span className="font-bold text-center">{drawerData.district}</span></p>
                                    <p className="font-mono w-full h-10 ">Rent per Day :<span className="font-bold text-center">{drawerData.rentPerHour}</span> </p>
                                    <p className="font-mono w-full h-10 ">Plate number : <span className="font-bold text-center">{drawerData.PlateNumber}</span></p>
                                  </div>
                                  
                                  </div>
                                ) : (
                                  <p>No data to display in the Drawer.</p>
                                )}
                            </Drawer>

                            <button onClick={()=>{handleBooking(date.differenceInDays,data.rentPerHour,date.differenceInHour,data._id,data.locations)}} className="bg-green-700 text-white font-bold px-12 py-2 rounded focus:outline-none shadow hover:bg-blue-700 transition-colors">
                              Book Now!
                            </button>
                          </div>}
                        </div>
                      </div>
                    ) : null
                  )
                ) : (
                  <div className="font-mono text-center items-center text-3xl text-amber-600">
               
                      <div className='w-[500px] h-[500px] bg-slate-400' style={{backgroundImage:"url(https://i.pinimg.com/564x/ae/8a/c2/ae8ac2fa217d23aadcc913989fcc34a2.jpg)"}}></div>
                 
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default BikeList;
