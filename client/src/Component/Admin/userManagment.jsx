import { Space, Table,Button ,Popconfirm,message } from 'antd';
import { useEffect, useState } from 'react';
import {userDetails} from '../../Apis/connections/admin'
import {userBlocking} from '../../Apis/connections/admin'

import toast from 'react-hot-toast';
const { Column, ColumnGroup } = Table;







function UserManagment() {
   const [user,setUser] =useState([])
   const [block,setBlock] = useState(false)

useEffect(()=>{
    console.log("working..");
    userDetails().then((res)=>{
    console.log(res.data.userData);
    if(res.data.success===false){
       toast.error("something went wrong !")
    }else{
        setUser(res.data.userData)
    }
   })
},[block])

  
const purchaseDetails=(email)=>{
    try {
        toast.success(`purchase details of${email}`)
    } catch (error) {
        toast.error("something went wrong !")
    }
}
const addressInformation =(email)=>{
    try {
        toast.success(`address information of ${email}`)
    
    } catch (error) {
        toast.error("something went wrong !")
    }
}
const blockingUser =(email)=>{
    try {
      userBlocking(email).then((res)=>{
            if(res.data.success===true){
                console.log(res.data.blockedUser);
                if(res.data.blockedUser===true){
                    toast.success('user Is blocked')
                    if(block==true){
                        setBlock(false)
                    }else{
                        setBlock(true)
                    }
                    
                   
                }else{
                    toast.success('user Is unblocked successfully')
                    if(block==true){
                        setBlock(false)
                    }else{
                        setBlock(true)
                    }
                }
                
            }else{
                toast.error("something went wrong !")
            }
        })
      
        
    } catch (error) {
        toast.error("something went wrong !")
    }
}
return (
    <>
    <div className='mb-10'>
       <h1>User Management</h1> 
    </div>
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
          <div>
            {text}
            <Button className='bg-lime-400' onClick={() => purchaseDetails(record.email)}>Order info</Button>
          </div>
        )} />
     
      <Column
        title="details"
      
        key="address"
        render={(record) => (
          <div>
            <Button className='bg-amber-300' onClick={() => addressInformation(record.email)}>view Details</Button>
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
    </>
  );
}

export default UserManagment
