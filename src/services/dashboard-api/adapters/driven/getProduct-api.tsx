import axios from "axios";
import { ModelData } from "../interfaces/productInterface";

// const BASE_URL="http://localhost:3000/apiV2"
const BASE_URL= import.meta.env.VITE_BASE_URL



const config = {
  headers: {
  'Content-Type': 'application/json'
  }
};
const getProductById=  async(id:string) => {
  try {
    const get = await axios.get(`${BASE_URL}/productsV2/${id}`)
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