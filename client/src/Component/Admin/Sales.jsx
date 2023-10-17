import { Select } from 'antd';
import { Table, Button, Drawer, Space } from 'antd';
import { bookingAdmin } from '../../Apis/connections/admin';
import { useEffect, useState } from 'react';
import { setBookingList, filter } from '../../Redux/storeSlices/AdminBooking';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';

// Define a custom component for rendering your PDF content
function MyDocument({ data }) {
  const [lastValue, setLastValue] = useState(0);

  useEffect(() => {
 
    const d = data.reduce((acc, curr) => acc + curr.totalAmount - curr.deposit, 0);


    setLastValue(d);
  }, [data]);
  return (
<Document>
  <Page size="A4">
    <View style={styles.page}>
      <Text style={styles.title}>My PDF Report</Text>
      <View style={styles.table}>
        <View style={styles.tableRowHeader}>
     
          <Text style={styles.headerCell}>Partner name</Text>
          <Text style={styles.headerCell}>Bike Name</Text>
          <Text style={styles.headerCell}>user Name</Text>
          <Text style={styles.headerCell}>company</Text>
          <Text style={styles.headerCell}>total profit</Text>
          <Text style={styles.headerCell}>deposit</Text>

        </View>
        {data.map((value, index) => (
          <View style={styles.tableRow} key={index}>
           
            <Text style={styles.cell}>{value.partner.name}</Text>
            <Text style={styles.cell}>{value.bike.name}</Text>
            <Text style={styles.cell}>{value.userId.firstName} {value.userId.lastName}</Text>
            <Text style={styles.cell}>{value.partner.company}</Text>
            <Text style={styles.cell}>profit-{value.totalAmount-value.deposit}</Text>
            <Text style={styles.cell}> deposit-{value.deposit}</Text>
          </View>
        ))}
           <View style={styles.tableRowHeader}>
              <Text style={styles.headerCell}>---------------------------------------------------------------------------------------------------------total Amount={lastValue}</Text>
          </View>
      </View>
    </View>
  </Page>
</Document>

  );
}

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  table: {
    display: 'table',
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: 10,
  },
  tableRowHeader: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  headerCell: {
    margin: 5,
    fontSize: 12,
    fontWeight: 'bold',
    padding: 3,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  cell: {
    margin: 5,
    fontSize: 12,
    padding: 3,
  },
});

