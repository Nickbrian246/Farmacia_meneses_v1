import "../addMedicine/mediform.css";
import React, { useEffect, useRef, useState } from "react";
import { FormEvent } from "react";

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Button, TextField } from "@mui/material";

import { postDrinks , updateDrinks,deleteDrinks} from "../../../services/dashboard-api/adapters/driver/drinks-api";
import { getDrinksAdapter, postDrinksAdapter, updateItem} from "../../../services/dashboard-api/adapters/drinksAdapter/for-DrinksAdapter";
import {postMedicines,updateMedicine,deleteMedicine} from "../../../services/dashboard-api/adapters/driver/medicine-api";
import { useSelector } from "react-redux";
import { postOtherProduct,deleteOtherProduct,updateOtherProduct } from "../../../services/dashboard-api/adapters/driver/otherProducts-api";
import { adapterForGetMedicine } from "../../../services/dashboard-api/adapters/medicineAdapter/for-form-medicineAdapter";
import { MedicDataForPost } from "../adapters/for-Medicine";
import { getProductById } from "../../../services/dashboard-api/adapters/driven/getProduct-api";
import {
    listFormMedicineUpdateOrDelete,
    listFormForDrinks,
    listFormForOtherProducts
} from "./listOptions"
import {
    FormMedicine,
    FormDrinks,
} from "../interfaces"
import { adapterForMedicineUpdateItem } from "../adapters/for-modifyItemMedicineStock";


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
    const token =  useSelector((state:any)=> state.loggedUser.token)

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
    const [otherProductsForm, setOtherProductsForm] = useState<FormDrinks>({
        name:"",
        price:0,
        type:"",
        quantity:0,
        brand:"",
        parts:1,
        size:""
        
    });
    // const newProducts :FormDrinks[] = [
    //     {
    //       name: "Sparkling Elixir",
    //       price: 7.5,
    //       tag: "bebida",
    //       quantity: 15,
    //       brand: "SipStar", // Marca inventada
    //       size: "pequeño",
    //       pieces: 1
    //     },
    //     {
    //       name: "Crunchy Delights",
    //       price: 11,
    //       tag: "alimento",
    //       quantity: 20,
    //       brand: "FoodFusion", // Marca inventada
    //       size: "mediano",
    //       pieces: 1
    //     },
    //     {
    //       name: "Sweet Symphony",
    //       price: 14.5,
    //       tag: "postre",
    //       quantity: 8,
    //       brand: "TasteDeluxe", // Marca inventada
    //       size: "grande",
    //       pieces: 1
    //     },
    //     {
    //       name: "Fizzy Bliss",
    //       price: 6.99,
    //       tag: "bebida",
    //       quantity: 12,
    //       brand: "BeverageWorld", // Marca inventada
    //       size: "pequeño",
    //       pieces: 1
    //     },
    //     {
    //       name: "Savory Sensation",
    //       price: 10.5,
    //       tag: "alimento",
    //       quantity: 18,
    //       brand: "FlavorFusion", // Marca inventada
    //       size: "mediano",
    //       pieces: 1
    //     },
    //     {
    //       name: "Deluxe Delight",
    //       price: 16,
    //       tag: "postre",
    //       quantity: 10,
    //       brand: "DessertDream", // Marca inventada
    //       size: "grande",
    //       pieces: 1
    //     },
    //     {
    //       name: "Cool Quencher",
    //       price: 5.75,
    //       tag: "bebida",
    //       quantity: 25,
    //       brand: "ThirstBuster", // Marca inventada
    //       size: "pequeño",
    //       pieces: 1
    //     },
    //     {
    //       name: "Tasty Temptation",
    //       price: 12.99,
    //       tag: "alimento",
    //       quantity: 15,
    //       brand: "FoodFiesta", // Marca inventada
    //       size: "mediano",
    //       pieces: 1
    //     },
    //     {
    //       name: "Cocoa Bliss",
    //       price: 8.25,
    //       tag: "postre",
    //       quantity: 14,
    //       brand: "ChocoCrave", // Marca inventada
    //       size: "grande",
    //       pieces: 1
    //     },
    //     {
    //       name: "Juicy Delight",
    //       price: 7.49,
    //       tag: "bebida",
    //       quantity: 22,
    //       brand: "FruitFusion", // Marca inventada
    //       size: "pequeño",
    //       pieces: 1
    //     },
    //     {
    //       name: "Savory Surprise",
    //       price: 13.5,
    //       tag: "alimento",
    //       quantity: 17,
    //       brand: "FlavorBurst", // Marca inventada
    //       size: "mediano",
    //       pieces: 1
    //     },
    //     {
    //       name: "Creamy Dream",
    //       price: 15.75,
    //       tag: "postre",
    //       quantity: 9,
    //       brand: "DairyDelight", // Marca inventada
    //       size: "grande",
    //       pieces: 1
    //     },
    //     {
    //       name: "Bubbly Fizz",
    //       price: 6.25,
    //       tag: "bebida",
    //       quantity: 19,
    //       brand: "FizzFusion", // Marca inventada
    //       size: "pequeño",
    //       pieces: 1
    //     },
    //     {
    //       name: "Crunchy Munchies",
    //       price: 10.99,
    //       tag: "alimento",
    //       quantity: 13,
    //       brand: "SnackWave", // Marca inventada
    //       size: "mediano",
    //       pieces: 1
    //     },
    //     {
    //       name: "Sweet Delight",
    //       price: 11.5,
    //       tag: "postre",
    //       quantity: 11,
    //       brand: "SugarRush", // Marca inventada
    //       size: "grande",
    //       pieces: 1
    //     },
    //     {
    //       name: "Icy Sipper",
    //       price: 4.99,
    //       tag: "bebida",
    //       quantity: 20,
    //       brand: "ChillChug", // Marca inventada
    //       size: "pequeño",
    //       pieces: 1
    //     },
    //     {
    //       name: "Savory Euphoria",
    //       price: 14.75,
    //       tag: "alimento",
    //       quantity: 16,
    //       brand: "TasteTrove", // Marca inventada
    //       size: "mediano",
    //       pieces: 1
    //     },
    //     {
    //       name: "Choco Heaven",
    //       price: 9.99,
    //       tag: "postre",
    //       quantity: 12,
    //       brand: "CocoaCravings", // Marca inventada
    //       size: "grande",
    //       pieces: 1
    //     },
    //     {
    //       name: "Citrus Splash",
    //       price: 7.25,
    //       tag: "bebida",
    //       quantity: 18,
    //       brand: "TangyTwist", // Marca inventada
    //       size: "pequeño",
    //       pieces: 1
    //     },
    //     {
    //       name: "Savory Sensation",
    //       price: 12.5,
    //       tag: "alimento",
    //       quantity: 14,
    //       brand: "FlavorFusion", // Marca inventada
    //       size: "mediano",
    //       pieces: 1
    //     },
    //     {
    //       name: "Caramel Bliss",
    //       price: 10.25,
    //       tag: "postre",
    //       quantity: 10,
    //       brand: "CaramelCrave", // Marca inventada
    //       size: "grande",
    //       pieces: 1
    //     },
    //     {
    //       name: "Refreshing Quencher",
    //       price: 6.75,
    //       tag: "bebida",
    //       quantity: 21,
    //       brand: "ThirstRelief", // Marca inventada
    //       size: "pequeño",
    //       pieces: 1
    //     },
    //   ];
      
    //   // Puedes seguir agregando más productos con marcas inventadas completas si lo deseas...
      
    //     useEffect(()=>{
    //         newProducts.forEach((products) => {
    //             const adapter=postDrinksAdapter(products)
    //             postOtherProduct(adapter,token)
    //             .then((response) => {
    //                 setError((prevState) => !prevState),
    //                 setErrorMessage({
    //                     error:"dato registrado con exito",
    //                     message:`el dato con nombre ${response.data.name}`,
    //                     type:"success",
    //                     errorName:"exito"
    //                 })
    //             })
    //             .catch((err) => {
    //                 setError((prevState) => !prevState),
    //                 setErrorMessage({
    //                     error:`${err}`,
    //                     message:"porfavor comuniquese con soporte al cliente o intente mas tarde",
    //                     type:"error",
    //                     errorName:"error"})
    //                 })
    //         })
    //     },[])
