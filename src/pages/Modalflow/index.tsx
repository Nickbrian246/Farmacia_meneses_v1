import React, { useState } from "react";
import "./index-medicMidal.css"
import {HorizontalLabelPositionBelowStepper} from "./StepperMedic";
import {AiFillCloseCircle} from "react-icons/ai"
import { IconButton } from "@mui/material";
import Button from '@mui/material/Button';
import { AddMedicine } from "../forms/addMedicine";
import { OptionsFormedicines } from "./options";

interface Props {
    setOpenFormModal:React.Dispatch<React.SetStateAction<boolean>>
}

const MedicineModalFlow = ( props:Props) => {
    const {setOpenFormModal} = props
    const [mosaicOption, setMosaicOptions] = useState<string>(" ");
    const [nextStep,setNextStep] = useState<number>(1);

    const handleNextStep=(optionSelected:string):string => {
        setMosaicOptions(optionSelected)
        setNextStep((prevState) => prevState +1)
        return optionSelected
    }
    const handleStepBack = () => {
        setNextStep((prevState) => prevState -1)
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
                    <p>Seleccione la accion</p>
                </div>
                <div className="medicModal-stepperContainer">
                    <HorizontalLabelPositionBelowStepper nextStep={nextStep} />
                </div >
                <div  className={`options-constainterTest ${ nextStep>1 && `options-constainterActive`}`}>
                { nextStep>1
                ?<AddMedicine/>
                :<OptionsFormedicines handleNextStep={handleNextStep}/>
                }
                
                {(nextStep>1)
                &&(<Button
                style={{width:"200px"}}
                variant="contained"
                size="small"
                className="stepBack-btn"
                onClick={()=>handleStepBack()}>
                    Regresar <br/>al paso anterior
                </Button>)
                }
                
                </div >

            </section>

        </section>
        </>
    )
};

export {MedicineModalFlow}