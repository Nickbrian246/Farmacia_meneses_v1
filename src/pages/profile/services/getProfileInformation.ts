import axios from "axios";

const BASE_URL= import.meta.env.VITE_BASE_URL

export const getUserDetails= async( token:string) => {
    try {
    const get = await axios.get(`${BASE_URL}/userProfile`,
    {
        headers: {
        'Content-Type': 'application/json',
        "Authorization":`Bearer ${token}`
        }
    })
    return get.data
    } catch (error) {
        throw error
    }
}
