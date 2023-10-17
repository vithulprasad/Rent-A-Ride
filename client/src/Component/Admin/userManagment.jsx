import { Space, Table,Button ,Popconfirm,message } from 'antd';
import { useEffect, useState } from 'react';
import {userDetails} from '../../Apis/connections/admin'
import {userBlocking} from '../../Apis/connections/admin'
import toast from 'react-hot-toast';
import Loading from '../../Component/Loading/loading'
import Details from '../Admin/userInfromation/details'
import  Order from  '../Admin/userInfromation/order'

const { Column, ColumnGroup } = Table;







function UserManagment() {
  const [loading,setLoading] = useState(false)
  const [page,setPage] = useState('current')
   const [user,setUser] =useState([])
   const [block,setBlock] = useState(false)
   const [details,setDetails] =useState({})

useEffect(()=>{
  setLoading(true)
    console.log("working..");
    userDetails().then((res)=>{
    console.log(res.data.userData);
    if(res.data.success===false){
       toast.error("something went wrong !")
    }else{
      setLoading(false)
        setUser(res.data.userData)
    }
   })
},[block])

  

const blockingUser =(email)=>{
  setLoading(true)
    try {
      userBlocking(email).then((res)=>{
            if(res.data.success===true){
                if(res.data.blockedUser===true){
                
                    toast.success('user Is blocked')
                    if(block==true){
                        setBlock(false)
                    }else{
                        setBlock(true)
                    }
                    setLoading(false)
                   
                }else{
                    toast.success('user Is unblocked successfully')
                    if(block==true){
                        setBlock(false)
                    }else{
                        setBlock(true)
                    }
                    setLoading(false)
                }
                
            }else{
                toast.error("something went wrong !")
            }
        })
      
        
    } catch (error) {
        toast.error("something went wrong !")
    }
}
const changePage = (x)=>{
  setDetails(x)
  console.log(details);
}
const handlePage =()=>{
  setPage('current')
}

return (
    <>
    {
      page == "current" ?
   <>
    <div className='mb-10'>
       <h1>User Management</h1> 
    </div>
    {loading ? (<Loading/>) : (<>
      <Table dataSource={user}>
         <Column title="Role" key="Role" render={(record) => (
          <div className='w-[100px] h-[35px] pt-2 bg-slate-100 text-lime-900 text-center rounded-sm'>
         
            {record.isPartner ? <h2 className='font-mono font-bold '> Partner </h2>: <h2 className='font-mono font-bold'>client</h2>}
          </div>
        )}/>
      <ColumnGroup title="Name"render={(record) => (
        
         
             <h2 className='font-mono font-bold '>{`${record.firstName} ${record.lastName}`} </h2>
        
        )} >
        
      </ColumnGroup>
      <Column title="Purchases" dataIndex="Purchases" key="Purchases"render={(text, record) => (
          <div onClick={()=>{setPage('order')}}>
            {text}
            <Button className='bg-lime-400' onClick={() => changePage(record)}>Order info</Button>
          </div>
        )} />
     
      <Column
        title="details"
      
        key="address"
        render={(record,text) => (
          <div onClick={()=>{setPage('details')}}>
            <Button className='bg-amber-300' onClick={() => changePage(text)}>view Details</Button>
          </div>
        )}
      />
      <Column
        title="Action"
        key="action"
        render={(record) => (
          <Space size="middle">
            <div>
            <Popconfirm
                title="Are you sure "
                description="take action against the Users?"
                onConfirm={() => blockingUser(record.email)}
                onCancel={()=>{message.error("cancelled")}}
                okText="Yes"
                cancelText="No"
              >
                  {record.blocking===false ?<Button className='bg-green-600'>Block partner</Button>:<Button className='bg-red-600' > <span style={{marginLeft:"-10px"}}>unBlock partner</span></Button>}
              </Popconfirm>
              
            </div>
          </Space>
          
        
        )}
      />
    </Table>
 
    </>)}
    </>
 :null }
 {page == "details" ? <Details page={()=>{handlePage()}} data={details}/> :null}
 {page == "order" ? <Order page={()=>{handlePage()}} data={details}/> :null}
    </>
  );
}

export default UserManagment
