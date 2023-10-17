import { useEffect, useState, Fragment } from "react";
import { Button, message, Popconfirm } from 'antd';
import { findPartner } from '../../Apis/connections/admin'
import { partnerBlocking } from '../../Apis/connections/admin'
import { Empty } from 'antd';
import toast from "react-hot-toast";
import Loading from '../../Component/Loading/loading';
import PartnerDetails from "./PartnerDetails";
import PartnerOrderDetails from "./PartnerOrderDetails";

function Partner() {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState("partner");
  const [users, setUsers] = useState([]);
  const [block, setBlock] = useState(false);
  const [details,setDetails] =useState({})
  const [orders,setOreders] = useState({})

  useEffect(() => {
    setLoading(true);
    findPartner().then((res) => {
      if (res.data.success === true) {
        setUsers(res.data.request);
        setLoading(false);
      }
    });
  }, [block]);

  const handleBlocking = (email) => {
    setLoading(true);
    partnerBlocking(email).then((res) => {
      if (res.data.success === true) {
        if (res.data.blocking === true) {
          toast.success("Blocking successfully");
          setBlock(true);
        } else {
          toast.success("Unblocked successfully");
          setBlock(false);
        }
        setLoading(false);
      } else {
        toast.error("Something went wrong");
      }
    });
  }

  const blocked = {
    background: "red",
    color: "white",
    fontWeight: "bold",
    borderRadius: "5px",
    height: "35px",
    width: "120px"
  };

  const unblock = {
    background: "green",
    color: "white",
    fontWeight: "bold",
    borderRadius: "5px",
    height: "35px",
    width: "120px",
    display: "flex",
    justifyContent: "center"
  };

  const changePage = (x) => {
    if (x === "details") {
      setPage("details");
    } else {
      setPage("orderDetails");
    }
  }
const handlePartner =()=>{
  setPage("partner");
}
const PartnerDetailssingle =(id)=>{
       const data = users.find((value) => value._id == id)
  setDetails(data)
}
const PartnerOrder = (id)=>{
  const data = users.find((value) => value._id == id)
  setOreders(data)
}
  return (
    <Fragment>
      {loading ? (<Loading />) : (
        <>
          {users.length > 0 ? (
            <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
              {page === "details" ? <PartnerDetails details ={details} backToPartner={handlePartner}/> : null}
              {page === "orderDetails" ? <PartnerOrderDetails details={orders} backToPartner={handlePartner}/> : null}
              {page === "partner" ? (
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
                      <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                        Product information
                      </th>
                      <th scope="col" className="px-6 text-center py-4 pr-0 font-medium text-gray-900">
                        Active/Edit
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
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                              <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                              Active
                            </span>
                          </td>
                        <td className="px-6 py-4">{user.company}</td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2" onClick={()=>{changePage("details")}}>
                              <button onClick={()=>{PartnerDetailssingle(user._id)}}  className="bg-yellow-700 text-white font-bold px-5 py-2 rounded focus:outline-none shadow hover:bg-yellow-700 transition-colors">Details</button>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2"  onClick={()=>{changePage("orderDetails")}}>
                              <button onClick={()=>{PartnerOrder(user._id)}} className="bg-green-700 text-white font-bold px-5 py-2 rounded focus:outline-none shadow hover:bg-green-900 transition-colors">Order Details</button>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex justify-end gap-4">
                              <Popconfirm
                                title="Are you sure?"
                                description="Take action against the partner?"
                                onConfirm={() => handleBlocking(user.email)}
                                onCancel={() => { message.error("Cancelled") }}
                                okText="Yes"
                                cancelText="No"
                              >
                                {user.blocking === false ? <Button style={unblock}>Block Partner</Button> : <Button style={blocked}>Unblock Partner</Button>}
                              </Popconfirm>
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
              ) : null}
            </div>
          ) : <Empty />}
        </>
      )}
    </Fragment>
  );
}

export default Partner;
