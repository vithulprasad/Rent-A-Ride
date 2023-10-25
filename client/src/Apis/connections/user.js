
import { userAxiosInstance } from "../axios"


const otpGenerate = (email)=>{
    try {
       const response= userAxiosInstance.get(`otpGenerate?data=${encodeURIComponent(email)}`)
        return response
    } catch (error) {
        console.log(error.message);
    }
}

const profileEditDataDetails = (token)=>{
    try {
        const response = userAxiosInstance.get(`profileEditDataDetails?token=${encodeURIComponent(token)}`)
        return response;
    } catch (error) {
        console.log(error.message);
    }
}

const editProfileData = (data,user)=>{
    try {
        const response = userAxiosInstance.post(`editProfileData`,{form:data,user:user})
        return response;
    
    } catch (error) {
        console.log(error.message);
    }
}
    
const navDetails= (token)=>{
    try {
        const response = userAxiosInstance.get(`navDetails?token=${token}`);
        return response;
    } catch (error) {
        console.log(error.message); 
    }
}

const orderPageDetails = async(id)=>{
    try {
        const response =await userAxiosInstance.get(`orderPageDetails?id=${id}`);
        return response;
    } catch (error) {
        console.log(error.message);
    }
}

const checkout = async(data)=>{
    try {
        const response = await userAxiosInstance.post(`checkout`,{data})
        return response
    } catch (error) {
        console.log(error.message);
    }
}

const paymentSuccess = async (data) =>{
    try {
        const response = await userAxiosInstance.post(`paymentSuccess`,{data})
        return response
    } catch (error) {
        console.log(error.message);
    }
}
const paymentDetails = async ()=>{
    try {
        const response = await userAxiosInstance.get(`paymentDetails`)
        return response
    } catch (error) {
        console.log(error.message);
    }
}

const applyCoupon = async(data)=>{
    try {
        const response = await userAxiosInstance.post(`applyCoupon`,{data})
        return response
    } catch (error) {
        console.log(error.message);
    }
   
}
const listCoupons = async()=>{
    try {
        const response = await userAxiosInstance.get(`listCoupons`)
        return response
    } catch (error) {
        console.log(error.message);
    }   
}
const cancelBooking = async(id)=>{
    try {
        const response = await userAxiosInstance.get(`cancelBooking?id=${id}`)
        return response
    } catch (error) {
        console.log(error.message);
    }
}
const tariffPage = async()=>{
    try {
        const response = await userAxiosInstance.get(`tariffPage`)
        return response
    } catch (error) {
        console.log(error.message);
    }
}

const walletDetails = async()=>{
    try {
        const response = await userAxiosInstance.get(`walletDetails`)
        return response
    } catch (error) {
        console.log(error.message);
    }
}
const chat = async()=>{
    try {
        const response = await userAxiosInstance.get(`chat`)
        return response
    } catch (error) {
        console.log(error.message);
    }
}
const chatSave = async(data)=>{
    try {
        const response = await userAxiosInstance.post(`chatSave`,data)
        return response
    } catch (error) {
        console.log(error.message);
    }
}
const socketCall = async(data)=>{
    try {
        const response = await userAxiosInstance.post(`socket`,data)
        return response
    } catch (error) {
        console.log(error.message);
    }
} 

export{
    otpGenerate,
    profileEditDataDetails,
    editProfileData,
    navDetails,
    orderPageDetails,
    checkout,
    paymentSuccess,
    paymentDetails,
    applyCoupon,
    listCoupons,
    cancelBooking,
    tariffPage,
    walletDetails,
    chat,
    chatSave,
    socketCall

}