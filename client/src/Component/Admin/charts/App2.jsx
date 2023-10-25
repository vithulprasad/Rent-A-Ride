
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import {dashboardChartOrder} from '../../../Apis/connections/admin'
import { useEffect, useState } from 'react';



ChartJS.register(ArcElement, Tooltip, Legend);



 function App2() {
      const [total,setTotal]=useState([])
      useEffect(()=>{
        dashboardChartOrder().then((val)=>{
          setTotal(val.data.order)
        })
      },[])
      const labels = total.map((item) => item.name);
      const counts = total.map((item) => item.count);
  const data = {
    labels: labels,
    datasets: [
      {
        label: '# of Votes',
        data: counts,
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
 

  dashboardChartOrder()
  return <Pie data={data} />;
}
export default App2