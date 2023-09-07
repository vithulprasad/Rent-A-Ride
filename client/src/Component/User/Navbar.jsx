

function Navbar() {
  return (
    <div className='h-20  w-full bg-white' style={{boxShadow:" inset 0 -3em 3em rgba(0, 0, 0, 0.1),0 0 0 2px rgb(255, 255, 255),0.3em 0.3em 1em rgba(0, 0, 0, 0.3)"}}>
    <div className='flex justify-between'>
        <div className='w-16 h-16 ml-10 mt-2 rounded-full bg-cover bg-no-repeat bg-center' style={{backgroundImage:'url("https://i.pinimg.com/564x/07/a9/9e/07a99eab4d4f41204937a4692b89bd10.jpg")',backgroundPosition: 'center', backgroundSize: '150px',boxShadow:" inset 0 -3em 3em rgba(0, 0, 0, 0.1),0 0 0 2px rgb(255, 255, 255),0.3em 0.3em 1em rgba(0, 0, 0, 0.3)"}}>
      
        </div>
        <div className='p-3.5 flex justify-between'>
        <button className="p-1  ml-5 border border-transparent rounded hover:bg-gray-50">Home</button> 
        <button className="p-1  ml-5 border border-transparent rounded hover:bg-gray-50">bikes</button> 
        <button className="p-1  ml-5 border border-transparent rounded hover:bg-gray-50">join Us</button> 
        <button className="p-1 w-20 ml-2 border border-transparent rounded hover:bg-gray-50">Offers</button> 
        <button className="p-1 w-20 border border-transparent rounded hover:bg-gray-50">tariff</button> 
        <div className="w-12 h-12 rounded-full bg-cover bg-no-repeat bg-center " style={{ backgroundImage: 'url("https://i.pinimg.com/564x/16/44/24/164424f8266e393b5874e72ac9c997d8.jpg")', backgroundPosition: 'center -18px', backgroundSize: '65px',boxShadow:" inset 0 -3em 3em rgba(0, 0, 0, 0.1),0 0 0 2px rgb(255, 255, 255),0.3em 0.3em 1em rgba(0, 0, 0, 0.3)"}}></div> 
        </div>
    </div>
  </div>
  )
}

export default Navbar
