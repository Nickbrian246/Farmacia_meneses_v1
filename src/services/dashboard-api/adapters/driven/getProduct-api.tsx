import axios from "axios";

const BASE_URL="http://localhost:3000/apiV2"

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
    console.log(error,"soy error de ger medidince");
  }
}
export {getProductById}