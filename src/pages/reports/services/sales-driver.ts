import axios from "axios"
import { ArrayOfDates } from "../interfaces"

const BASE_URL = import.meta.env.VITE_BASE_URL
export async function fetchWeeklyReport(date:ArrayOfDates, token: string){
  try {
    const fetch = await axios.post(`${BASE_URL}/weeklyReport`,date,{
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