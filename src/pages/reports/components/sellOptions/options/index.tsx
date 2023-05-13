import { listOptions } from "./sellOptionsList";
import { Stack, Typography } from "@mui/material";
import { OptionsElement } from "../../../../components/optionsElementComponent/OptionsElement";

const SellOptionsList =() => {
  
  const handleOptionSelected=(option:string):string=>{
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
      <Typography variant="h4" alignSelf={"center"} >Ventas:</Typography>
      {listOptions.map((item) => (
        <OptionsElement
        background="#33CEFF"
        elementId={item.id}
        fontSize="1.7rem"
        height="100px"
        text={item.lable}
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

export {SellOptionsList}