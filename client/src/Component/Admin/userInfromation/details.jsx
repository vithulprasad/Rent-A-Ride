 // Import React
import PropTypes from "prop-types"; // Import PropTypes

function Details({ page, data }) {
  return (
    <div>
      <button
        className="w-[150px] h-14 bg-green-400 rounded shadow"
        onClick={page} // Use the function directly as onClick handler
      >
        <i className="fas fa-arrow-left"></i> Back to users
      </button>
      <div className="w-full h-[600px] flex justify-center py-5">
        <div className="w-2/3 h-full p-2 border">
          <div className="w-full h-1/2  flex">
            <div className="w-1/2 h-full border flex justify-center items-center">
              <div
                className="w-1/2 h-2/3 "
                style={{
                  // Update Profile to data.userInfo.front
                  backgroundImage: data.userInfo.front
                    ? `url(${data.userInfo.front})`
                    : "none", // Use "none" to clear background if not provided
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              ></div>
            </div>
            <div className="w-1/2 h-full border flex flex-col">
              <div className="w-full h-1/2 flex">
                <div
                  className="w-1/2 h-[200px]"
                  style={{
                    // Update data.license.front to data.userInfo.front
                    backgroundImage: data.userInfo.front
                      ? `url(${data.userInfo.front})`
                      : "none",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                ></div>
                <div
                  className="w-1/2 h-[200px] "
                  style={{
                    // Update data.license.back to data.userInfo.back
                    backgroundImage: data.userInfo.back
                      ? `url(${data.userInfo.back})`
                      : "none",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                ></div>
              </div>
              <div className="w-full h-1/2 flex">
                <div
                  className="w-1/2 h-[140px] bg-green-400"
                  style={{
                    // Update data.license.front to data.license.front
                    backgroundImage: data.license.front
                      ? `url(${data.license.front})`
                      : "none",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                ></div>
                <div
                  className="w-1/2 h-[140px] bg-yellow-400"
                  style={{
                    // Update data.license.front to data.license.back
                    backgroundImage: data.license.back
                      ? `url(${data.license.back})`
                      : "none",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div className="w-full h-[50%]  flex font-mono">
            <div className="w-1/2 h-full ">
              <div className="w-full h-16  my-2 mx-1 border flex justify-around items-center">
                Name: <span className="font-mono font-bold text-green-400">{data.firstName} {data.lastName}</span>
              </div>
              <div className="w-full h-16  my-2 mx-1 border flex justify-around items-center">
                Phone: <span className="font-mono font-bold text-green-400">{data.phone}</span>
              </div>
              <div className="w-full h-16 my-2 mx-1 border flex justify-around items-center">
                Email: <span className="font-mono font-bold text-green-400">{data.email}</span>
              </div>
              <div className="w-full h-16  my-2 mx-1 border flex justify-around items-center">
                Pin: <span className="font-mono font-bold text-green-400">{data.address.pin}</span>
              </div>
            </div>
            <div className="w-1/2 h-full ">
              <div className="w-full h-16 my-2 mx-1 border flex justify-around items-center">
                State: <span className="font-mono font-bold text-green-400">{data.address.state}</span>
              </div>
              <div className="w-full h-16  my-2 border mx-1 flex justify-around items-center">
                District: <span className="font-mono font-bold text-green-400">{data.address.district}</span>
              </div>
              <div className="w-full h-16  my-2 mx-1 border flex justify-around items-center">
                Local area: <span className="font-mono font-bold text-green-400">{data.address.localArea}</span>
              </div>
              <div className="w-full h-16  my-2 mx-1 border flex justify-around items-center">
                Post: <span className="font-mono font-bold text-green-400">{data.address.post}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Define PropTypes
Details.propTypes = {
  page: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default Details;
