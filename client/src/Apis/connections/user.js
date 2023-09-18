import { userAxiosInstance } from "../axios"


const otpGenerate = (email)=>{
    try {
       const response= userAxiosInstance.get(`otpGenerate?data=${encodeURIComponent(email)}`)
        return response
    } catch (error) {
        console.log(error.message);
    }
}



export{
    otpGenerate,
}