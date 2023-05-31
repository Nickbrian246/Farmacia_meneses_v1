import axios from "axios";
import { PostDrinks,ModifyItemForOtherProducts } from "../../../../pages/forms/interfaces";

const BASE_URL= import.meta.env.VITE_BASE_URL

const postOtherProduct= async( data:PostDrinks, token:string) => {
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
const updateOtherProduct= async(  data:ModifyItemForOtherProducts, token:string) => {
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
const deleteOtherProduct= async (id:string, token:string) => {
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
  postOtherProduct,
  updateOtherProduct,
  deleteOtherProduct,
}

