import axios from "axios"
import { ChangeEvent, SetStateAction, useEffect, useState } from 'react';
import { MedicinesData } from "../fetch/fetchMedicines/interface";
import { useSelector } from "react-redux";
const BASE_URL = import.meta.env.VITE_BASE_URL
interface BookMedicineResponse {
    elements : MedicinesData[],
    loading:boolean
    errorMessage:string,
    isError:boolean,
    setIsError:(value: boolean)=> void

}

const useBookMedicineByName= (name: string, dependence:string):BookMedicineResponse => {
    const [elements, setElements] = useState<MedicinesData[]>([])
    const[loading, setLoading] = useState<boolean>(false)
    const [isError, setIsError]=useState<boolean>(false)
    const [errorMessage, setErrorMessage]=useState<string>("")
    const token = useSelector((state:any)=> state.loggedUser.token)
    useEffect(() => {
        setLoading(true)
        let cancel :any;
        if(name==="") {
            return setLoading(false)
        }
    try {
        axios({
                method:"get",
                url:`${BASE_URL}/inputDynamicSearchByName/${name}`,
                headers:{
                    'Content-Type': 'application/json',
                    "Authorization":`Bearer ${token}`
                },
                cancelToken:new axios.CancelToken (c=> cancel =c)
        }).then((response) => {
            setLoading(false)
            setIsError(false)
            setElements(response.data.data)
        }).catch( (error) =>{
            setLoading(false)
            setIsError(true)
            setErrorMessage(error.response.data.error)
        }
        )
    } catch (error) {
        console.log(error)
        }
    return () => {
        cancel()
        setElements([])
        setElements([])
    }
    }, [dependence])

    return {elements,loading,isError,errorMessage,setIsError}
    
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