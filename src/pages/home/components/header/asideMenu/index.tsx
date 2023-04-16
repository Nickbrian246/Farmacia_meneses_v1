import React ,{ useState} from "react"
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {listItems} from "./list"
import { v4 as uuidv4 } from 'uuid';


type Anchor = 'top' | 'left' | 'bottom' | 'right';
type setIsOpenModal = React.Dispatch<React.SetStateAction<boolean>>;



export default function ToggleMenu(props :{setIsOpenModal:setIsOpenModal}) {
    const {setIsOpenModal} = props
    const [optionSelected, setOptionSelected] = useState("")
    console.log(optionSelected,"soy option selcted")
    const [state, setState] = useState({
        top: false,
        left:true,
        bottom: false,
        right: false,
    });

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
                setOptionSelected(text.nombre)}} >
            <ListItemText primary={text.nombre}   />
            </ListItemButton>
        </ListItem>
        ))}
    </List>
    <Divider />
    {/* <List>
        {listItems.map((text) => (
        <ListItem key={uuidv4()} disablePadding>
            <ListItemButton>
            <ListItemText primary={text.nombre}  />
            </ListItemButton>
        </ListItem>
        ))}
    </List> */}
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