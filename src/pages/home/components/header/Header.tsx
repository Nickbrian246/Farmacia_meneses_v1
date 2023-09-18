import  {useState} from "react"
import './header.css';
import logoFarmaciaMeneses from "../../../../assets/Farmacias-meneses-logo.png"
import {CiMenuBurger} from "react-icons/ci";
import ToggleMenu from "./asideMenu";
import { MedicineModalFlow } from "../../../Modalflow";
import {  Link, NavLink } from "react-router-dom";
import { Alert, AlertTitle, Avatar, ImageListItem, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setErrorMessage } from "../../../../store/slices/globalErrorMessage/globalErrorMessage";
import { deepOrange, deepPurple } from '@mui/material/colors';



const Header =() =>{
    const [isOpenmodal, setIsOpenModal] = useState<boolean>(false);
    const [isOpenFormModal, setOpenFormModal] = useState<boolean>(false);
    const [optionSelected , setOptionSelected] = useState<string>("");
    const dispatch = useDispatch()
    const {
        isError,
        severityType,
        title,
        errorMessage,
        errorMessageBold,
        duration
    } = useSelector((state:any)=> state.globalErrorMessage);
    const {name} = useSelector((state:any) => state.loggedUser);
    const handleModal = () => {
        setIsOpenModal((prevState) => !prevState)
    }
    let durationMessage = duration ?? 3000;
if(isError){
    setTimeout(()=>{
        dispatch(setErrorMessage({
            isError:false,
            errorMessage:"",
            errorMessageBold:"",
            severityType:"error",
            title:""}))
    },durationMessage)
}

return (
    <>
    <header className='header-container'>
        <div className='icon-container'>
        <CiMenuBurger 
        className='icon-header'
        onClick={()=>{handleModal()}}/>
        </div>
        <Link 
        to={"/perfil"}
        style={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            gap:"10px",
            textDecoration:"none",
            color:"black"
            }}
            >
        <Avatar sx={{ bgcolor: deepOrange[500] }}>{name.split("",2)}</Avatar>
        <Typography>{`Usuario: ${name}`}</Typography>
        </Link>
        <ImageListItem sx={{width: 350, height: 450 }}>
            <NavLink to={"/"}>
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
    {isError && (
        <Alert 
            style={{
                position:"fixed",
                top:"12%",
                right:"30%",
                left:"30%",
                zIndex:"10000000",
                }}
        variant="filled" 
        severity={severityType}
        >
        <AlertTitle>{title}</AlertTitle>
        {errorMessage} - <strong>{errorMessageBold}</strong>
        </Alert>
        )}
    </>
    )
}
export {Header};


