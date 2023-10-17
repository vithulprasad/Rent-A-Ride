import { Table } from 'antd';
import { useEffect, useState } from 'react';
import {getCoupons} from '../../Apis/connections/admin'
import toast from 'react-hot-toast';


function CouponList() {
  const [coupons,setCoupons] = useState([]);
  useEffect(()=>{
    getCoupons().then((res)=>{
      if(res.data.success===true){
        setCoupons(res.data.coupons)
      }else{
        toast.error("something went wrong")
      }
    })
  },[])
    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'Heading',
          dataIndex: 'heading',
          render: (text) => <a>{text}</a>,
        },  {
          title: 'coupon code',
          dataIndex: 'code',
          render: (text) => <a className='font-mono font-bold text-teal-500 text-2xl'>{text}</a>,
        },  {
          title: 'Percentage',
          dataIndex: 'percentage',
          render: (text) => <a>{text}%</a>,
        },  {
          title: 'Minimum Amount',
          dataIndex: 'minimum',
          render: (text) => <a>{text}</a>,
        },  {
          title: 'coupon expires in',
          dataIndex: 'expiry',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'coupon expires in',
          dataIndex: 'date',
          render: (text) => <a>{new Date(text).toLocaleString()}</a>
        }, {
          title: 'current Status',
          dataIndex: 'expiry',
          render: (text) => <a>{text > 0 ? <h1 className='bg-green-500 rounded shadow font-mono text-center'>Active</h1>:<h1 className='bg-red-500 rounded shadow font-mono text-center'>Expired</h1>}</a>,
        },
      ];
     
  return (
    <div>
     <Table
      className='flex justify-aroundalign-center'
      columns={columns}
      dataSource={coupons}
      bordered
     
     />
    </div>
  )
}

export default CouponList
