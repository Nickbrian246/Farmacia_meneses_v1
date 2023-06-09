import axios from "axios";


const BASE_URL= import.meta.env.VITE_BASE_URL

export async function fetchReport(date:string, token: string){
  try {
    console.log(date)
    const fetch= await axios.get(`${BASE_URL}/sales/${date}`,{
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

