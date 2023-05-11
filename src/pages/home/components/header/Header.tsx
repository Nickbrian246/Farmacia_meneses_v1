import React, {useState, useEffect} from "react"
import './header.css';
import logoFarmaciaMeneses from "../../../../assets/Farmacias-meneses-logo.png"
import {CiMenuBurger} from "react-icons/ci";
import ToggleMenu from "./asideMenu";
import { MedicineModalFlow } from "../../../Modalflow";
import {PostMedicinesData} from "../../../../fetch/fetchMedicines/fetchMedicines"



const Header =() =>{
    const [isOpenmodal, setIsOpenModal] = useState<boolean>(false);
    const [isOpenFormModal, setOpenFormModal] = useState<boolean>(false);
    const [optionSelected , setOptionSelected] = useState<string>("")
    const handleModal = () => {
        setIsOpenModal((prevState) => !prevState)
    }
    console.log(optionSelected,"soy option desde header");
    
    // useEffect(()=>{
    //     PostMedicinesData({name:"desde la app",
    //     compound:"eres mi mas bello amanecer xd",
    //     price:125,
    //     type:"inyectado",
    //     quantity:500,
    //     function:"marep",
    //     imgId:"622137fd3029ec84a594f50b",
    //     id:"622137fd3029ec84a594f50b"})
    //     .then((response) => setDataTest(response))
    // },[])
    


    return (
        <>
    <header className='header-container'>

        <div className='icon-container'>
        <CiMenuBurger 
        className='icon-header'
        onClick={()=>{handleModal()}}/>
        </div>
        <picture className='logo-container'>
            <img className='logo-container-img' src={logoFarmaciaMeneses} alt='logo de empresa'/>
        </picture>
    </header>
    <aside>
    {(isOpenmodal && (<ToggleMenu 
    setIsOpenModal={setIsOpenModal} 
    setOpenFormModal={setOpenFormModal}
    setOptionSelected={setOptionSelected}
    />
    ))}
    {
    (isOpenFormModal && (
    <MedicineModalFlow
    setOpenFormModal={setOpenFormModal}
    optionSelectedFromToggleMenuHome={optionSelected}

    />
    ))}
    </aside>
    </>
    )
}
export {Header};



