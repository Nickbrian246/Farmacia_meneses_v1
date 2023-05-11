import axios from "axios"
import { ChangeEvent, useEffect, useState } from 'react';
import { MedicinesData } from "../fetch/fetchMedicines/interface";
import { error, log } from "console";
interface BookMedicineResponse {
    elements : MedicinesData[],
    loading:boolean
}
const BASE_URL="http://localhost:3000/apiV2/";

const useBookMedicineByName= (name: string, dependence:string):BookMedicineResponse => {
    const [ elements, setElements] = useState<MedicinesData[]>([])
    const[loading, setLoading] = useState<boolean>(false)
    useEffect(() => {
        setLoading(true)
        if(name==="") {
            return setLoading(false)
        }
        let cancel :any;
        try {
            axios({
                method:"get",
                url:`${BASE_URL}/inputDynamicSearchByName/${name}`,
                cancelToken:new axios.CancelToken (c=> cancel =c)
            }).then((response) => {
                setLoading(false)
                setElements(response.data.data)
            }).catch( (error) =>{
                console.log(error,"desde inputn dinamico")
            }
            )
        } catch (error) {
            console.log(error,"soy errro desde el input")
        }
    return () => {
        cancel()
        setElements([])
    setElements([])}
    }, [dependence])
    return {elements,
        loading}
    
}
export { useBookMedicineByName}

        // axios.all([
        //         axios({
        //             method:"get",
        //             url:`http://localhost:3000/api/getMedicineByName/${name}`,
        //             cancelToken: new axios.CancelToken(c => cancel =c)
        //         }),
        //         axios({
        //             method:"get",
        //             url:`http://localhost:3000/api/drinksByName//${name}`,
        //             cancelToken: new axios.CancelToken(c => cancel =c)
        //         }),
        //     ])
        //     .then(axios.spread((medicineResponse, drinksResponse) => {
        //         setLoading(false)
        //         let medicines= medicineResponse.data.data
        //         let drinks= drinksResponse.data.data
        //         setElements([...medicines,...drinks])
        //         // console.log(juntos,"soy desde el then");
        //     }))
        // .catch((e) =>{
        //     if( axios.isCancel(e)) return 
        // })