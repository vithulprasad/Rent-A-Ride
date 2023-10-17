
import { useEffect, useState } from "react";
import { singleOrderDetails } from '../../../Apis/connections/admin';
import toast from "react-hot-toast";
import PropTypes from 'prop-types';


function Order({page,data}) {
    console.log(data,'thisi is the data y');
    const [orderSingle, setOrderSingle] = useState([]);

    useEffect(() => {
        console.log(data,'thisi is the data y from use effect');
      singleOrderDetails(data._id)
        .then((res) => {
            console.log(res.data.orders
                ,'iiiiiiiiiiiiiiiiiiiiiiiii');
          const id = data._id;
          
          const data1 = res.data.orders;
          console.log(data);
          const filtered = data1.filter((value) => value.userId._id == id);
        console.log(filtered,'this is the filtered data---------');
          setOrderSingle(filtered);
        
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }, [data]);
  return (
    <div>
              <button className="w-[150px] h-14 bg-green-400 rounded shadow" onClick={()=>{page()}}><i className="fas fa-arrow-left"></i>  Back to users</button>
              <div className="w-full h-full flex flex-col my-8">
        {orderSingle.length > 0 ? orderSingle.map((data, keys) => (
          <div className="flex w-2/3 h-1/2 my-2" key={keys}>
            <div className="w-full h-full border border-black font-mono">
              <div className="w-full h-10 font-mono font-bold text-2xl text-center flex justify-center items-center">
                <h1>Order details <span>{keys + 1}</span></h1>
              </div>
              <div className="w-full h-full p-2 flex">
                <div className="w-1/2 h-[80%]">
                  <div className="w-full h-14 my-2 flex">
                    <div className="w-1/2 h-full border flex py-2">
                      <div className="w-1/2 h-full flex justify-center items-center font-mono">Bike:</div>
                      <div className="w-1/2 h-full overflow-x-scroll flex justify-center items-center font-mono font-bold">
                        {data.bikeName}
                      </div>
                    </div>
                    <div className="w-1/2 h-full border flex py-2">
                      <div className="w-1/2 h-full flex justify-center items-center font-mono">Brand:</div>
                      <div className="w-1/2 h-full overflow-x-scroll flex justify-center items-center font-mono font-bold">
                        {data.bike.BrandName}
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-14 border my-2 flex justify-center items-center">
                    Bike Status: <span className="font-bold text-teal-500">{data.bikeStatus}</span>
                  </div>
                  <div className="w-full h-14 border my-2 flex justify-center items-center">
                    User Name: <span className="font-bold text-teal-500">{data.userId.firstName} {data.userId.lastName}</span>
                  </div>
                  <div className="w-full h-14 border my-2 flex justify-center items-center">
                    Location: <span className="font-bold text-teal-500">{data.location}</span>
                  </div>
                  <div className="w-full h-14 border my-2 flex justify-center items-center">
                    Email: <span className="font-bold text-teal-500">{data.userId.email}</span>
                  </div>
                </div>
                <div className="w-1/2 h-[80%] px-2">
                  <div className="w-full h-14 my-2 flex">
                    <div className="w-1/2 h-full border">
                      <div className="w-1/2 flex justify-center font-mono">Start Date</div>
                      <div className="w-1/2 flex justify-center font-mono font-bold">
                        {new Date(data.dates.startDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="w-1/2 h-full border">
                      <div className="w-1/2 flex justify-center items-center font-mono">End Date</div>
                      <div className="w-1/2 flex justify-center items-center font-mono font-bold">
                        {new Date(data.dates.endDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-14 border my-2 flex justify-center items-center">
                    Helmet Amount: <span className="font-bold text-teal-500">
                      <i className="icon rupee sign"></i>{data.helmet * 50}
                    </span>
                  </div>
                  <div className="w-full h-14 border my-2 flex justify-center items-center">
                    Deposit: <span className="font-bold text-teal-500">
                      <i className="icon rupee sign"></i>{data.deposit}
                    </span>
                  </div>
                  <div className="w-full h-14 border my-2 flex justify-center items-center">
                    Payment Status: <span className="font-bold text-teal-500">{data.paymentStatus}</span>
                  </div>
                  <div className="w-full h-14 border my-2 flex justify-center items-center">
                    Total Amount: <span className="font-bold text-teal-500">
                      <i className="icon rupee sign"></i>{data.totalAmount}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )) : null}
      </div>
    </div>
  )
}

export default Order

Order.propTypes = {
    page: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

