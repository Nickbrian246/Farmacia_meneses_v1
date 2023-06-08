import  {useState} from "react"
import './header.css';
import logoFarmaciaMeneses from "../../../../assets/Farmacias-meneses-logo.png"
import {CiMenuBurger} from "react-icons/ci";
import ToggleMenu from "./asideMenu";
import { MedicineModalFlow } from "../../../Modalflow";
import {  NavLink } from "react-router-dom";
import { ImageListItem } from "@mui/material";



const Header =() =>{
    const [isOpenmodal, setIsOpenModal] = useState<boolean>(false);
    const [isOpenFormModal, setOpenFormModal] = useState<boolean>(false);
    const [optionSelected , setOptionSelected] = useState<string>("");
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
        <ImageListItem sx={{width: 350, height: 450 }}>
            <NavLink to={"/home"}>
                <img
                className='logo-container-img'
                src={logoFarmaciaMeneses}
                alt='logo de empresa'
                />
            </NavLink>
        </ImageListItem>
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



