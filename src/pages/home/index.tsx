import "./homeIndex.css"
import { Mosaic } from "./components/mosaicHome/Mosaic";
import {SelectedProductList} from "./components/selectedProducst/listProducts";
import { Header } from "./components/header/Header";
import {InputSearchByName} from "./components/inputSearchByName/InputSearchByName"
import { Box , Stack} from "@mui/material";

interface Props{
    path:string
}
const Home= (props:Props) =>{
    return (
        <>
        <Header/>
        <Box sx={{display:"flex",justifyContent:"space-between", height:"78vh", mt:"20px"}} >
        <Stack sx={{ml:"80px", display:"flex",flexDirection:"column", gap:"10px", mt:"20px",alignItems:"center"}}>
            <InputSearchByName isforCartlist={true}/>
            <Mosaic/>
        </Stack>
        <SelectedProductList/>
        </Box>
        </>
    )
}

export {Home}