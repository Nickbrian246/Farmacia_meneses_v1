import { stockOptionsList } from "./listStockOptions";
import { Stack, Typography } from "@mui/material";
import { OptionsElement } from "../../../components/optionsElementComponent/OptionsElement";

interface Props{
  optionSelected:( name:string) => void
}
const StockOptionsList =(props:Props) => {
  const {optionSelected}= props
  
  const handleOptionSelected=(option:string):string=>{
    optionSelected(option)
  return option
  }

  return (
    <>
    <Stack
    justifyContent={"center"} 
    useFlexGap 
    direction={"row"}
    spacing={"10px"}
    flexWrap="wrap"
    sx={{mt:10}}

    >
      <Typography
      variant="h4"
      alignSelf={"center"}
      >
        Inventario:
      </Typography>
      {stockOptionsList.map((item) => (
        <OptionsElement
        background="#33CEFF"
        elementId={item.id}
        fontSize="1.7rem"
        height="100px"
        text={item.label}
        width="230px"
        key={item.id}
        whatIsThisFor={item.name}
        handleOptionSelected={handleOptionSelected}
        />
      ))}

    </Stack>
    
    </>
  )
};

export {StockOptionsList}