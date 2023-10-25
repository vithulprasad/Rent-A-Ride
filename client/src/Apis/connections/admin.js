import { adminAxiosInstance } from "../axios"

const login =async(data)=>{
    try {
        console.log("instance is calling");
        const response = await adminAxiosInstance.post(`login`,{data})
        console.log(response);
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
const addCoupon = async(data,image)=>{
    try {
       const response = await adminAxiosInstance.post(`addCoupon`,{data,image})
       return response 
    } catch (error) {
        console.log(error.message); 
    }
}
const getCoupons = async()=>{
    try {
        const response = await adminAxiosInstance.get(`getCoupons`)
        return response;
    } catch (error) {
        console.log(error.message);
    }
}
const bookingAdmin = async()=>{
    try {
        const response = await adminAxiosInstance.get(`bookingAdmin`)
        return response;
    } catch (error) {
        console.log(error.message);
    }
}
const singleOrderDetails =async(id)=>{
    try {
        const response = await adminAxiosInstance.get(`singleOrderDetails?id=${id}`)
        return response;
    } catch (error) {
        console.log(error.message);
    }
}
const dashboardData = async()=>{
    try {
        const response = await adminAxiosInstance.get(`dashboardData`)
        return response;
    } catch (error) {
        console.log(error.message);
    }
}

const dashboardChartOrder = async()=>{
    try {
        const response = await adminAxiosInstance.get(`dashboardChartOrder`)
        return response;
    } catch (error) {
        console.log(error.message);
    }
}
const dashboardChartPartner = async()=>{
    try {
        const response = await adminAxiosInstance.get(`dashboardChartPartner`)
        return response;
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
    userBlocking,
    addCoupon,
    getCoupons,
    bookingAdmin,
    singleOrderDetails,
    dashboardData,
    dashboardChartOrder,
    dashboardChartPartner
}