// funcion que asigna los valores al formMedicine independiente del metodo
    const handleInputChange=( event:React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
                // Actualizar el estado con los nuevos valores
        if(optionSelectedFromToggleMenuHome==="Medicamentos"){
            return  setFormMedicine(prevState => ({
                ...prevState,
                [name]: value
                }));
        }
        if(optionSelectedFromToggleMenuHome==="Bebidas"){
            return  setFormDrinks(prevState => ({
                ...prevState,
                [name]: value
                }));
        } 
        if(optionSelectedFromToggleMenuHome==="Otros productos"){
            return  setOtherProductsForm(prevState => ({
                ...prevState,
                [name]: value
                }));
        } 
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
            
            postMedicines(adaptingData,token)
            .then((response) => {
                setError((prevState) => !prevState),
                setErrorMessage({
                    error:"dato registrado con exito",
                    message:`el dato con nombre ${formMedicine.name}`,
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
            const adaptingData= adapterForMedicineUpdateItem(formMedicine,id)
            updateMedicine(adaptingData,token)
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
            deleteMedicine(id,token)
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
    const handleSubmitBtn = (event: FormEvent<HTMLFormElement> ) =>{
        event.preventDefault();
        if(optionSelectedFromToggleMenuHome==="Bebidas"){
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
        }
        if(optionSelectedFromToggleMenuHome==="Otros productos"){
            if( !otherProductsForm.name
                || !otherProductsForm.price
                || !otherProductsForm.type
                || !otherProductsForm.quantity
                || !otherProductsForm.brand
                || !otherProductsForm.parts
                || !otherProductsForm.size){
                    setErrorMessage({
                    error:"campo vacio",
                    message:"porfavor revise que los campos no esten vacios",
                    type:"error",
                    errorName:"error"})
                return setError((prevState) => !prevState)
            }
        }

        setError(false)
        if(type==="add") { // agregar 
            if(optionSelectedFromToggleMenuHome==="Otros productos"){
                const adapter=postDrinksAdapter(otherProductsForm)
                postOtherProduct(adapter,token)
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
            if(optionSelectedFromToggleMenuHome==="Bebidas"){
                const adapter=postDrinksAdapter(formDrinks)
                postDrinks(adapter,token)
                .then((response) => {
                    setError((prevState) => !prevState),
                    setErrorMessage({
                        error:"dato registrado con exito",
                        message:`el dato con nombre ${formDrinks.name}`,
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
        }
        if(type==="update" ){
            if(optionSelectedFromToggleMenuHome==="Bebidas"){
                const adapter= updateItem(formDrinks,id)
                updateDrinks(adapter,token)
                .then((response) => {
                    setError((prevState) => !prevState),
                    setErrorMessage({
                        error:"dato actualizado con exito",
                        message:`el dato con nombre ${formDrinks.name} fue actualizado con exito`,
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
            if(optionSelectedFromToggleMenuHome==="Otros productos"){
                const adapter=updateItem(otherProductsForm,id)
                updateOtherProduct(adapter,token)
                .then((response) => {
                    setError((prevState) => !prevState),
                    setErrorMessage({
                        error:"dato registrado con exito",
                        message:`el dato con nombre ${otherProductsForm.name}`,
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
        }
        if(type==="delete"){
            if(optionSelectedFromToggleMenuHome==="Bebidas"){
                deleteDrinks(id,token)
                .then((response) => {
                    setError((prevState) => !prevState),
                    setErrorMessage({
                        error:"",
                        message:`el dato ${formDrinks.name}  fue eliminado con exito`,
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
            if(optionSelectedFromToggleMenuHome==="Otros productos"){
                deleteOtherProduct(id,token)
                .then((response) => {
                    setError((prevState) => !prevState),
                    setErrorMessage({
                        error:"dato registrado con exito",
                        message:`el dato ${otherProductsForm.name} fue eliminado con exito`,
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
        };
        if(optionSelectedFromToggleMenuHome==="Bebidas"){
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
        if(optionSelectedFromToggleMenuHome==="Otros productos"){
            setOtherProductsForm({ 
                name:"",
                price:0,
                type:"",
                quantity:0,
                brand:"",
                parts:1,
                size:""
            })
        }
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
            console.log(id,"soy id")
            getProductById?.(id,token)
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
            getProductById?.(id,token)
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
        if(optionSelectedFromToggleMenuHome==="Otros productos"){
            console.log("entrando");
            
            getProductById?.(id,token)
            .then((data) => {

                const adapter= getDrinksAdapter(data.data)
                setOtherProductsForm(adapter)
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
            <form  className="medicForm" onSubmit={handleSubmitMedicineBtn} >
            {listFormMedicineUpdateOrDelete.map((item) =>(
                <TextField
                type={`${item.name==="quantity" && "number" || item.name==="price" && "number"  }` }
                key={item.id}
                value={formMedicine[item.name as FormMedicineKey ]}
                name={item.name}
                label={item.label}
                style={{width:"400px", margin:"5px"}}
                id="outlined-basic"
                onChange={handleInputChange}
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
            <form    className="medicForm" onSubmit={handleSubmitBtn} >
            {listFormForDrinks.map((item) =>(
                <TextField
                type={`${item.name==="quantity" && "number" || item.name==="price" && "number"  }` }
                key={item.id}
                value={formDrinks[item.name as FormDrinksKey ]}
                name={item.name}
                label={item.label}
                style={{width:"400px", margin:"5px"}}
                id="outlined-basic"
                onChange={handleInputChange}
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
            {optionSelectedFromToggleMenuHome==="Otros productos" && (
            <form  className="medicForm" onSubmit={handleSubmitBtn} >
            {listFormForOtherProducts.map((item) =>(
                <TextField
                type={`${item.name==="quantity" && "number" || item.name==="price" && "number"  }` }
                key={item.id}
                value={otherProductsForm[item.name as FormDrinksKey ]}
                name={item.name}
                label={item.label}
                style={{width:"400px", margin:"5px"}}
                id="outlined-basic"
                onChange={handleInputChange}
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