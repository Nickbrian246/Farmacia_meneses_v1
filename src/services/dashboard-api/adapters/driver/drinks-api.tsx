import axios from "axios";
import { PostDrinks, ModifyItemForOtherProducts } from "../../../../pages/forms/interfaces";
import { Drinks ,} from "../interfaces/productInterface";
// const BASE_URL="http://localhost:3000/apiV2/"
const BASE_URL= import.meta.env.VITE_BASE_URL


const config = {
  headers: {
  'Content-Type': 'application/json'
  }
};




const postDrinks= async( data:PostDrinks, token:string) => {
  try {
    const sendData= await axios.put(`${BASE_URL}/productsV2`,data,
    {
      headers: {
        'Content-Type': 'application/json',
        "Authorization":`Bearer ${token}`
        }
    })
    return sendData.data
  } catch (error) {
    console.log(error)
  }
}
const updateDrinks= async( data:ModifyItemForOtherProducts, token:string) => {
  try {
    const update= await axios.put(`${BASE_URL}/modifyProductInStock`, data,
    {
      headers: {
        'Content-Type': 'application/json',
        "Authorization":`Bearer ${token}`
        }
    })
    return update.data
  } catch (error) {
    console.log(error)
  }

}
const deleteDrinks= async (id:string, token:string) => {
  try {
    const deleteItem=  await axios.delete(`${BASE_URL}/modifyProductInStock/${id}`,
    {
      headers: {
        'Content-Type': 'application/json',
        "Authorization":`Bearer ${token}`
        }
    })
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

