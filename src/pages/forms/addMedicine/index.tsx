import {useState,useRef} from "react";
import { Button, TextField } from "@mui/material";
import "./mediform.css";
import { FormEvent } from "react";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import {FormMedicine} from "../interfaces"


const AddMedicine=()=>{
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
    const formRef = useRef<HTMLFormElement>(null);
    const handleSumbitBtn = (event: FormEvent<HTMLFormElement> ) =>{
        event.preventDefault();
        if(   form.compound
            || form.function
            || form.name
            || form.price
            || form.quantity){
                setErrorMessage(" todos los campos deben de estar completos")
            return setError(true)
        }
        // SOLUCIONAR CHEQUEADO DE TIPOS DE DATOS
        if( !!isNaN(parseFloat(form.price)) || !!isNaN(parseFloat(form.quantity)) ) {
            setErrorMessage("los camops precio y cantidad deben de ser numeros")
            return setError(true)
        }
        formRef.current?.reset()
    }
    
    const handleInputChange=( event:React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        // console.log(name,value,"soy value")
        // Actualizar el estado con los nuevos valores
        setForm(prevState => ({
        ...prevState,
        [name]: value
        }));
        
    }

    if(error) {
        setTimeout(()=>{setError(false)},5000)
    }

    return (
        <>
        {error && (
                <Alert style={{position:"fixed",top:"10%",right:"30%", left:"30%"}} severity="error">
                <AlertTitle>Error</AlertTitle>
                {errorMessage} — <strong>porfavor revise el campo pertinente</strong>
                </Alert>
        )}
        <form ref={formRef} className="medicForm" onSubmit={handleSumbitBtn} >
            <TextField
                id="outlined-basic"
                label={`nombre del producto`}
                variant="outlined"
                style={{width:"400px", margin:"5px"}}
                onChange={handleInputChange}
                name="name"
            />
            <TextField
                id="outlined-basic"
                label={`nombre de los componentes`}
                variant="outlined"
                style={{width:"400px", margin:"5px"}}
                onChange={handleInputChange}
                name="compound"
            />            
            <TextField
                id="outlined-basic"
                label={`Precio $`}  
                variant="outlined"
                style={{width:"400px", margin:"5px"}}
                onChange={handleInputChange}
                name="price"
            />
            <TextField
                id="outlined-basic"
                label={`tipo inyectado | oral etc$`} 
                variant="outlined"
                style={{width:"400px", margin:"5px"}}
                onChange={handleInputChange}
                name="type"
            />
            <TextField
                id="outlined-basic"
                label={`cantidad `} 
                variant="outlined"
                style={{width:"400px", margin:"5px"}}
                onChange={handleInputChange}
                name="quantity"
            />
            <TextField
                id="outlined-basic"
                label={`funcion: dolor| vomitio etc `} 
                variant="outlined"
                style={{width:"400px", margin:"5px"}}
                onChange={handleInputChange}
                name="function"
            />
            <Button  type= "submit" size="large" variant="contained" >
                guardar
            </Button>
        </form> 
        </>
    )
}
export {AddMedicine}