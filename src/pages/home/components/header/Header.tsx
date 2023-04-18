import React, {useState} from "react"
import './header.css';
import logoFarmaciaMeneses from "../../../../assets/Farmacias-meneses-logo.png"
import {CiMenuBurger} from "react-icons/ci";
import ToggleMenu from "./asideMenu";
import { MedicineModalFlow } from "../../../Modalflow";


const Header =() =>{
    const [isOpenmodal, setIsOpenModal] = useState<boolean>(false);
    const [isOpenFormModal, setOpenFormModal] = useState<boolean>(false)
    console.log(isOpenFormModal)
    const handleModal = () => {
        setIsOpenModal((prevState) => !prevState)
    }

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
    {(isOpenmodal && (<ToggleMenu setIsOpenModal={setIsOpenModal} setOpenFormModal={setOpenFormModal}/>))}
    {(isOpenFormModal && (<MedicineModalFlow setOpenFormModal={setOpenFormModal}/>))}
    </aside>
    </>
    )
}
export {Header};



