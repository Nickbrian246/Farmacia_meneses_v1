import {useState,useRef} from "react";
import { Button, TextField } from "@mui/material";
import "./mediform.css";
import { FormEvent } from "react";


interface FormMedicineAdd {
    name:string,
    compound:string,
    price:number | string,
    type:string,
    quantity:number,
    function:string,
    imgId?:string
}

const AddMedicine=()=>{
    const formRef = useRef<HTMLFormElement>(null);
    const [form, setForm] = useState<FormMedicineAdd>({
        name:"",
        compound:"",
        price:"",
        type:"",
        quantity:0,
        function:"",
        imgId:""

    })
    
    
    const handleSumbitBtn = (event: FormEvent<HTMLFormElement> ) =>{
        event.preventDefault();
        formRef.current?.reset()
        console.log(form,"soy form")
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

    return (
        <>
        <form ref={formRef} className="medicForm" onSubmit={handleSumbitBtn} >
            <TextField
                id="outlined-basic"
                label={`nombre del producto${form.name}`}
                variant="outlined"
                style={{width:"400px", margin:"5px"}}
                onChange={handleInputChange}
                name="name"
            />
            <TextField
                id="outlined-basic"
                label={`nombre de los componentes${form.compound}`}
                variant="outlined"
                style={{width:"400px", margin:"5px"}}
                onChange={handleInputChange}
                name="compound"
            />            
            <TextField
                id="outlined-basic"
                label={`Precio $${form.price}`}  
                variant="outlined"
                style={{width:"400px", margin:"5px"}}
                onChange={handleInputChange}
                name="price"
            />
            <TextField
                id="outlined-basic"
                label={`tipo inyectado | oral etc${form.type}`} 
                variant="outlined"
                style={{width:"400px", margin:"5px"}}
                onChange={handleInputChange}
                name="type"
            />
            <TextField
                id="outlined-basic"
                label={`cantidad ${form.quantity}`} 
                variant="outlined"
                style={{width:"400px", margin:"5px"}}
                onChange={handleInputChange}
                name="quantity"
            />
            <TextField
                id="outlined-basic"
                label={`funcion: dolor| vomitio etc ${form.function}`} 
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