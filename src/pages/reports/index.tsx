import {useEffect} from "react"
import { Reports as Props } from "./interfaces/ReportsInterfaces";
import { Stack, Typography, } from "@mui/material";
import { SellOptionsList } from "./components/sellOptions/options";
import { StockOptionsList } from "./components/stock";
import { SellsList } from "./components/gridReports/sell&Stock";
import { fetchTodayReport ,fetchStock } from "./services";
import { useSelector } from "react-redux";
import { useState } from "react";
import { addStockToList, listNetSales, totalSales } from "./utils";
import { ListNetSalesOutPut, addedStockToListNetSales } from "./interfaces";





const Reports=(props:Props) => {
  const [dataList, setDataList]= useState<addedStockToListNetSales[]>([])
  const [apiResponse, setApiResponse]= useState<ListNetSalesOutPut[]>([])
  const [total,setTotalSales]= useState<number>(0)
  const [isLoading, setIsLoading]= useState<boolean>(false)
  const token= useSelector((state:any)=> state.loggedUser.token)

  const handleOptionSelected=(name:string) :void=> {
    console.log(name)

    if(name==="sellsToday"){
      setIsLoading((prevStae)=> !prevStae)
      const today = new Date();
      const formattedDate = `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`;
      fetchTodayReport(formattedDate,token)
        .then((response)=> {
        
          const netSalesArray= response.data[0].salesOfTheDay;
          console.log(response)
          const cleaningListNetSales= listNetSales(netSalesArray)
          const total= totalSales(cleaningListNetSales)
          setTotalSales(total)
          setApiResponse(cleaningListNetSales)
        }).catch((error)=>{ console.log(error);
      })
    }
  }

useEffect(()=>{
  fetchStock(token )
  .then((response)=>{
    const addedStockToList= addStockToList(response,apiResponse)
    setIsLoading(false)
    setDataList(addedStockToList)
  }).catch((error)=> console.log(error))
},[apiResponse])

  return (
    <>
    <Stack justifyContent={"center"} alignItems={"center"} useFlexGap flexWrap="wrap" >
      <Typography variant="h2" alignSelf={"center"}>Reportes de: </Typography>
      <StockOptionsList optionSelected={handleOptionSelected}/>
      <SellOptionsList optionSelected={handleOptionSelected}/>
      {  (isLoading ||(dataList.length>0)) && 
      (<SellsList total={total} dataList={dataList} isLoading={isLoading}/>)}

    </Stack>
    
    
    </>
  )
};

export {Reports}