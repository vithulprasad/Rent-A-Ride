

function PartnerDetails({backToPartner,details}) {
  return (
    <div className="p-3 h-[600px] overflow-y-scroll">
      <h1>this is detail


        
      </h1>
        <button className="w-[100px] h-10 bg-green-300 font-mono font-bold flex justify-around items-center rounded shadow" onClick={()=>{backToPartner()}}><i className="fa-solid fa-arrow-left "></i>Partner</button>
        <div className="w-full h-full py-3 flex">
          <div className="w-1/2 h-full mx-2">
            <div className="w-full h-1/3 flex justify-center">
              <div className="w-1/3 h-full  ">
                <div
                  className="w-full h-[80%] bg-red-200"
                  style={{
                    backgroundImage: details.image
                      ? `url(${details.image})`
                      : 'url(https://i.pinimg.com/564x/b7/21/57/b72157473ae510c74e7a96ccb8bd0e38.jpg)',backgroundRepeat:"no-repeat",backgroundSize:"cover"
                  }}
                ></div>
              </div>
            </div>
            <div className="w-full h-24 border my-1 flex justify-center items-center font-mono">
              Name: <span className="font-bold text-cyan-500">{details.name}</span>
            </div>
            <div className="w-full h-24 border my-1 flex justify-center items-center font-mono">
              Age: <span className="font-bold text-cyan-500">{details.address.age}</span>
            </div>
            <div className="w-full h-24 border my-1 flex justify-center items-center font-mono">
              Email: <span className="font-bold text-cyan-500">{details.email}</span>
            </div>
            <div className="w-full h-24 border my-1 flex justify-center items-center font-mono">
              Phone: <span className="font-bold text-cyan-500">{details.phone}</span>
            </div>
            <div className="w-full h-24 border my-1 flex justify-center items-center font-mono">
              Company Name: <span className="font-bold text-cyan-500">{details.company}</span>
            </div>
          </div>
          <div className="w-1/2 h-full">
            <div className="w-full h-24 border my-1 flex justify-center items-center font-mono">
              State: <span className="font-bold text-cyan-500">{details.address.state}</span>
            </div>
            <div className="w-full h-24 border my-1 flex justify-center items-center font-mono">
              District: <span className="font-bold text-cyan-500">{details.address.district}</span>
            </div>
            <div className="w-full h-24 border my-1 flex justify-center items-center font-mono">
              Local Area: <span className="font-bold text-cyan-500">{details.address.localArea}</span>
            </div>
            <div className="w-full h-24 border my-1 flex justify-center items-center font-mono">
              Post: <span className="font-bold text-cyan-500">{details.address.post}</span>
            </div>
            <div className="w-full h-24 border my-1 flex justify-center items-center font-mono">
              Pin: <span className="font-bold text-cyan-500">{details.address.pin}</span>
            </div>
            <div className="w-full h-24 border my-1 flex justify-center items-center font-mono">
              Gender: <span className="font-bold text-cyan-500">{details.gender}</span>
            </div>
            <div className="w-full h-24 border my-1 flex justify-center items-center font-mono">
              Location:
              <span className="font-bold text-cyan-500">
                {details.locationPoints.map((value, key) => (
                  <div key={key} className="w-[200px] h-full overflow-y-scroll flex justify-center">
                    <h1>{value}</h1>
                  </div>
                ))}
              </span>
            </div>
            <div className="w-full h-24 border my-1 flex justify-center items-center font-mono">
              {/* Add any additional content here */}
              <span className="font-bold text-cyan-500"></span>
            </div>
          </div>
        </div>
    </div>
  )
}

export default PartnerDetails
