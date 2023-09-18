import { adminAxiosInstance } from "../axios"

const login =async(data)=>{
    try {
        const response = await adminAxiosInstance.post(`login`,{data})
        return response;
    } catch (error) {
        console.log(error.message);
    }
}
const bikeDetails = async()=>{
    try {
        const response = await adminAxiosInstance.get(`bikeDetails`)
        return response;
    } catch (error) {
        console.log(error.message);
    }
}


export{
    login,
    bikeDetails
}