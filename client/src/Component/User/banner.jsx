import { Carousel } from "antd";

function Banner() {


  return (
    <div className="p-3 w-[1100px]">
      <Carousel className="border border-black" autoplay autoplaySpeed={2000} style={{boxShadow:" inset 0 -3em 3em rgba(0, 0, 0, 0.1),0 0 0 2px rgb(255, 255, 255),0.3em 0.3em 1em rgba(0, 0, 0, 0.3)"}}>
        
        
        <div className="flex justify-between ">
          <div className="flex justify-between">
            <img src="https://i.pinimg.com/564x/fe/54/31/fe5431beff4bcc75d4074158218d5e4a.jpg" alt="" />
            <div className="w-full p-28">
                <div className="w-full ">
                  <h1 className="font-mono text-2xl">Ride everyWere with Rent-A-Ride</h1>
                </div>
                <div>
                  <h1 className="font-mono text-lime-600">We Provide garnteed support and 24 hour opening website</h1>
                </div>
                <div>
                  <h1 className="font-mono font-bold">Rent a bike now for Riding in the road</h1>
                </div>
                <div>
                <button  className="bg-green-700  text-white font-bold px-12 mt-8 py-2 rounded focus:outline-none shadow hover:bg-blue-700 transition-colors" >Order Now</button>
                </div>
            </div>
          </div>
        </div>



        <div className="flex justify-between">
          <div className="flex justify-between">
            <img  src="https://i.pinimg.com/564x/60/95/7f/60957f3d2992005b07bdb0356a17440e.jpg" alt="" />
            <div className="w-full p-28">
                <div className="w-full ">
                  <h1 className="font-mono text-2xl">Ride everyWere with Rent-A-Ride</h1>
                </div>
                <div>
                  <h1 className="font-mono text-lime-600">We Provide Beast offers for our customers</h1>
                </div>
                <div>
                  <h1 className="font-mono font-bold">Rent a bike now giving offers tryNow</h1>
                </div>
                <div>
                <button  className="bg-green-700  text-white font-bold px-12 mt-8 py-2 rounded focus:outline-none shadow hover:bg-blue-700 transition-colors" >Try Offers</button>
                </div>
            </div>
          </div>
        </div>
        <div>
           <div className="flex justify-between ">
            <img  src="https://i.pinimg.com/564x/c0/3c/ff/c03cff1806a1aa77d3f58025fb1148cd.jpg" alt="" />
            <div className="w-full p-28">
                <div className="w-full ">
                  <h1 className="font-mono text-2xl">Ride everyWere with Rent-A-Ride</h1>
                </div>
                <div>
                  <h1 className="font-mono text-lime-600">Please check out our product page discounts!</h1>
                </div>
                <div>
                  <h1 className="font-mono font-bold">Dont miss the discounts rent a product make you happy</h1>
                </div>
                <div>
                <button  className="bg-green-700  text-white font-bold px-12 mt-8 py-2 rounded focus:outline-none shadow hover:bg-blue-700 transition-colors" >Go TO Products</button>
                </div>
            </div>
          </div>
          </div>
        <div>
        <div className="flex justify-between">
            <img  src="https://i.pinimg.com/564x/eb/b9/23/ebb9231e3800aca2f5548142df4cd67e.jpg" alt="" />
            <div className="w-full p-28">
                <div className="w-full ">
                  <h1 className="font-mono text-2xl">Ride everyWere with Rent-A-Ride</h1>
                </div>
                <div>
                  <h1 className="font-mono text-lime-600">Offering You to Join us as A Partner and make every one Happy ?</h1>
                </div>
                <div>
                  <h1 className="font-mono font-bold">Try now and make your self happy to simple to join</h1>
                </div>
                <div>
                <button  className="bg-green-700  text-white font-bold px-12 mt-8 py-2 rounded focus:outline-none shadow hover:bg-blue-700 transition-colors" >Join As A Partner</button>
                </div>
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  );
}

export default Banner;

