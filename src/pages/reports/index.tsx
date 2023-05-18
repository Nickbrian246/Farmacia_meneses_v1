import { Reports as Props } from "./interfaces/ReportsInterfaces";
import { Stack, Typography, } from "@mui/material";
import { SellOptionsList } from "./components/sellOptions/options";
import { StockOptionsList } from "./components/stock";
import { Sells } from "./components/gridReports/sell&Stock";


const Reports=(props:Props) => {

  const handleOptionSelected=(name:string) :void=> {
    console.log(name)

  }

  return (
    <>
    <Stack justifyContent={"center"} alignItems={"center"} useFlexGap flexWrap="wrap" >
      <Typography variant="h2" alignSelf={"center"}>Reportes de: </Typography>
      <StockOptionsList optionSelected={handleOptionSelected}/>
      <SellOptionsList optionSelected={handleOptionSelected}/>
      <Sells/>

    </Stack>
    
    
    </>
  )
};

export {Reports}