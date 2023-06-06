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
    const [state, setState] = useState({
        top: false,
        left:true,
        bottom: false,
        right: false,
    });
    const navigate= useNavigate()
    const dispatch= useDispatch()

    const handleOptionSelected = (name:string) :void =>{
        setOpenFormModal(true)
        setOptionSelected(name)
    }

const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
        return;
    }
    setIsOpenModal(false)
    setState({ ...state, [anchor]: open });
    };

    const handleLogOut = (id:string):void => {
        if(id==="logOut"){
            dispatch(logOutUser())
        }
    }

    const handleSecondList=(name:string)=>{
        if(name==="Reportes"){
            navigate("/reports")
        }
    }

const list = (anchor: Anchor) => (
    <Box
    sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 350 }}
    role="presentation"
    onClick={toggleDrawer(anchor, false)}
    onKeyDown={toggleDrawer(anchor, false)}
    >
    <List>
        {listItems.map((text, index) => (
        <ListItem  key={uuidv4()} disablePadding>
            <ListItemButton onClick={()=> {
                handleOptionSelected(text.nombre)
                }} >
            <ListItemText primary={text.nombre}  />
            </ListItemButton>
        </ListItem>
        ))}
    </List>
    <Divider />
    <List >
        {secondList.map((text) => (
        <ListItem key={uuidv4()} disablePadding>
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
        {logout.map((text) => (
        <ListItem key={uuidv4()} disablePadding>
            <ListItemButton onClick={()=> {
                handleLogOut(text.id)
            }}>
            <ListItemText sx={{color:"red",fontSize:"bold"}} primary={text.nombre}  />
            </ListItemButton>
        </ListItem>
        ))}
    </List>
    </Box>
);

return (
    <div>
        <React.Fragment key={"left"}>
        <Drawer
            anchor={"left"}
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
        >
            {list("left")}
        </Drawer>
        </React.Fragment>
    
    </div>
);
}