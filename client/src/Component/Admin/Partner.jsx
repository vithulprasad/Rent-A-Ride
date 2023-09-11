import axios from "axios";
import { useEffect, useState,Fragment} from "react";
import { adminApi } from "../../Apis/api";


import { Empty } from 'antd';

function Partner() {
  const [users, setUsers] = useState([]);


  useEffect(() => {
    axios.get(`${adminApi}findPartner`).then((res) => {
      if (res.data.success === true) {
        setUsers(res.data.request);
      }
    });
  }, []);
 
  const handleBlocking=(email)=>{
    console.log(email,'this is the emial')
  }


  return (
<Fragment>
  { users.length > 0 ?
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Name
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              State
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Company name
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Information
            </th>
            <th scope="col" className="px-6 text-center py-4 pr -0 font-medium text-gray-900">
              active /edit
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {Array.isArray(users) && users.length > 0 ? (
            users.map((user) => (
              <tr className="hover:bg-gray-50" key={user._id}>
                  <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
              <div className="relative h-10 w-10">
                <img
                  className="h-full w-full rounded-full object-cover object-center"
                  src="https://i.pinimg.com/564x/ad/57/b1/ad57b11e313616c7980afaa6b9cc6990.jpg"
                  alt=""
                />
                <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
              </div>
              <div className="text-sm">
                <div className="font-medium text-gray-700">{user.name}</div>
                <div className="text-gray-400">{user.email}</div>
              </div>
            </th>

            {/* first information---------------- */}
            <td className="px-6 py-4">
              <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                active
              </span>
            </td>
            {/* second information */}
            <td className="px-6 py-4">{user.company}</td>
            <td className="px-6 py-4">
              <div className="flex gap-2">
               <button className="bg-yellow-700  text-white font-bold px-5 py-2 rounded focus:outline-none shadow hover:bg-yellow-700 transition-colors">Details</button>
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="flex justify-end gap-4">
              
              <button  className="bg-green-500  text-white font-bold px-5 py-2 rounded focus:outline-none shadow hover:bg-green-900 transition-colors" onClick={()=>{handleBlocking(user.email)}}>Block</button>
              </div>
            </td>
              </tr>
            ))
          ) : (
            <tr className="adminEdit-td">
              <td colSpan="5">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>:<Empty/>
}
    </Fragment>
  );
}

export default Partner;
