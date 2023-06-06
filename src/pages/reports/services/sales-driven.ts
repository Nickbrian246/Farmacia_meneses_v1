import axios from "axios";
import { formatDate } from "../utils";

const BASE_URL= import.meta.env.VITE_BASE_URL

export async function fetchTodayReport(date:string, token: string){
  try {
    const formattedDate= formatDate(date)
    const fetch= await axios.get(`${BASE_URL}/sales/${formattedDate}`,{
      headers:{
        'Content-Type': 'application/json',
        "Authorization":`Bearer ${token}`
      }
    })
    return fetch.data
  } catch (error) {
    console.log(error)
  }

}