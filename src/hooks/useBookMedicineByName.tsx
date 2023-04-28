import axios from "axios"
import { ChangeEvent, useEffect, useState } from 'react';
import { MedicinesData } from "../fetch/fetchMedicines/interface";
interface BookMedicineResponse {
    elements : MedicinesData[],
    loading:boolean
}

const useBookMedicineByName= (name: string, dependence:string):BookMedicineResponse => {
    const [ elements, setElements] = useState<MedicinesData[]>([])
    const[loading, setLoading] = useState<boolean>(false)
    useEffect(() => {
        setLoading(true)
        if(name==="") {
            setLoading(false)
        }
        let cancel :any;
        axios({
            method:"get",
            url:`http://localhost:3000/api/getMedicineByName/${name}`,
            cancelToken: new axios.CancelToken(c => cancel =c)
        }).then((res) => {
            setElements(res.data.data)
            setLoading(false)})
        .catch((e) =>{
            if( axios.isCancel(e)) return 
        })

    return () => {
        cancel()
    setElements([])}
    }, [dependence])
    return {elements,
        loading}
    
}
export { useBookMedicineByName}