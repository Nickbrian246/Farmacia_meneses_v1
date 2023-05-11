import { MosaicItem } from "../../../components/mosaicComponent/MosaicItem";
import { AiFillPlusCircle } from 'react-icons/ai';
import { MdDeleteForever, MdUpdate } from 'react-icons/md';
import {
    ListForMedicines,
    ListForDrinks,
    ListForOthers,
    } from "./listTest";

interface Props {
    handleNextStep:(optionSelected:string) => string| void,
    typeSelected:string
}


const OptionsForm = ( props:Props) => {
    const {
        handleNextStep,
        typeSelected,
    } = props
return (
    
    <>
    {typeSelected==="Medicamentos" &&( 
        ListForMedicines.map((item) => (
            <MosaicItem
            name={item.name}
            width="350px"
            fontSize="1.5rem"
            key={item.name}
            type={item.type}
            handleNextStep={handleNextStep}
            >
            { 
            ((item.type==="add" ) && (<AiFillPlusCircle style={{fontSize:"3rem",color:"#5a5ae9"}}/>))
            ||((item.type==="update" ) && (<MdUpdate style={{color:"#0535E7",fontSize:"3rem"}}/>))
            ||((item.type==="delete" ) && (<MdDeleteForever style={{fontSize:"3rem",color:"#E7052B"}}/>))
            }
            </MosaicItem>
        ))
    )}
    {typeSelected==="Bebidas" &&( 
        ListForDrinks.map((item) => (
            <MosaicItem
            name={item.name}
            width="350px"
            fontSize="1.5rem"
            key={item.name}
            type={item.type}
            handleNextStep={handleNextStep}
            >
            { 
            ((item.type==="add" ) && (<AiFillPlusCircle style={{fontSize:"3rem",color:"#5a5ae9"}}/>))
            ||((item.type==="update" ) && (<MdUpdate style={{color:"#0535E7",fontSize:"3rem"}}/>))
            ||((item.type==="delete" ) && (<MdDeleteForever style={{fontSize:"3rem",color:"#E7052B"}}/>))
            }
            </MosaicItem>
        ))
    )}
    {typeSelected==="Otros productos" &&( 
        ListForOthers.map((item) => (
            <MosaicItem
            name={item.name}
            width="350px"
            fontSize="1.5rem"
            key={item.name}
            type={item.type}
            handleNextStep={handleNextStep}
            >
            { 
            ((item.type==="add" ) && (<AiFillPlusCircle style={{fontSize:"3rem",color:"#5a5ae9"}}/>))
            ||((item.type==="update" ) && (<MdUpdate style={{color:"#0535E7",fontSize:"3rem"}}/>))
            ||((item.type==="delete" ) && (<MdDeleteForever style={{fontSize:"3rem",color:"#E7052B"}}/>))
            }
            </MosaicItem>
        ))
    )}
        {/* {
            ListForMedicines.map((item) => (
                <MosaicItem
                name={item.name}
                width="350px"
                fontSize="1.5rem"
                key={item.name}
                type={item.type}
                handleNextStep={handleNextStep}
                >
                { 
                ((item.type==="add" ) && (<AiFillPlusCircle style={{fontSize:"3rem",color:"#5a5ae9"}}/>))
                ||((item.type==="update" ) && (<MdUpdate style={{color:"#0535E7",fontSize:"3rem"}}/>))
                ||((item.type==="delete" ) && (<MdDeleteForever style={{fontSize:"3rem",color:"#E7052B"}}/>))
                }
                </MosaicItem>
            ))
        }  */}
    </>
)
}
export {OptionsForm}