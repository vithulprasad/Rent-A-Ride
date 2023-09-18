import { useEffect } from "react";
import {
  Input,
  Timepicker,
  initTE,
} from "tw-elements";

function DateTable() {
  useEffect(() => {
    initTE({ Input, Timepicker });
  }, []);

  return (
    <div className="w-[350px] h-[480px]  p-2">
    <div className=" flex justify-center border border-black  w-full h-full pt-6 "style={{boxShadow:" inset 0 -3em 3em rgba(0, 0, 0, 0.1),0 0 0 2px rgb(255, 255, 255),0.3em 0.3em 1em rgba(0, 0, 0, 0.3)"}}>
      <div className="w-[300px] h-[400px] p-5 " style={{boxShadow:" inset 0 -3em 3em rgba(0, 0, 0, 0.1),0 0 0 2px rgb(255, 255, 255),0.3em 0.3em 1em rgba(0, 0, 0, 0.3)"}}>
        <form action="">
          <div className="w-full h-20 border border-black flex justify-center pt-5 mb-2- ">
            <h1 className="text-center font-mono font-extrabold text-2xl ">Search NOW!</h1>
          </div>
          <div className="w-full h-16 mb-8 mt-3 border border-grey-900 flex flex flex-col   ">
               <span>Pickup Date</span>
               <div>
               <input className="w-[125px] h-9 border border-grey-900 mr-1" type="date" />
               <input className="w-[125px] h-9 border border-grey-900" type="time" />
               </div>
          </div>
          <div className="w-full h-16 flex flex flex-col border border-grey-900  ">
               <span>DropUP Date</span>
               <div>
               <input className="w-[125px] h-9 mr-1 border-slate-950 border border-grey-900" type="date" />
               <input className="w-[125px] h-9 border border-grey-900" type="time" />
               </div>
          </div>
          <div className="w-full flex justify-center">
            <button  className="bg-green-700  text-white font-bold px-12 mt-8 py-2 rounded focus:outline-none shadow hover:bg-blue-700 transition-colors" >Search Now</button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}

export default DateTable;
