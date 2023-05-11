import axios from "axios";
import { MedicineData,Drinks } from "../interfaces/productInterface";

const BASE_URL = "http://localhost:3000/apiV2/"


const config = {
  headers: {
  'Content-Type': 'application/json'
  }
};



const postMedicines= async( data:MedicineData) => {
  try {
    const sendData= await axios.post(`${BASE_URL}/productsV2`,data,config)
    return sendData.data
  } catch (error) {
    console.log(error)
  }
}
const updateMedicine= async( id:string, data:MedicineData) => {
  try {
    const update= await axios.put(`${BASE_URL}/productsV2/${id}`, data,config)
    return update.data
  } catch (error) {
    console.log(error)
  }

}
const deleteMedicine= async (id:string) => {
  try {
    const deleteItem=  await axios.delete(`${BASE_URL}/productsV2/${id}`)
    return deleteItem.data
  } catch (error) {
    console.log(error)
  }
}
const postDrinks= async( data:Drinks) => {
  try {
    const sendData= await axios.post(`${BASE_URL}/productsV2`,data,config)
    return sendData.data
  } catch (error) {
    console.log(error)
  }
}
export {postMedicines,
  deleteMedicine,
  postDrinks,
  updateMedicine,
}

