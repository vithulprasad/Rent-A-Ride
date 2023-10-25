
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import {dashboardChartPartner} from '../../../Apis/connections/admin'
import { useEffect, useState } from 'react';


ChartJS.register(ArcElement, Tooltip, Legend);



function App() {
  const [id,setId] = useState([])
  const [order,setOrder] = useState([])

    useEffect(()=>{
      dashboardChartPartner().then((res)=>{
        const data = res.data.order
        const data2 = res.data.orders
        setId(data)
        setOrder(data2)
      })
    },[])
    
    const data1 = id.map((value)=>{
      return value.count
    })
    
    let b=[];
  for(let i =0;i<id.length;i++){
     for(let j=0; j<order.length;j++){
        if(id[i].partner == order[j].partner._id){
            b.push(order[j].partner.name)
            break;
        }
     }
  }
  
    console.log(data1);
    const data = {
      labels:b,
      datasets: [
        {
          label: '# of Votes',
          data: data1,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
           
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
       
          ],
          borderWidth: 1,
        },
      ],
    };
  
  return <Doughnut data={data} />;
}
export default App