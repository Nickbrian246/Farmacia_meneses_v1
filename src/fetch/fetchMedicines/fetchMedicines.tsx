import {
Data,
PostMedicines,
} from "./interface"
import axios from "axios"
const BASE_URL ="http://localhost:3000/api"
const config = {
    headers: {
    'Content-Type': 'application/json'
    }
};

async function fetchMedicinesDatA(): Promise<Data>{
        const data =  await fetch(`http://localhost:3000/api/newmedicine`)
        const response= await data.json()
        return response 
}

async function PostMedicinesData (datos:PostMedicines) {
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
async function fetchItemById(id:string){
    if(id==="") return null
    let data;
    try {
        const [medicineResponse, drinksResponse] = await axios.all([
            axios.get(`http://localhost:3000/api/newmedicine/${id}`),
            axios.get(`http://localhost:3000/api/drinks/${id}`)
        ]);
        if (medicineResponse.data!=="elemenento no encontrado o ha sido eliminado") {
            return data={...medicineResponse.data}
        }
        if(drinksResponse.data!=="elemenento no encontrado o ha sido eliminado"){
            return data={...drinksResponse.data};
        }
     
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function updateMedicine(datos :PostMedicines, id:string) {
    const req = await axios.put(
                `http://localhost:3000/api/newmedicine/${id}`,
                datos,
                config)
    const response = await req.data
    return response
}
async function deleteMedicine(id:string) {
    const req = await axios.delete(
                `http://localhost:3000/api/newmedicine/${id}`,
                config)
    const response = await req.data
    return response
}
export {
    fetchMedicinesDatA,
    PostMedicinesData,
    fetchItemById,
    updateMedicine,
    deleteMedicine}