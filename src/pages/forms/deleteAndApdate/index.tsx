import React, { useEffect, useRef, useState } from "react";
import {listFormMedicineUpdateOrDelete} from "./listOptions"
import { Button, TextField } from "@mui/material";
import { FormEvent } from "react";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import {FormMedicine} from "../interfaces"
import "../addMedicine/mediform.css";
import { fetchItemById } from "../../../fetch/fetchMedicines/fetchMedicines";
import { 
    PostMedicinesData,
    updateMedicine,
    deleteMedicine} from "../../../fetch/fetchMedicines/fetchMedicines";


export type AlertColor = 'success' | 'info' | 'warning' | 'error';
// dos formulario 
// uno es para actualizar y crear 
// para eliminar 

interface Props  {
    type:string,
    id:string
}
interface ErrorMessage {
    error:string,
    message:string
    type: undefined |AlertColor,
    errorName:string

}
type FormMedicineKey = keyof FormMedicine;
        // setForm({
        //     name:"",
        //     compound:"",
        //     price:"",
        //     type:"",
        //     quantity:"",
        //     function:"",
        //     imgId:""
            
        // })

const FormCrudMedicne=(props:Props) =>{
    const {type,id} = props
    const formRef = useRef<HTMLFormElement>(null);
    const [error, setError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<ErrorMessage>({
        error:"",
        message:"",
        type:"success",
        errorName:""
    })
    const [form, setForm] = useState<FormMedicine>({
        name:"",
        compound:"",
        price:"",
        type:"",
        quantity:"",
        function:"",
        imgId:""
        
    });
// funcion que asigna los valores al form independiente del metodo
    const handleInputChange=( event:React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        // console.log(name,value,"soy value")
        // Actualizar el estado con los nuevos valores
        setForm(prevState => ({
        ...prevState,
        [name]: value
        }));
        
    }
    // funcion para ejecutar los eventos del formulario
    const handleSumbitBtn = (event: FormEvent<HTMLFormElement> ) =>{
        event.preventDefault();
        if(   !form.compound
            || !form.function
            || !form.name
            || !form.price
            || !form.quantity
            || !form.type){
                setErrorMessage({
                error:"campo vacio",
                message:"porfavor revise que los campos no esten vacios",
                type:"error",
                errorName:"error"})
            return setError(true)
        }
        // SOLUCIONAR CHEQUEADO DE TIPOS DE DATOS
        if( !!isNaN(parseFloat(form.price)) || !!isNaN(parseFloat(form.quantity)) ) {
            setErrorMessage({
                error:"el compo de precio o canitdad no son numeros",
                message:"porfavor revise que los datos intruducidos sean numeros",
                type:"error",
                errorName:"error"})
            return setError(true)
        }
        setError(false)
        if(type==="add") { // agregar 
            PostMedicinesData(form)
            .then((response) => {
                setError(true),
                setErrorMessage({
                    error:"dato registrado con exito",
                    message:`el dado con nombre ${response.data.name}`,
                    type:"success",
                    errorName:"exito"
                })
            })
            .catch((err) => {
                setError(true),
                setErrorMessage({
                    error:`${err}`,
                    message:"porfavor comuniquese con soporte al cliente o intente mas tarde",
                    type:"error",
                    errorName:"error"})
                })
        }
        if(type==="update" ){
            updateMedicine(form,id)
            .then((response) => {
                setError(true),
                setErrorMessage({
                    error:"dato actualizado con exito",
                    message:`el dato con nombre ${response.data.name} fue actualizado con exito`,
                    type:"success",
                    errorName:"exito"
                })
            })
            .catch((err) => {
                setError(true),
                setErrorMessage({
                    error:`${err}`,
                    message:"porfavor comuniquese con soporte al cliente o intente mas tarde",
                    type:"error",
                    errorName:"error"})
                })
        }
        if(type==="delete"){
            deleteMedicine(id)
            .then((response) => {
                setError(true),
                setErrorMessage({
                    error:"",
                    message:`el dato  fue eliminado con exito`,
                    type:"success",
                    errorName:"exito"
                })
            })
            .catch((err) => {
                setError(true),
                setErrorMessage({
                    error:`${err}`,
                    message:"porfavor comuniquese con soporte al cliente o intente mas tarde",
                    type:"error",
                    errorName:"error"})
                })   
        };
        setForm({ name:"", // limpiar los formulairos
        compound:"",
        price:"",
        type:"",
        quantity:"",
        function:"",
        imgId:""})
    }
    if(error) {
        setTimeout(()=>{
            setError(false)
        },5000)
    }
// aqui se recibe la informacion que vienie dede el input 
    useEffect(()=>{
        if(id==="") return
        fetchItemById?.(id)
        .then((data) => {setForm(data.data)})
        .catch((error) =>{
            console.log(error,"soy error")
            setError(true),
            setErrorMessage({
                error:`${error}`,
                message:"porfavor comuniquese con servicio al cliente o intente mas tarde",
                type:"error",
                errorName:"error"
            })
        })
    },[id]);

    return (
        <>
        {error && (
        <Alert style={{position:"fixed",top:"12%",right:"30%", left:"30%",zIndex:"10000000"}} severity={errorMessage.type}>
        <AlertTitle>{errorMessage.errorName}</AlertTitle>
        {errorMessage.error} — <strong>{errorMessage.message}</strong>
        </Alert>
        )}
        {type==="add" && ( // para agregar
                    <form   ref={formRef} className="medicForm" onSubmit={handleSumbitBtn} >
                    {listFormMedicineUpdateOrDelete.map((item) =>(
                        <TextField
                        key={item.id}
                        value={form[item.name as FormMedicineKey ]}
                        name={item.name}
                        label={item.label}
                        style={{width:"400px", margin:"5px"}}
                        id="outlined-basic"
                        onChange={handleInputChange}
                        />
                    ))}
                    <Button
                    type="submit" 
                    size="large"
                    variant="contained" 
                    >
                    guardar
                    </Button>
                    </form>
        )}

        {type=="update" && ( // para actualizar
                    <form  ref={formRef} className="medicForm" onSubmit={handleSumbitBtn}  >
                    {listFormMedicineUpdateOrDelete.map((item) =>(
                        <TextField
                        key={item.id}
                        value={form[item.name as FormMedicineKey ]}
                        name={item.name}
                        label={item.label}
                        style={{width:"400px", margin:"5px"}}
                        id="outlined-basic"
                        onChange={handleInputChange}
                        
                        />
                        ))}
                    <Button
                        style={{marginTop:"18px"}}
                        type= "submit"
                        size="large"
                        variant="contained"
                        color="success" >
                    actualizar
                    </Button>
                    </form>
        )}
        {type==="delete" && ( // para eliminar
                    <form  ref={formRef} className="medicForm" onSubmit={handleSumbitBtn} >
                    {listFormMedicineUpdateOrDelete.map((item) =>(
                        <TextField
                        key={item.id}
                        value={form[item.name as FormMedicineKey ]}
                        name={item.name}
                        style={{width:"400px", margin:"5px"}}
                        id="outlined-basic"
                        label={item.label}
                        />
                    ))}
                    <Button
                        type=
                        "submit"
                        size="large"
                        variant="contained"
                        color="error"
                    >
                    eliminar
                    </Button>
                    </form>
        )}
        </>
    )
}
export{FormCrudMedicne}