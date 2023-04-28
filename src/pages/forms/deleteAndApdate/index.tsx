import React, { useEffect, useRef, useState } from "react";
import {listFormMedicineUpdateOrDelete} from "./listOptions"
import { Button, TextField } from "@mui/material";
import { FormEvent } from "react";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import {FormMedicine} from "../interfaces"
import "../addMedicine/mediform.css";
import { fetchItemByName } from "../../../fetch/fetchMedicines/fetchMedicines";

// dos formulario 
// uno es para actualizar y crear 
// para eliminar 

interface Props  {
    isAdd:boolean
}
type FormMedicineKey = keyof FormMedicine;
const list: { id: number; name: FormMedicineKey }[] = [
{ id: 1, name: "name" },
{ id: 2, name: "compound" },
{ id: 3, name: "price" },
{ id: 4, name: "type" },
{ id: 5, name: "quantity" },
{ id: 6, name: "function" },
{ id: 7, name: "imgId" },
];
const FormDeleteOrUpdateMedicne=(props:Props) =>{
    const formRef = useRef<HTMLFormElement>(null);
    const [error, setError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [form, setForm] = useState<FormMedicine>({
        name:"",
        compound:"",
        price:"",
        type:"",
        quantity:"",
        function:"",
        imgId:""
        
    })
    ;
    
    const {isAdd} = props
    const handleInputChange=( event:React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        // console.log(name,value,"soy value")
        // Actualizar el estado con los nuevos valores
        setForm(prevState => ({
        ...prevState,
        [name]: value
        }));
        
    }
    const handleSumbitBtn = (event: FormEvent<HTMLFormElement> ) =>{
        event.preventDefault();
        if(   !form.compound
            || !form.function
            || !form.name
            || !form.price
            || !form.quantity
            || !form.type){
                setErrorMessage(" todos los campos deben de estar completos")
            return setError(true)
        }
        // SOLUCIONAR CHEQUEADO DE TIPOS DE DATOS
        if( !!isNaN(parseFloat(form.price)) || !!isNaN(parseFloat(form.quantity)) ) {
            setErrorMessage("los camops precio y cantidad deben de ser numeros")
            return setError(true)
        }
        setError(false)
        // setForm({
        //     name:"",
        //     compound:"",
        //     price:"",
        //     type:"",
        //     quantity:"",
        //     function:"",
        //     imgId:""
            
        // })
    }

    useEffect(()=>{
        const response = fetchItemByName("nombre")
        response
        .then((data) => setForm(data.data))
        .catch((error) => console.log(error,"hubo un error"))
    },[])

    return (
        <>
        {error && (
        <Alert style={{position:"fixed",top:"12%",right:"30%", left:"30%"}} severity="error">
        <AlertTitle>Error</AlertTitle>
        {errorMessage} — <strong>porfavor revise el campo pertinente</strong>
        </Alert>
        )}
        {/* {isAdd && ( // para agregar
                    <form  className="medicForm"  >
                    {listFormMedicineUpdateOrDelete.map((item) =>(
                        <TextField
                        key={item.id}
                        value={form[item.name as FormMedicineKey ]}
                        name={item.name}
                        style={{width:"400px", margin:"5px"}}
                        id="outlined-basic"
            
                        />
                    ))}
                <Button  type= "submit" size="large" variant="contained" >
                guardar
                </Button>
                    </form>
        )}
        {!isAdd && ( // para eliminar
                    <form  className="medicForm"  >
                    {listFormMedicineUpdateOrDelete.map((item) =>(
                        <TextField
                        key={item.id}
                        value={form[item.name as FormMedicineKey ]}
                        name={item.name}
                        style={{width:"400px", margin:"5px"}}
                        id="outlined-basic"
            
                        />
                    ))}
                <Button  type= "submit" size="large" variant="contained"color="error" >
                eliminar
                </Button>
                    </form>
        )} */}

            {isAdd && ( // para actualizar
                    <form  ref={formRef} className="medicForm" onSubmit={handleSumbitBtn}  >
                    {listFormMedicineUpdateOrDelete.map((item) =>(
                        <TextField
                        key={item.id}
                        value={form[item.name as FormMedicineKey ]}
                        name={item.name}
                        style={{width:"400px", margin:"5px"}}
                        id="outlined-basic"
                        onChange={handleInputChange}
            
                        />
                    ))}
                <Button style={{marginTop:"18px"}}  type= "submit" size="large" variant="contained"color="success" >
                actualizar
                </Button>
                    </form>
        )}
        </>
    )
}
export{FormDeleteOrUpdateMedicne}