import React, { useState } from "react";
import "./index-medicMidal.css"
import {HorizontalLabelPositionBelowStepper} from "./StepperMedic";
import { MosaicItem } from "../components/mosaicComponent/MosaicItem";
import { testList } from "./listTest";
import {AiFillPlusCircle} from "react-icons/ai";
import {MdDeleteForever} from "react-icons/md";
import {MdUpdate} from "react-icons/md"
import {AiFillCloseCircle} from "react-icons/ai"
import { IconButton } from "@mui/material";
import Button from '@mui/material/Button';

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
                {(nextStep>1) 
                &&(<Button 
                variant="contained"
                size="medium"
                className="stepBack-btn"
                onClick={()=>handleStepBack()}>
                    Regresar <br/>al paso anterior 
                </Button>)
                }

                <div className="medicModal-stepperContainer">
                    <HorizontalLabelPositionBelowStepper nextStep={nextStep} />
                </div >
                {/* <form className="medicForm" >
                    <TextField
                    id="outlined-basic"
                    label="nombre del medicamento"
                    variant="outlined"/>

                </form> */}
                <div style={{width:"100%", display:"flex"}} >
                {
                    testList.map((item) => (
                        <MosaicItem
                        name={item.name}
                        width="350px"
                        fontSize="1.5rem"
                        key={item.name}
                        handleNextStep={handleNextStep}
                        >
                        { 
                        ((item.type==="add" ) && (<AiFillPlusCircle style={{fontSize:"3rem",color:"#5a5ae9"}}/>))
                        ||((item.type==="update" ) && (<MdUpdate style={{color:"#0535E7",fontSize:"3rem"}}/>))
                        ||((item.type==="delete" ) && (<MdDeleteForever style={{fontSize:"3rem",color:"#E7052B"}}/>))
                        }
                        </MosaicItem>
                    ))
                } 
                </div >

            </section>

        </section>
        </>
    )
};

export {MedicineModalFlow}