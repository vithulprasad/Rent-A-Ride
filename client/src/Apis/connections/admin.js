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
const partnerBikeReject =async(data)=>{
    try {
        const response = await adminAxiosInstance.post(`partnerBikeReject`,{data:data})
        return response
    } catch (error) {
        console.log(error.message);
    }
}
const RequestDetails =async()=>{
    try {
        const request = await adminAxiosInstance.get(`request`)
        return request
    } catch (error) {
        console.log(error.message);
    }
}
const accessConfirmation =async(email)=>{
    try {
        const request =await adminAxiosInstance.get(`accessConfirmation?email=${email}`)
        return request;
    } catch (error) {
        console.log(error.message); 
    }
}
const rejectedNow = async(data)=>{
    try {
        const request = await adminAxiosInstance.post(`rejected`,{data})
        return request
    } catch (error) {
        console.log(error.message); 
    }
}
const findPartner=async()=>{
    try {
        const request =await adminAxiosInstance.get(`findPartner`)
        return request
    } catch (error) {
        console.log(error.message); 
    }
}
const partnerBlocking =async(data)=>{
    try {
        const response = await adminAxiosInstance.get(`partnerBlocking?data=${data}`)
        return response
    } catch (error) {
        console.log(error.message); 
    }
}

const userDetails = async()=>{
    try {
        const request = await adminAxiosInstance.get(`userDetails`)
        return request
    } catch (error) {
        console.log(error.message); 
    }
}
const userBlocking = async(email)=>{
    try {
       const response = await adminAxiosInstance.get(`userBlocking?email=${email}`)
       return response 
    } catch (error) {
        console.log(error.message); 
    }
}
export{
    login,
    bikeDetails,
    partnerBikeReject,
    RequestDetails,
    accessConfirmation,
    rejectedNow,
    findPartner,
    partnerBlocking,
    userDetails,
    userBlocking
}