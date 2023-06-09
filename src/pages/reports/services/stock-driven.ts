import { GeneralProduct } from "../interfaces";
import axios from "axios";

const BASE_URL= import.meta.env.VITE_BASE_URL

export async function fetchStock(token: string):Promise<GeneralProduct[]>{
  let data: GeneralProduct[] = []
  try {
    const fetch= await axios.get(`${BASE_URL}/productsV2`,{
      headers:{
        'Content-Type': 'application/json',
        "Authorization":`Bearer ${token}`
      }
    })
    const result = fetch.data.data.productsInStock
    data = result
  } catch (error) {
    console.log(error)
  }
  return data 
}