import axios from "axios";
import { MedicineData,Drinks } from "../interfaces/productInterface";
import { PostMedicines ,ModifyItemMedicine } from "../../../../pages/forms/interfaces";

// const BASE_URL = "http://localhost:3000/apiV2/"
const BASE_URL= import.meta.env.VITE_BASE_URL






const postMedicines= async( data:PostMedicines, token: string) => {
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
const updateMedicine= async(  data:ModifyItemMedicine, token: string) => {
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
const deleteMedicine= async (id:string,  token: string) => {
  try {
    console.log(id)
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
const postDrinks= async( data:Drinks, token: string) => {
  try {
    const sendData= await axios.post(`${BASE_URL}/productsV2`,data,
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
export {
  postMedicines,
  deleteMedicine,
  postDrinks,
  updateMedicine
};
  export type { MedicineData };

