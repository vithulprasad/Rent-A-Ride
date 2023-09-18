import {partnerAxiosInstance} from '../axios'

const partnerLogin = async(data)=>{
    try {
        const response = await partnerAxiosInstance.post(`partnerLogin`,{data})
        return response;
    } catch (error) {
        console.log(error.message);
    }
}

export{
    partnerLogin
}