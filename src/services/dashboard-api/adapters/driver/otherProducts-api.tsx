import axios from "axios";
import { GeneralProducts } from "../interfaces/productInterface";
const BASE_URL="http://localhost:3000/apiV2/"


const config = {
  headers: {
  'Content-Type': 'application/json'
  }
};




const postOtherProduct= async( data:GeneralProducts) => {
  try {
    const sendData= await axios.post(`${BASE_URL}/productsV2`,data,config)
    return sendData.data
  } catch (error) {
    console.log(error)
  }
}
const updateOtherProduct= async( id:string, data:GeneralProducts) => {
  try {
    const update= await axios.put(`${BASE_URL}/productsV2/${id}`, data,config)
    return update.data
  } catch (error) {
    console.log(error)
  }

}
const deleteOtherProduct= async (id:string) => {
  try {
    const deleteItem=  await axios.delete(`${BASE_URL}/productsV2/${id}`)
    return deleteItem.data
  } catch (error) {
    console.log(error)
  }
}
export {
  postOtherProduct,
  updateOtherProduct,
  deleteOtherProduct,
}

