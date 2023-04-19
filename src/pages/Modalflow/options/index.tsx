import React from 'react'
import { testList } from "./listTest";
import { MosaicItem } from "../../components/mosaicComponent/MosaicItem";
import { AiFillPlusCircle } from 'react-icons/ai';
import { MdDeleteForever, MdUpdate } from 'react-icons/md';

interface Props {
    handleNextStep:(optionSelected:string) => string,
}


const OptionsFormedicines = ( props:Props) => {
    const {handleNextStep} = props
return (
    
    <>
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
    </>
)
}
export {OptionsFormedicines}