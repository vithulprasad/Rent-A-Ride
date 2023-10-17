import { useState, useEffect, useRef } from "react";
import { notification } from "antd";
import toast from "react-hot-toast";
import moment from "moment";
import $ from "jquery";
import "timepicker/jquery.timepicker.min.css";
import "timepicker/jquery.timepicker.min.js";
import { useDispatch } from "react-redux";
import { addDateTime } from "../../Redux/storeSlices/dateAndTime";
import { useNavigate } from "react-router-dom";

function DateTable() {
  const [pickupDate, setPickupDate] = useState("");
  const [dropDate, setDropDate] = useState("");
  const pickupTimeRef = useRef(null);
  const dropTimeRef = useRef(null);
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        toast.error("invalid date please select correct date!");
      } else {
        const information = {
          startingDate: pickupDate,
          endingDate: dropDate,
          startingTime: pickupTimeLine,
          endingTime: dropTimeLine,
          differenceInDays: dayDifference,
          differenceInHour: hoursDifference,
        };
        console.log(information, "dfsdfs");
        dispatch(addDateTime(information));
        navigate("/bikeCollection");
      }
    }
  };
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: "Reminder",
      description:
        "Please select the PICKUP date and time and select the DROP date and time to get the information for You",
    });
  };

  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <div className="w-[350px] h-[480px] p-2">
      <div
        className="flex justify-center border border-black w-full h-full pt-6"
        style={{
          boxShadow:
            " inset 0 -3em 3em rgba(0, 0, 0, 0.1),0 0 0 2px rgb(255, 255, 255),0.3em 0.3em 1em rgba(0, 0, 0, 0.3)",
        }}
      >
        <div
          className="w-[300px] h-[400px] p-5"
          style={{
            boxShadow:
              " inset 0 -3em 3em rgba(0, 0, 0, 0.1),0 0 0 2px rgb(255, 255, 255),0.3em 0.3em 1em rgba(0, 0, 0, 0.3)",
          }}
        >
          <form onSubmit={handleSubmit}>
            <div className="w-full h-20 border border-black flex justify-center pt-5 mb-2">
              <h1 className="text-center font-mono font-extrabold text-2xl">
                Search NOW!
              </h1>
            </div>
            <div className="w-full h-16 mb-8 mt-3 border border-grey-900 flex flex flex-col">
              <span>Pickup Date</span>
              <div>
                <input
                  className="w-[125px] h-9 border border-grey-900 mr-1"
                  type="date"
                  min={currentDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                />

                <input
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
                  min={currentDate}
                  type="date"
                  onChange={(e) => setDropDate(e.target.value)}
                />
                <input
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
    </div>
  );
}

export default DateTable;
