import axios from "axios";
import { Drinks } from "../interfaces/productInterface";
// const BASE_URL="http://localhost:3000/apiV2/"
const BASE_URL= import.meta.env.VITE_BASE_URL


const config = {
  headers: {
  'Content-Type': 'application/json'
  }
};




const postDrinks= async( data:Drinks) => {
  try {
    const sendData= await axios.post(`${BASE_URL}/productsV2`,data,config)
    return sendData.data
  } catch (error) {
    console.log(error)
  }
}
const updateDrinks= async( id:string, data:Drinks) => {
  try {
    const update= await axios.put(`${BASE_URL}/productsV2/${id}`, data,config)
    return update.data
  } catch (error) {
    console.log(error)
  }

}
const deleteDrinks= async (id:string) => {
  try {
    const deleteItem=  await axios.delete(`${BASE_URL}/productsV2/${id}`)
    return deleteItem.data
  } catch (error) {
    console.log(error)
  }
}
export {
  postDrinks,
  updateDrinks,
  deleteDrinks,
}

