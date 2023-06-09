import React, { useState } from "react";
import "./index-medicMidal.css";
import {HorizontalLabelPositionBelowStepper} from "./StepperMedic";
import {AiFillCloseCircle} from "react-icons/ai";
import Button from '@mui/material/Button';
import { OptionsForm } from "./stepperOptions/stepOne";
import {DragFile} from './stepperOptions/stepTwo';
import {FormCrudMedicine} from "../forms/deleteAndApdate/index";
import {InputSearchByName} from "../home/components/inputSearchByName/InputSearchByName"

interface Props {
    setOpenFormModal:React.Dispatch<React.SetStateAction<boolean>>
    optionSelectedFromToggleMenuHome:string,
}
// currentOptionSelected
//0 mene de opciones del modal
//1 subir imagenes
//2 formulario 
//optionSelectedFromToggleMenuHome
//Bebidas
// Medicamentos
//Otros productos

const MedicineModalFlow = ( props:Props) => {
    const {
        setOpenFormModal,
        optionSelectedFromToggleMenuHome,
    } = props
    const [mosaicOption, setMosaicOptions] = useState<string>("");
    const [currentOptionSelected, setCurrentOptionSelected] = useState<number>(0);
    const [nextStep,setNextStep] = useState<number>(1);
    const[id, setid] =  useState<string>("")
    
    const getIdFromInputByName=(id:string):string=>{
        setid(id)
        return id
    }
    const handleNextStep=(optionSelected:string):void| string => {
        // opcion seleccionada de las opciones  
        if(optionSelected ==="add") {
            setMosaicOptions(optionSelected)
            // se dispara el input para subir archivos
            return setCurrentOptionSelected(1)
        }
        setMosaicOptions(optionSelected)
        setCurrentOptionSelected(2)
        setNextStep((prevState) => prevState +1)
    }
    const handleStepBack = () => {
        // ESTE METODO ES PARA EL  BTN DE REGRESAR
        // PARA TODOS LOS CASOS
        if(currentOptionSelected===2 && mosaicOption==="add" ){      
            return setCurrentOptionSelected(1)
        }
        setid("")
        setNextStep((prevState) => prevState -1)
        setMosaicOptions((prevState1) => prevState1 ="" )
        setCurrentOptionSelected(0)
    }
    const handleNextStepOptionalStep=()=>{
        // este metodo es para el btn de avanzar al sig paso
        //DEL PASO OPCIONAL (SUBIR IMG)
        setNextStep((prevState) => prevState +1)
        setCurrentOptionSelected(2)
    }
    return (
        <>
        <section className="medicine-modalBackGround">
            <section  className="medicine-ModalContainer">
                <button className="medicine-ModalContianer-buttonCloseContainer" onClick={()=>{setOpenFormModal((prevState ) => !prevState);
                }}>
                <AiFillCloseCircle className="medicine-ModalContainer-closeIcon"/>
                </button>
                <div className="medicModal-textContainer">
                    {(currentOptionSelected===1) 
                    && (<p>
                        Suba una foto del producto
                        <span 
                            style={{
                            fontSize:"1.5rem",
                            color:"#BEBEBE",
                        }}>
                            {`(este paso es opcional)`}
                        </span>
                        </p>)
                    || currentOptionSelected===2 && mosaicOption==="add" && <p>ingrese los datos </p>
                    || (currentOptionSelected===2) && (<p>ingrese el nombre </p>)
                    || (currentOptionSelected===0) && (<p>seleccione una opcion</p>)}
                </div>
                <div className="medicModal-stepperContainer"> 
                    <HorizontalLabelPositionBelowStepper nextStep={nextStep} />
                </div >
                <div 
                className={`${
                (currentOptionSelected===0) && (`options-constainter`) // contenedor de formulario
                || currentOptionSelected >=1 && (`options-constainterActive`)
                }`
                }>
                    {currentOptionSelected===2&& mosaicOption!="add"  &&(
                        <div className="optionsContainer-inputSearchByName">
                            <InputSearchByName getIdFromInputByName={getIdFromInputByName} isforCartlist={false}/>
                        </div>
                    )}
                    {(currentOptionSelected===1) &&<DragFile/>
                    ||(currentOptionSelected===2) 
                    && (mosaicOption==="add"||mosaicOption==="update"||mosaicOption==="delete"  )
                    &&<FormCrudMedicine optionSelectedFromToggleMenuHome={optionSelectedFromToggleMenuHome} id={id} type={mosaicOption}/>
                    ||(currentOptionSelected===0) && <OptionsForm typeSelected={optionSelectedFromToggleMenuHome} handleNextStep={handleNextStep}/>}

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
                    onClick={()=>handleNextStepOptionalStep()}>
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