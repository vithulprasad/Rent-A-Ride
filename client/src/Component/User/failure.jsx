
import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Result, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import {paymentSuccess} from  '../../Apis/connections/user'
import toast from 'react-hot-toast';
import { useEffect } from 'react';




function Failure() {
  const { Paragraph, Text } = Typography;
    const navigate = useNavigate()
  
    useEffect(()=>{
      paymentSuccess().then(()=>{
        toast.success('payment completed successfully')
      })
      .catch((err)=>{toast.error(`error occured :${err.message}`)})
    },[])
    
  return (
    <div>
       <Result
    status="error"
    title="the payment is  Failed"
    subTitle="Please check and make sure everything working properly and information are valid ."
    extra={[
      <Button type="primary" key="console"onClick={()=>{navigate('/')}}>
          Go to home
      </Button>,
     
    ]}
  >
    <div className="desc">
      <Paragraph>
        <Text
          strong
          style={{
            fontSize: 16,
          }}
        >
          The content for booking may  have the following error:
        </Text>
      </Paragraph>
      <Paragraph>
        <CloseCircleOutlined className="site-result-demo-error-icon" /> Your account has been
        frozen. <a>Thaw immediately &gt;</a>
      </Paragraph>
      <Paragraph>
        <CloseCircleOutlined className="site-result-demo-error-icon" /> Your account is not yet
        eligible to apply.
      </Paragraph>
    </div>
  </Result>
    </div>
  )
}

export default Failure

 