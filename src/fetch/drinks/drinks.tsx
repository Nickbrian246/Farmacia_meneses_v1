import axios from "axios";
import { Drinks } from "../../services/dashboard-api/adapters/interfaces/productInterface";
const BASE_URL= "http://localhost:3000/api/drinks"

const config = {
  headers: {
  'Content-Type': 'application/json'
  }
};

async function postDrinks(data: Drinks) {
  try {
    const sendData = await axios.post(BASE_URL,data)
  return sendData.data
  } catch (error) {
    console.log(error);
    
  }
}
async function deleteDrink(id: string) {
  try {
    const sendData = await axios.delete(`${BASE_URL}/${id}`)
  return sendData.data
  } catch (error) {
    console.log(error);
    
  }
}
async function updateDrink(id: string, data:Drinks) {
  try {
    const sendData = await axios.put(`${BASE_URL}/${id}`,data,config)
  return sendData.data
  } catch (error) {
    console.log(error);
    
  }
}

export {
  postDrinks,
  deleteDrink,
  updateDrink
}