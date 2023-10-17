
import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import toast from 'react-hot-toast';
import {addCoupon} from '../../Apis/connections/admin'
import axios from 'axios';
const AddCoupon = () => {
    const [correct,setCorrect] = useState(true)
    const [image, setImage] = useState("");
    const [button,setButton] =useState(true)

    const handleFinish = (values) => {
      
        for (let key in values) {
         
          const value = values[key];
          setCorrect(true)
          console.log(correct);
          if(value ==="" || value === undefined){
            console.log("no value");
            setCorrect(false)
          }
          if(key == "expiry" && value <= 0 || value === undefined){
            console.log("no expiry");
            setCorrect(false)
          }
          if(key == "percentage" && value <= 0 || value === undefined){
            setCorrect(false)
            console.log("no percentage");
          }
          if(key == "valid" && value <= 0 || value === undefined){
            console.log("no valid plan");
            setCorrect(false)
         
          }
          console.log(correct);
        }

        if(correct===true){
          if(!image==""){
            toast.success('correct')
            addCoupon(values,image).then((res)=>{
               if(res.data.success===true){
                   toast.success("added successfully")
               }else{
                   toast.error("something went wrong")
               }
            })
          }else{
            toast.error("please add a image to the offer")
          }
          

        }else{
            toast.error('please fill the form correctly and cannot contain negative numbers')
        }
 
      };
      const Handlefile = async(files)=>{
        setButton(false)
        console.log(files,'-----dsdf');
        const formData = new FormData();
        formData.append("file", files[0]);
        formData.append(
          "upload_preset",
          import.meta.env.VITE_APP_CLOUDINARY_NAME
        );

        const res = await axios.post(
          import.meta.env.VITE_APP_CLOUDINARY_PATH,
          formData
        );

        const imageUrl = res.data.secure_url;
        console.log(imageUrl);

        setImage(`${imageUrl}`);
        toast.success("image added successfully");
      if (res) {
         setButton(true);
      }else{
        toast.error("error in uploading image ")
      }
       }
  return (
    <div>
       <div className='w-[600px] h-full border  font-mono p-4'>
        <div className='w-full text-2xl font-bold flex justify-center '>
             <h1>  ADD COUPON</h1>
        </div>
       
      <Form
        onFinish={handleFinish}
        layout="vertical"
        style={{
          maxWidth: 600,
        }}
       
      >
        <Form.Item label="Heading" name="heading">
          <Input placeholder="please add hading" />
        </Form.Item>
        <Form.Item label="Discription" name="description">
          <Input placeholder="please add description" />
        </Form.Item>
        <Form.Item label="coupon name" name="name">
          <Input placeholder="please add coupon name" />
        </Form.Item>
        <Form.Item label="coupon code" name="code">
          <Input placeholder="please add coupon code" />
        </Form.Item>
        <Form.Item label="coupon percentage" name="percentage">
          <Input placeholder="please add coupon percentage in number" type='number' />
        </Form.Item>
        <Form.Item label="minimum amount for coupon" name="valid">
          <Input placeholder="please add coupon percentage in number" type='number' />
        </Form.Item>
        <Form.Item label="coupon expiry days :eg - number like 1 or 100" name="expiry">
          <Input placeholder="select how many days in number" type='number'  />
        </Form.Item>
        <Form.Item>
          {button  ? <Button className='bg-green-500' type="primary"  htmlType="submit">Submit</Button>: <Button className='bg-green-500' type="primary"  disabled>...processing</Button>  }
         
        </Form.Item>
      </Form>
       <div>
        <h1>add event image</h1>
        <input type="file" onChange={(e)=>{Handlefile(e.target.files)}} />
       </div>
      </div>
    </div>
  );
};

export default AddCoupon;
