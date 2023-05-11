import "../addMedicine/mediform.css";
import React, { useEffect, useRef, useState } from "react";
import { FormEvent } from "react";

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Button, TextField } from "@mui/material";

import { fetchItemById } from "../../../fetch/fetchMedicines/fetchMedicines";
import { postDrinks , updateDrinks,deleteDrinks} from "../../../services/dashboard-api/adapters/driver/drinks-api";
import { getDrinksAdapter, postDrinksAdapter} from "../../../services/dashboard-api/adapters/drinksAdapter/for-DrinksAdapter";
// import { 
//     PostMedicinesData,
    
//     deleteMedicine,
// } from "../../../fetch/fetchMedicines/fetchMedicines";
import {postMedicines,updateMedicine,deleteMedicine} from "../../../services/dashboard-api/adapters/driver/medicine-api"
import { adapterForGetMedicine } from "../../../services/dashboard-api/adapters/medicineAdapter/for-form-medicineAdapter";
import { MedicDataForPost } from "../adapters/for-Medicine";
import { getProductById } from "../../../services/dashboard-api/adapters/driven/medicine-api";
import {
    listFormMedicineUpdateOrDelete,
    listFormForDrinks,
} from "./listOptions"
import {
    FormMedicine,
    FormDrinks,
} from "../interfaces"


type AlertColor = 'success' | 'info' | 'warning' | 'error';
type FormMedicineKey = keyof FormMedicine;
type FormDrinksKey = keyof FormDrinks;
// dos formulario 
// uno es para actualizar y crear 
// para eliminar 

interface Props  {
    type:string,
    id:string,
    optionSelectedFromToggleMenuHome:string,
}
interface ErrorMessage {
    error:string,
    message:string
    type: undefined |AlertColor,
    errorName:string

}

