import React ,{ useState} from "react"
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {listItems,logout, secondList} from "./list"
import { v4 as uuidv4 } from 'uuid';
import {logOutUser} from "../../../../../store/slices/auth/Login";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listOptions } from "../../../../reports/components/sellOptions/options/sellOptionsList";
import { stockOptionsList } from "../../../../reports/components/stock/listStockOptions";
import { DatePicker } from "../../../../components/datePicker";
import { te } from "date-fns/locale";


type Anchor = 'top' | 'left' | 'bottom' | 'right';
interface Props {
    setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
    setOpenFormModal:React.Dispatch<React.SetStateAction<boolean>>
    setOptionSelected:React.Dispatch<React.SetStateAction<string>>
}



export default function ToggleMenu(props :Props) {
    const {
        setIsOpenModal,
        setOpenFormModal,
        setOptionSelected
    } = props
    const [isReport, setIsReport] = useState<boolean>(false)
    const [isAddProducts, setIsAddProducts] = useState<boolean>(false)
    const [isDatePickerOpen,setIsDatePickerOpen] = useState(false);
    const navigate= useNavigate()
    const dispatch= useDispatch()
    const [state, setState] = useState({
        top: false,
        left:true,
        bottom: false,
        right: false,
    });

    const handleOptionSelected = (name:string) :void =>{
        setOpenFormModal(true)
        setOptionSelected(name)
    }

const toggleDrawer =(anchor: Anchor, open: boolean,id?:string) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
        return;
    }    
    // setIsOpenModal(false)
    
    setState({ ...state, [anchor]: open });
    };

    const handleLogOut = (id:string):void => {
        if(id==="logOut"){
            dispatch(logOutUser())
        }
    }

    const handleSecondList=(name:string)=>{
        // if(name==="Reportes"){
        //     navigate("/reports")
        // }
        if(name===`Reportes`){
            setIsOpenModal(true)
            setIsReport((prevState) =>!prevState)
            setIsAddProducts(false)
            
        }   
    }

    const handleReportOptions = (option:string)=>{
        if(option ==="personalized"){
            setIsDatePickerOpen(true)
            console.log(isDatePickerOpen);
            
            return 
        }else {
            navigate(`/reportes/${option}`)
        }
    }
const list = (anchor: Anchor) => (
    <Box
    sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 350 }}
    role="presentation"
    // onClick={toggleDrawer(anchor, false)}
    onKeyDown={toggleDrawer(anchor, false)}
    >
    <List>
        
        <ListItem  key={uuidv4()} disablePadding>
            <ListItemButton onClick={()=> {
                setIsReport(false)
                setIsAddProducts((preState) => !preState)   
                }} >
            <ListItemText primary={`Agreagar productos`}  />
            </ListItemButton>
        </ListItem>
    </List>
    <Divider />
    <List >
        {secondList.map((text) => (
        <ListItem key={uuidv4()} disablePadding style={text.nombre === "Reportes" ? { position: "relative" } : {}}>
            <ListItemButton onClick={()=> {
                handleSecondList(text.nombre) 
            }}>
            <ListItemText primary={text.nombre}  />
            </ListItemButton>
        </ListItem>
        ))}
    </List>


    <Divider />
    <List >
        <ListItem key={uuidv4()} disablePadding>
            <ListItemButton onClick={()=> {
                toggleDrawer(anchor, false);
                setIsOpenModal(false);
                navigate("/perfil")
            }}>
            <ListItemText  primary={`Ver perfil`}  />
            </ListItemButton>
        </ListItem>
    </List>
    <Divider />
    <List >
        {logout.map((text) => (
        <ListItem key={uuidv4()} disablePadding>
            <ListItemButton onClick={()=> {
                handleLogOut(text.id);
                toggleDrawer(anchor, false);
                setIsOpenModal(false);
            }}>
            <ListItemText sx={{color:"red",fontSize:"bold"}} primary={text.nombre}  />
            </ListItemButton>
        </ListItem>
        ))}
    </List>
    </Box>
);

return (
    <div style={{position:"absolute"}}>
        <React.Fragment key={"left"}>
        <Drawer
            anchor={"left"}
            open={state["left"]}
            onClose={()=>{
            toggleDrawer("left", false),
            setIsOpenModal(false)}}
        >
            {list("left")}
        </Drawer>
        {(isAddProducts && !isReport ) && (
                <List
                style={{
                    position:"absolute",
                    right:"-490px",
                    zIndex:"1300",
                    background:"#ffff",
                    top:"-120px"
                    }}>
                {listItems.map((text, index) => (
                <ListItem  key={uuidv4()} disablePadding>
                    <ListItemButton onClick={()=> {
                        handleOptionSelected(text.nombre)
                        setIsOpenModal(false)
                        }} >
                    <ListItemText primary={text.nombre}  />
                    </ListItemButton>
                </ListItem>
                ))}
            </List>
        )}
        {isReport && (
        <List  style={{
            position:"absolute",
            right:"-747px",
            zIndex:"1300",
            background:"#ffff",
            top:"-100px"
            }}>
            {listOptions.map((text) => (
            <ListItem key={uuidv4()} disablePadding >
                <ListItemButton 
                disabled ={ text.label === "Del mes" || text.label === "Elegir una fecha"}
                onClick={()=> {
                    handleReportOptions(text.name)
                    setIsAddProducts(false)
                    setIsOpenModal(false);
                }}>
                <ListItemText primary={text.label}  />
                </ListItemButton>
            </ListItem>
            ))}
            <Divider/> 
            {stockOptionsList.map((text) => (
            <ListItem key={uuidv4()} disablePadding >
                <ListItemButton onClick={()=> {
                    handleReportOptions(text.name)
                    setIsAddProducts(false)
                }}>
                <ListItemText  primary={text.label}  />
                </ListItemButton>
            </ListItem>
            ))}
        </List>
        )}
        {isDatePickerOpen && (
            <DatePicker
            setIsOpenModal  = {setIsOpenModal}
            setIsDatePickerOpen = {setIsDatePickerOpen}
            />
        )}
        </React.Fragment>
    
    </div>
);
}
