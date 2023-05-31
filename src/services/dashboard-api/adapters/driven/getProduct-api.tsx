import axios from "axios";
import { ModelData } from "../interfaces/productInterface";

// const BASE_URL="http://localhost:3000/apiV2"
const BASE_URL= import.meta.env.VITE_BASE_URL



const getProductById = async(id:string, token:string) => {
  try {
    const get = await axios.get(`${BASE_URL}/modifyProductInStock/${id}`,{
      headers: {
        'Content-Type': 'application/json',
        "Authorization":`Bearer ${token}`
        }
    })
    console.log(get.data.data)
    return get.data
  } catch (error) {
    console.log(error,"soy error de ger medicine");
  }
}
const getAllProducts=  async() => {
  try {
    const get = await axios.get(`${BASE_URL}/productsV2/`)
    return get.data
  } catch (error) {
    console.log(error,"soy error obtener todos productos");
  }
}
export {getProductById,getAllProducts}