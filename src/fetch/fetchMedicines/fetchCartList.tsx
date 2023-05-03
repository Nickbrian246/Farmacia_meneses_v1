import axios from "axios";
const BASE_URL = "http://localhost:3000/api/sales"
interface CreateCartList {
  name:string,
  price:string,
  amount:string
}
const config = {
  headers: {
  'Content-Type': 'application/json'
  }
};


async function createCartList(data:CreateCartList) {
try {
  const req =  await axios.post(BASE_URL,data,config)
  return req.data
} catch (error) {
  console.log(error)
}
}

async function getCartList(data:CreateCartList) {
  try {
    const req =  await axios.get(BASE_URL,config)
    return req.data
  } catch (error) {
    console.log(error)
  }
}

export {createCartList,getCartList}