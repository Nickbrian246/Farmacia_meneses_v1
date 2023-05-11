import axios from "axios"
import { ChangeEvent, useEffect, useState } from 'react';
import { MedicinesData } from "../fetch/fetchMedicines/interface";
interface BookMedicineResponse {
    elements : MedicinesData[],
    loading:boolean
}

const useInputSearch= (name: string, dependence:string):BookMedicineResponse => {
    const [ elements, setElements] = useState<MedicinesData[]>([])
    const[loading, setLoading] = useState<boolean>(false)
    useEffect(() => {
        setLoading(true)
        if(name==="") {
            return setLoading(false)
        }
        let cancel :any;
        axios.all([
                axios({
                    method:"get",
                    url:`http://localhost:3000/api/getMedicineByName/${name}`,
                    cancelToken: new axios.CancelToken(c => cancel =c)
                }),
                axios({
                    method:"get",
                    url:`http://localhost:3000/api/drinksByName//${name}`,
                    cancelToken: new axios.CancelToken(c => cancel =c)
                }),
            ])
            .then(axios.spread((medicineResponse, drinksResponse) => {
                setLoading(false)
                let medicines= medicineResponse.data.data
                let drinks= drinksResponse.data.data
                setElements([...medicines,...drinks])
                // console.log(juntos,"soy desde el then");
            }))
        .catch((e) =>{
            if( axios.isCancel(e)) return 
        })
    return () => {
        cancel()
        setElements([])
    setElements([])}
    }, [dependence])
    return {elements,
        loading}
    
}
export { useInputSearch}