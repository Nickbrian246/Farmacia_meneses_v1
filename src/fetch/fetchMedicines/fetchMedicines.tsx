import {
    Data,
PostMedicines,
} from "./interface"
const BASE_URL ="http://localhost:3000/api"

async function fetchMedicinesDatA(): Promise<Data>{
        const data =  await fetch(`http://localhost:3000/api/newmedicine`)
        const response= await data.json()
        return response 
}

async function PostMedicinesDara (datos:PostMedicines) {
    const data = await fetch("http://localhost:3000/api/newmedicine",{
        method:"POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(datos)
    });
    const response = data.json()
    return response

}
export {fetchMedicinesDatA,PostMedicinesDara}