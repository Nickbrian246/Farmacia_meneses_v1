import axios from "axios";
const BASE_URL="http://localhost:3000/api/sales"

interface Item {
  name:string,
  price:number,
  quantity:number,
  total:number,
  id:string
}
interface Sale{
  products:Item[],
  date:string,
  total:number,
  cashReceived:number,
  changeGiven:number
  
}

async function postSales(sales:Sale) {
  try {
    const response = await axios.post(BASE_URL, sales);
    return response.data
  } catch (error) {
    console.error(error);
  }
  
}

export {postSales}