function Sales() {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [total, setTotal] = useState(0);
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');
  const [order, setOrder] = useState('all');
  const dispatch = useDispatch();
  useEffect(() => {
    bookingAdmin().then((res) => {
      if (res.data.success === true) {
        const data = res.data.booking;
        setBookings(data);
        dispatch(setBookingList(data));
        const value = data.reduce((acc, curr) => acc + curr.totalAmount - curr.deposit, 0);
        setTotal(value);
      }
    });
  }, []);

  const data = useSelector((value) => value.AdminBooking);

  const filterHandler = () => {
    dispatch(setBookingList(bookings));
    const data = {
      date1: date1,
      date2: date2,
      order: order,
    };
    if (date1 === '' || date2 === '') {
      toast.error('Please correctly choose the date before filtering');
    } else {
      const date1 = new Date(data.date1);
      const date2 = new Date(data.date2);
      if (date1 < date2) {
        dispatch(filter(data));
      } else {
        toast.error('Invalid date');
      }
    }
  };

  const columns = [
    {
      title: 'Partner',
      dataIndex: 'partner',
      render: (text) => <a style={{ width: '200px', display: 'inline-block' }}>{text.name}</a>,
    },
    {
      title: 'Company',
      dataIndex: 'partner',
      render: (text) => <a style={{ width: '200px', display: 'inline-block' }}>{text.company}</a>,
    },
    {
      title: 'Bike',
      dataIndex: 'bike',
      render: (text) => <a style={{ width: '200px', display: 'inline-block' }}>{text.name}</a>,
    },
    {
      title: 'Brand',
      dataIndex: 'bike',
      render: (text) => <a style={{ width: '200px', display: 'inline-block' }}>{text.BrandName}</a>,
    },
    {
      title: 'user',
      dataIndex: 'userId',
      render: (text) => <a style={{ width: '200px', display: 'inline-block' }}>{text.firstName} {text.lastName}</a>,
    },
    {
      title: 'total',
      dataIndex: 'totalAmount',
      render: (text, value) => <a style={{ width: '40px', display: 'inline-block' }}><i className="icon rupee sign"></i>{text - value.deposit} </a>,
    },
  ];

  const handleChange = (value) => {
    setOrder(value);
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleGeneratePDF = () => {
    setPlacement(true)
  };

  const handleXml = ()=>{
   console.log("xml");
  }

  return (
    <div className="w-full h-700 font-mono font-bold">
      <div className="w-full h-full">
        <div className="w-full h-[150px] bg-gray-200 p-10 flex">
          <div className='flex justify-around w-[60%]'>
            <div>
              <h1>Starting Date</h1>
              <input type="Date" className='h-11 rounded w-[150px] p-3' onChange={(e) => { setDate1(e.target.value) }} />
            </div>
            <div>
              <h1>Ending Date</h1>
              <input type="Date" className='h-11 rounded w-[150px] p-3' onChange={(e) => { setDate2(e.target.value) }} />
            </div>
            <div>
              <div>
                <h1>Order</h1>
              </div>
              <div>
                <Select
                  labelInValue
                  defaultValue={{
                    value: 'all',
                    label: 'all',
                  }}
                  style={{
                    width: 120,
                  }}
                  onChange={handleChange}
                  options={[
                    {
                      value: 'all',
                      label: 'all',
                    },
                    {
                      value: 'complete',
                      label: 'complete',
                    },
                    {
                      value: 'cancel',
                      label: 'cancel',
                    },
                    {
                      value: 'booked',
                      label: 'booked',
                    },
                  ]}
                />
              </div>
            </div>
            <div>
              <h1>filter Data</h1>
              <button className='bg-blue-400 w-[100px] rounded shadow h-12 font-mono font-bold text-white' onClick={filterHandler}>Filter</button>
            </div>
            <div>
              <h1>take print</h1>
              <button onClick={showDrawer} className='bg-green-400 rounded shadow w-[100px] h-12 font-mono font-bold text-white'>Print Now</button>
              <Drawer
                  title="Drawer with extra actions"
                  placement="right"
                  width={800}
                  
                  onClose={onClose}
                  open={open}
                  extra={
                    <Space>
                      <Button onClick={onClose}>Cancel</Button>
                      <Button type="primary" onClick={onClose}>
                        OK
                      </Button>
                    </Space>
                  }
                >
                 <div> 
                    <PDFViewer width={740} height={500}>
                    <MyDocument data={data} />
                  </PDFViewer>
                  </div>
                 
                 
                </Drawer>
            </div>
          </div>
          <div className='w-[40%] h-full'>
            <div className='w-1/2 h-full flex justify-around items-center '>
              <h1>Total Earnings:</h1>
              <span className='text-2xl'><i className="icon rupee sign"></i>{total}</span>
            </div>
          </div>
        </div>
        <div className="w-full h-[500px] mt-6 overflow-y-auto flex justify-center">
          {data.length > 0 ? <Table
            columns={columns}
            dataSource={data}
            className='flex justify-aroundalign-center'
            bordered
            title={() => 'Sales report'}
          /> :
            <div className='w-[500px] h-[500px] bg-slate-400' style={{ backgroundImage: "url(https://i.pinimg.com/564x/ae/8a/c2/ae8ac2fa217d23aadcc913989fcc34a2.jpg)" }}></div>
          }
        </div>
      </div>
    </div>
  )
}

export default Sales;
