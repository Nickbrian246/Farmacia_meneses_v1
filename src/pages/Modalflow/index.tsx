import React, { useState } from "react";
import "./index-medicMidal.css"
import {HorizontalLabelPositionBelowStepper} from "./StepperMedic";
import {AiFillCloseCircle} from "react-icons/ai"
import { IconButton } from "@mui/material";
import Button from '@mui/material/Button';
import { AddMedicine } from "../forms/addMedicine";
import { OptionsFormedicines } from "./stepperOptions/stepOne";
import {DragFile} from './stepperOptions/stepTwo'

interface Props {
    setOpenFormModal:React.Dispatch<React.SetStateAction<boolean>>
}
// currentOptionSelected
//0 mene de opciones del modal
//1 subir imagenes
//2 formulario

const MedicineModalFlow = ( props:Props) => {
    const {setOpenFormModal} = props
    const [mosaicOption, setMosaicOptions] = useState<string>("");
    const [currentOptionSelected, setcurrentOptionSelected] = useState<number>(0);
    const [nextStep,setNextStep] = useState<number>(1);
    console.log(currentOptionSelected,"mosais opiton");
    
    const handleNextStep=(optionSelected:string):void| string => {
        // opcion seleccionada de las opciones  
        if(optionSelected ==="Agregar medicamento") {
            setMosaicOptions(optionSelected)
            // se dispara el input para subir archivos
            return setcurrentOptionSelected(1)
        }
        setMosaicOptions(optionSelected)
        setcurrentOptionSelected(2)
        setNextStep((prevState) => prevState +1)
    }
    const handleStepBack = () => {
        // ESTE METODO ES PARA EL  BTN DE REGRESAR
        // PARA TODOS LOS CASOS
        if(currentOptionSelected===2 && mosaicOption==="Agregar medicamento" ){
            console.log("estoy entradno");
            
            return setcurrentOptionSelected(1)
        }
        setNextStep((prevState) => prevState -1)
        setMosaicOptions((prevState1) => prevState1 ="" )
        setcurrentOptionSelected(0)
    }
    const handleNextStepOptinalStep=()=>{
        // este metodo es para el btn de avanzar al sig paso
        //DEL PASO OPCIONAL (SUBIR IMG)
        setNextStep((prevState) => prevState +1)
        setcurrentOptionSelected(2)
    }
    return (
        <>
        <section className="medicine-modalBackGround">
            <section  className="medicine-ModalContainer">
                <IconButton onClick={()=>{setOpenFormModal((prevState ) => !prevState);
                }}>
                <AiFillCloseCircle className="medicine-ModalContainer-closeIcon"/>
                </IconButton>
                <div className="medicModal-textContainer">
                    {(mosaicOption === "Agregar medicamento") 
                    && (<p>
                        suba una foto del producto
                        <span 
                            style={{
                            fontSize:"1.3rem",
                            color:"#BEBEBE",
                        }}>
                            {`(este paso es opcional)`}
                        </span>
                        </p>)
                    || (mosaicOption === "Actualizar medicamento") && (<p>ingrese el nombre </p>)
                    || (mosaicOption === "Eliminar Medicamento") && (<p>ingrese el nombre</p>)
                    || (mosaicOption === "") && (<p>seleccione una opcion</p>)}
                    
                </div>
                <div className="medicModal-stepperContainer">
                    <HorizontalLabelPositionBelowStepper nextStep={nextStep} />
                </div >
                <div  className={` ${(currentOptionSelected===0) && (`options-constainter`) 
                                    || currentOptionSelected >=1 && (`options-constainterActive`)}`}>
                        {/* { nextStep>1
                        ?<DragFile/>
                        :<OptionsFormedicines handleNextStep={handleNextStep}/>
                        } */}
                        {/* {(mosaicOption==="Agregar medicamento")? <DragFile/>:currentOptionSelected===2? <AddMedicine/>:
                        <OptionsFormedicines handleNextStep={handleNextStep}/>} */}
                        {(currentOptionSelected===1) &&<DragFile/>
                        ||(currentOptionSelected===2) &&<AddMedicine/>
                        ||(currentOptionSelected===0) && <OptionsFormedicines handleNextStep={handleNextStep}/>}

                        {(currentOptionSelected===1 )
                        &&(<div className="btn-container">
                            <Button
                        style={{width:"200px"}}
                        variant="contained"
                        size="small"
                        className="stepBack-btn"
                        onClick={()=>handleStepBack()}>
                            Regresar <br/>al paso anterior
                        </Button>
                        <Button
                        style={{width:"200px"}}
                        variant="contained"
                        size="small"
                        className="stepBack-btn"
                        onClick={()=>handleNextStepOptinalStep()}>
                                avanzar <br/>al siguiente paso
                        </Button>
                        </div>
                        )
                        }
                        {(currentOptionSelected===2 )
                        &&(<div className="btn-container">
                            <Button
                        style={{width:"200px"}}
                        variant="contained"
                        size="small"
                        className="stepBack-btn"
                        onClick={()=>handleStepBack()}>
                            Regresar <br/>al paso anterior
                        </Button>
                        </div>
                        )
                        }
                </div >
            </section>

        </section>
        </>
    )
};

export {MedicineModalFlow}