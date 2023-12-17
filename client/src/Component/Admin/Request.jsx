
import { useEffect, useState,Fragment} from "react";
import {toast} from 'react-hot-toast'
import { Button, message, Popconfirm,Drawer,Form, Input ,Modal } from 'antd';
import { Empty } from 'antd';
import PropTypes from 'prop-types';
import {RequestDetails} from '../../Apis/connections/admin'
import {accessConfirmation} from '../../Apis/connections/admin'
import {rejectedNow} from '../../Apis/connections/admin'
import RequestDetailse from "./RequestDetails";
import Loading from '../../Component/Loading/loading'








function Request({sendDataToParent}) {
  const [loading,setLoading] = useState(false)
const [page,setPage ]= useState(false)



  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [refresh,setRefresh] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email,setEmail] = useState('')
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [information,setInformation] = useState({})

  useEffect(() => {
    setLoading(true)
    RequestDetails().then((res) => {
      if (res.data.success === true) {
        setUsers(res.data.request);
        setLoading(false)
      }else{
        toast.success('something went wrong')
      }
    });
  }, [refresh,]);
 

  const handleAccept =(email)=>{
    setLoading(true)
    accessConfirmation(email).then((res)=>{
       if(res.data.success===true){
        setRefresh(res.data.email)
        toast.success(" requset accept new parter wer added")
        sendDataToParent()
        setLoading(false)
       }else{
        toast.error("something went wrong try again")
       }
     })
  }

  const onFinish = (values) => {
    setLoading(true)
    const datas={
      data:values,
      email:email
    }
    rejectedNow(datas).then((res)=>{
          if(res.data.success===true){
             toast.success("partner request rejected successfully")
             setIsModalOpen(false)
             sendDataToParent()
             setRefresh('force refresh')
             messageApi.destroy
             setLoading(false)
          }else{
            toast.error("something went wrong!")
          }
    })
   
  };
  const success = () => {
    messageApi.open({
      type: 'loading',
      content: 'rejecting partner request ......',
      duration: 0,
    });
  
  };

  const setDetails = (id) =>{
    console.log(id,'----');
    console.log(users,'----');
    const data = users.find((value)=>{return value._id == id})
    console.log(data,'-----d-----');
  
    setInformation(data)
   
  }
  const request = ()=>{
    setPage(false)
  }
   

  return (
<Fragment>
{loading ? (<Loading/>) : (<>
  { users.length > 0 ?
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
{page == false ? 
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
            {user.access==="requesting" ?
            <>
            <td className="px-6 py-4">
              <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                Requests
              </span>
            </td>
          
            <td className="px-6 py-4">{user.company}</td>
            <td className="px-6 py-4">
              <div className="flex gap-2" onClick={()=>{setPage(true)}}>
                 <button onClick={()=>{setDetails(user._id)}}  className="bg-amber-800   h-[30px] text-white text-center font-mono px-5  rounded focus:outline-none shadow hover:bg-yellow-700 transition-colors" >details</button>
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="flex justify-end gap-4">
                  <Popconfirm
                    title="Are you sure accepting the client"
                    description="Press yes to continue accepting "
                    onConfirm={()=>{
                    message.success('processing... to accept'); 
                    handleAccept(user.email)}}
                    onCancel={()=>{ message.error('canceled');}}
                    okText="Yes"
                    cancelText="No"
                  >
                        <Button className="bg-green-700">Accept</Button>
                  </Popconfirm>
                  <Button className="bg-red-600" type="primary" onClick={()=>{setOpen(true)}}>
                    Reject
                  </Button>
                  <Drawer title="Basic Drawer" placement="right" onClose={()=>{setOpen(false)}} open={open}>
                  <Form
                        name="wrap"
                        labelCol={{ flex: '110px' }}
                        labelAlign="left"
                        labelWrap
                        wrapperCol={{ flex: 1 }}
                        colon={false}
                        style={{ maxWidth: 600 }}
                        onFinish={onFinish}
                        form={form}
                      >
                        <Form.Item label="Informaiton" name="information" rules={[{ required: true }]}>
                          <Input.TextArea className="h=[80px] border border-red-500" style={{height:"80px"}} />
                        </Form.Item>

                      
                        <Form.Item label="Reasons" name="reason" rules={[{ required: true }]}>
                          <Input.TextArea className="h=[80px] border border-red-500" style={{height:"80px"}} />
                        </Form.Item>

                        <Form.Item label=" ">
                          <Button className="bg-red-900 mt-10 ml-5"  onClick={()=>{setIsModalOpen(true)}}>
                            Reject iT
                          </Button>
                          {contextHolder}
                          <Modal title="confirmation"  open={isModalOpen}  onOk={() => {
                            setEmail(user.email)
                              form
                                .validateFields()
                                .then(() => {
                                  success()
                                  message.success(`Processing... to reject`);
                                  form.submit();
                                })
                                .catch(() => {
                                  message.error('Please fill in the form correctly.');
                                });
                                   }} onCancel={()=>{setIsModalOpen(false)}}>
                             <h1>are you sure rejecting? </h1>
                          </Modal>
                        </Form.Item>
                      </Form>
                  </Drawer>
             
              </div>
            </td></>:<>
            <td className="px-6 py-4">
              <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-600">
                <span className="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                Rejected
              </span>
            </td>
            <td className="px-6 py-4">{user.company}</td>
            <td className="px-6 py-4">
              <div className="flex gap-2">
               <button className="bg-amber-800   h-[30px] text-white text-center font-mono px-5  rounded focus:outline-none shadow hover:bg-yellow-700 transition-colors">details</button>
              </div>
            </td>
            <td className="px-10 ">
              <div className="flex gap-2">
               <button className="bg-red-500   h-[30px] text-white text-center font-mono px-5  rounded focus:outline-none shadow hover:bg-red-400 transition-colors"style={{marginRight:"-10px"}}>Rejection info</button>
              </div>
            </td>
            </> }
       
              </tr>
            ))
          ) : (
            <tr className="adminEdit-td">
              <td colSpan="5">No users found</td>
            </tr>
          )}
        </tbody>
      </table>

    :<RequestDetailse Request={request} data={information}/> }
    </div>
    :<Empty/>
}
</>)}
 
    </Fragment>
  );
}
Request.propTypes = {
  sendDataToParent: PropTypes.func.isRequired,
  authorized: PropTypes.bool.isRequired, 
};

export default Request;







