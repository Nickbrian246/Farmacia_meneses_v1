import React from "react";
import "./index-medicMidal.css"
import { Stack,} from "@mui/material";
import {HorizontalLabelPositionBelowStepper} from "./StepperMedic";
import TextField from '@mui/material/TextField';
import { MosaicItem } from "../components/mosaicComponent/MosaicItem";
import { testList } from "./listTest";
import {AiOutlineMenu} from "react-icons/ai"
const MedicineModalFlow = () => {
    return (
        <>
        <section className="medicine-modalBackGround">
            <section  className="medicine-ModalContainer">
                <div className="medicModal-textContainer">
                    <p>Seleccione la accion</p>
                </div>
                <div className="medicModal-stepperContainer">
                    <HorizontalLabelPositionBelowStepper/>
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
                        <MosaicItem name={item.name}>
                            <AiOutlineMenu/>
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