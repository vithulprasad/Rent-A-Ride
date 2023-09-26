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

export{
    otpGenerate,
    profileEditDataDetails,
    editProfileData,
    navDetails,
}