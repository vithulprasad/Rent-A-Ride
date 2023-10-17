import  Header from "../../Component/User/Navbar";
import Footer from "../../Component/User/Footer";
import Chat from "../../Component/User/Chat";
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import  { Fragment, useEffect } from 'react'
function ChatPage({authorized}) {
    const navigate = useNavigate()
    useEffect(()=>{
        if(!authorized){
            console.log("no user");
          navigate('/')
        }
      },[])
  return (
    <Fragment>
       <Header/>
          <Chat/>
       <Footer/>
    </Fragment>
  )
}

export default ChatPage
ChatPage.propTypes = {
    authorized: PropTypes.bool.isRequired,
  };