const FormCrudMedicine=(props:Props) =>{
    const {
        type,
        id,
        optionSelectedFromToggleMenuHome,
    } = props
    const formRef = useRef<HTMLFormElement>(null);
    const [error, setError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<ErrorMessage>({
        error:"",
        message:"",
        type:"success",
        errorName:""
    })
    const [formMedicine, setFormMedicine] = useState<FormMedicine>({
        name:"",
        compound:"",
        price:0,
        type:"",
        quantity:0,
        function:"",
        size:""
        
    });
    const [formDrinks, setFormDrinks] = useState<FormDrinks>({
        name:"",
        price:0,
        type:"drink",
        quantity:0,
        brand:"",
        parts:1,
        size:""
        
    });
// funcion que asigna los valores al formMedicine independiente del metodo
    const handleInputMedicineChange=( event:React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        // console.log(name,value,"soy value")
        // Actualizar el estado con los nuevos valores
        setFormMedicine(prevState => ({
        ...prevState,
        [name]: value
        }));
        
    }
    const handleInputDrinksChange=( event:React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        // console.log(name,value,"soy value")
        // Actualizar el estado con los nuevos valores
        setFormDrinks(prevState => ({
        ...prevState,
        [name]: value
        }));
        
    }
    // funcion para ejecutar los eventos del formulario
    const handleSubmitMedicineBtn = (event: FormEvent<HTMLFormElement> ) =>{
        event.preventDefault();
        if( !formMedicine.compound
            || !formMedicine.function
            || !formMedicine.name
            || !formMedicine.price
            || !formMedicine.quantity
            || !formMedicine.type){
                setErrorMessage({
                error:"campo vacio",
                message:"porfavor revise que los campos no esten vacios",
                type:"error",
                errorName:"error"})
            return setError((prevState) => !prevState)
        }
        setError(false)
        if(type==="add") { // agregar 
            // PostMedicinesData(formMedicine)
            const adaptingData= MedicDataForPost(formMedicine)
            console.log(adaptingData);
            
            postMedicines(adaptingData)
            .then((response) => {
                setError((prevState) => !prevState),
                setErrorMessage({
                    error:"dato registrado con exito",
                    message:`el dato con nombre ${response.data.name}`,
                    type:"success",
                    errorName:"exito"
                })
            })
            .catch((err) => {
                setError((prevState) => !prevState),
                setErrorMessage({
                    error:`${err}`,
                    message:"porfavor comuniquese con soporte al cliente o intente mas tarde",
                    type:"error",
                    errorName:"error"})
                })
        }
        if(type==="update" ){
            const adaptingData= MedicDataForPost(formMedicine)
            updateMedicine(id,adaptingData)
            .then((response) => {
                setError((prevState) => !prevState),
                setErrorMessage({
                    error:"dato actualizado con exito",
                    message:`el dato con nombre ${response.data.name} fue actualizado con exito`,
                    type:"success",
                    errorName:"exito"
                })
            })
            .catch((err) => {
                setError((prevState) => !prevState),
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
                setError((prevState) => !prevState),
                setErrorMessage({
                    error:"",
                    message:`el dato  fue eliminado con exito`,
                    type:"success",
                    errorName:"exito"
                })
            })
            .catch((err) => {
                setError((prevState) => !prevState),
                setErrorMessage({
                    error:`${err}`,
                    message:"porfavor comuniquese con soporte al cliente o intente mas tarde",
                    type:"error",
                    errorName:"error"})
                })   
        };
        setFormMedicine({
        name:"", // limpiar los formulairos
        compound:"",
        price:0,
        type:"",
        quantity:0,
        function:"",
        size:""
    })
    }
    const handleSubmitDrinksBtn = (event: FormEvent<HTMLFormElement> ) =>{
        event.preventDefault();
        if( !formDrinks.name
            || !formDrinks.price
            || !formDrinks.type
            || !formDrinks.quantity
            || !formDrinks.brand
            || !formDrinks.parts
            || !formDrinks.size){
                setErrorMessage({
                error:"campo vacio",
                message:"porfavor revise que los campos no esten vacios",
                type:"error",
                errorName:"error"})
            return setError((prevState) => !prevState)
        }
        setError(false)
        if(type==="add") { // agregar 
            const adapter=postDrinksAdapter(formDrinks)
            postDrinks(adapter)
            .then((response) => {
                setError((prevState) => !prevState),
                setErrorMessage({
                    error:"dato registrado con exito",
                    message:`el dato con nombre ${response.data.name}`,
                    type:"success",
                    errorName:"exito"
                })
            })
            .catch((err) => {
                setError((prevState) => !prevState),
                setErrorMessage({
                    error:`${err}`,
                    message:"porfavor comuniquese con soporte al cliente o intente mas tarde",
                    type:"error",
                    errorName:"error"})
                })
        }
        if(type==="update" ){
            const adapter= postDrinksAdapter(formDrinks)
            updateDrinks(id,adapter)
            .then((response) => {
                setError((prevState) => !prevState),
                setErrorMessage({
                    error:"dato actualizado con exito",
                    message:`el dato con nombre ${response.data.name} fue actualizado con exito`,
                    type:"success",
                    errorName:"exito"
                })
            })
            .catch((err) => {
                setError((prevState) => !prevState),
                setErrorMessage({
                    error:`${err}`,
                    message:"porfavor comuniquese con soporte al cliente o intente mas tarde",
                    type:"error",
                    errorName:"error"})
                })
        }
        if(type==="delete"){
            deleteDrinks(id)
            .then((response) => {
                setError((prevState) => !prevState),
                setErrorMessage({
                    error:"",
                    message:`el dato  fue eliminado con exito`,
                    type:"success",
                    errorName:"exito"
                })
            })
            .catch((err) => {
                setError((prevState) => !prevState),
                setErrorMessage({
                    error:`${err}`,
                    message:"porfavor comuniquese con soporte al cliente o intente mas tarde",
                    type:"error",
                    errorName:"error"})
                })   
        };
        setFormDrinks({ 
        name:"",
        price:0,
        type:"drink",
        quantity:0,
        brand:"",
        parts:1,
        size:""
    })
    }
    // apaga el error despues de unos segundos
    if(error) {
        setTimeout(()=>{
            setError(false)
        },5000)
    }
// aqui se recibe la informacion que vienie dede el input 
    useEffect(()=>{
        if(id==="") return
        if(optionSelectedFromToggleMenuHome==="Medicamentos"){
            getProductById?.(id)
            .then((data) => {
                const adapter= adapterForGetMedicine(data.data)
                setFormMedicine(adapter)
            })
            .catch((error) =>{
                setError((prevState) => !prevState),
                setErrorMessage({
                    error:`${error}`,
                    message:"porfavor comuniquese con servicio al cliente o intente mas tarde",
                    type:"error",
                    errorName:"Error"
                })
            })
        }
        if(optionSelectedFromToggleMenuHome==="Bebidas"){
            getProductById?.(id)
            .then((data) => {
                const adapter= getDrinksAdapter(data.data)
                setFormDrinks(adapter)
            })
            .catch((error) =>{
                setError((prevState) => !prevState),
                setErrorMessage({
                    error:`${error}`,
                    message:"porfavor comuniquese con servicio al cliente o intente mas tarde",
                    type:"error",
                    errorName:"Error"
                })
            })
        }
    },[id]);

    return (
        <>
        {error && (
        <Alert style={{position:"fixed",top:"12%",right:"30%", left:"30%",zIndex:"10000000"}} severity={errorMessage.type}>
        <AlertTitle>{errorMessage.errorName}</AlertTitle>
        {errorMessage.error} — <strong>{errorMessage.message}</strong>
        </Alert>
        )}
        {optionSelectedFromToggleMenuHome==="Medicamentos" && (
            <form   ref={formRef} className="medicForm" onSubmit={handleSubmitMedicineBtn} >
            {listFormMedicineUpdateOrDelete.map((item) =>(
                <TextField
                type={`${item.name==="quantity" && "number" || item.name==="price" && "number"  }` }
                key={item.id}
                value={formMedicine[item.name as FormMedicineKey ]}
                name={item.name}
                label={item.label}
                style={{width:"400px", margin:"5px"}}
                id="outlined-basic"
                onChange={handleInputMedicineChange}
                />
            ))}
            {type==="add" && (
            <Button
            style={{marginTop:"18px"}}
            type="submit" 
            size="large"
            variant="contained"
            color="primary"
            >
            Guardar
            </Button>
            )
            || type==="update" && (
            <Button
            style={{marginTop:"18px"}}
            type="submit" 
            size="large"
            variant="contained"
            color="success"
            >
            Actualizar
            </Button>
            )
            || type==="delete" && (
                <Button
                style={{marginTop:"18px"}}
                type="submit" 
                size="large"
                variant="contained"
                color="error"
                >
                Eliminar
                </Button>
                )
            }
            </form>
        )}
        {optionSelectedFromToggleMenuHome==="Bebidas" && (
            <form   ref={formRef} className="medicForm" onSubmit={handleSubmitDrinksBtn} >
            {listFormForDrinks.map((item) =>(
                <TextField
                type={`${item.name==="quantity" && "number" || item.name==="price" && "number"  }` }
                key={item.id}
                value={formDrinks[item.name as FormDrinksKey ]}
                name={item.name}
                label={item.label}
                style={{width:"400px", margin:"5px"}}
                id="outlined-basic"
                onChange={handleInputDrinksChange}
                />
            ))}
            {type==="add" && (
            <Button
            style={{marginTop:"18px"}}
            type="submit" 
            size="large"
            variant="contained"
            color="primary"
            >
            Guardar
            </Button>
            )
            || type==="update" && (
            <Button
            style={{marginTop:"18px"}}
            type="submit" 
            size="large"
            variant="contained"
            color="success"
            >
            Actualizar
            </Button>
            )
            || type==="delete" && (
                <Button
                style={{marginTop:"18px"}}
                type="submit" 
                size="large"
                variant="contained"
                color="error"
                >
                Eliminar
                </Button>
                )
            }
            </form>
        )}
        </>
    )
}
export{FormCrudMedicine}