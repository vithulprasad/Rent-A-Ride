import {partnerAxiosInstance} from '../axios'

const partnerLogin = async(data)=>{
    try {
        const response = await partnerAxiosInstance.post(`partnerLogin`,{data})
        return response;
    } catch (error) {
        console.log(error.message);
    }
}

const PartnerDetails = async(data)=>{
    try {
    const response  =    await partnerAxiosInstance.get(`PartnerDetails?token=${data}`)
    return response;

    } catch (error) {
        console.log(error.message);
    }
}

const partnerEdit = async({information,image,token})=>{
    try {
        const response = await partnerAxiosInstance.post(`partnerEdit`,{information:information,image:image,token:token})
        return response;
    } catch (error) {
        console.log(error.message);
    }
}
const locationDetails = async(data)=>{
    try {
        const response = await partnerAxiosInstance.get(`locationDetails?token=${data}`)
        return response;
    } catch (error) {
        console.log(error.message);
    }
}

const bikeDelete =async(id)=>{
    try {
        const response = await partnerAxiosInstance.get(`bikeDelete?id=${id}`);
        return response
    } catch (error) {
        console.log(error.message);
    }
}
const EditBike = async(data)=>{
    try {
        const response =await partnerAxiosInstance.post(`editBike`,{data:data})
        return response
    } catch (error) {
        console.log(error.message);
    }
  
}
const AddBikes=async(datas)=>{
   
    try {
        const response = await partnerAxiosInstance.post(`AddBike`,{data:datas})
        return response
    } catch (error) {
        console.log(error.message)
    }
   
}
const listBike = async()=>{
    try {
        const response = await partnerAxiosInstance.get(`listBike`)
        return response
    } catch (error) {
        console.log(error.message);
    }
}
const NavDetails = async()=>{
    try {
        const response = await partnerAxiosInstance.get(`navProfileDetails`)
           return response
    } catch (error) {
        console.log(error.message);
    }
}
const partnerBookings = async()=>{
    try {
        const response = await partnerAxiosInstance.get('partnerBookings')
        return response
    } catch (error) {
        console.log(error.message);
    }
}
const unlist = async(id)=>{
    try {
        const response = await partnerAxiosInstance.get(`unlist?id=${id}`)
        return response
    } catch (error) {
        console.log(error.message);
    }
}
const list = async(id)=>{
    try {
        const response = await partnerAxiosInstance.get(`list?id=${id}`)
        return response
    } catch (error) {
        console.log(error.message);
    }
}
const completeBooking = async(id)=>{
    try {
        const response = await partnerAxiosInstance.get(`completeBooking?id=${id}`)
        return response
    } catch (error) {
        console.log(error.message);
    }
}
export{
    partnerLogin,
    PartnerDetails,
    partnerEdit,
    locationDetails,
    bikeDelete,
    EditBike,
    AddBikes,
    listBike,
    NavDetails,
    partnerBookings,
    unlist,
    list,
    completeBooking
 
}