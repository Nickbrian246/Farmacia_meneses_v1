import axios from "axios";
import { PostNewSale } from "../interfaces";

const BASE_URL= import.meta.env.VITE_BASE_URL


export async function postSales(sales:PostNewSale, token: string) {
  try {
    const response = await axios.put(`${BASE_URL}/sales`, sales,
    {
      headers: {
        'Content-Type': 'application/json',
        "Authorization":`Bearer ${token}`
        }
    });
    return response.data
  } catch (error) {
    console.error(error);
  }
  
}
