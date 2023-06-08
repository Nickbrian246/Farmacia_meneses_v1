import {useEffect} from "react"
import { Reports as Props } from "./interfaces/ReportsInterfaces";
import { Stack, Typography, } from "@mui/material";
import { SellOptionsList } from "./components/sellOptions/options";
import { StockOptionsList } from "./components/stock";
import { SellsList } from "./components/gridReports/sell&Stock";
import { fetchReport ,fetchStock } from "./services";
import { useSelector } from "react-redux";
import { useState } from "react";
import { ListNetSalesOutPut, addedStockToListNetSales } from "./interfaces";
import { Header } from "../home/components/header/Header";
import { addStockToList, formatDate, listNetSales, totalSales, yesterday } from "./utils";





const Reports=(props:Props) => {
  const [dataList, setDataList]= useState<addedStockToListNetSales[]>([])
  const [apiResponse, setApiResponse]= useState<ListNetSalesOutPut[]>([])
  const [total,setTotalSales]= useState<number>(0)
  const [isLoading, setIsLoading]= useState<boolean>(false)
  const token= useSelector((state:any)=> state.loggedUser.token)

  const handleOptionSelected=(name:string) :void=> {
    console.log(name)
    setIsLoading((prevStae)=> !prevStae)
    if(name==="sellsToday"){
      const today = new Date();
      const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
      const formaDate= formatDate(formattedDate)
      fetchReport(formaDate,token)
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
    else if(name==="sellsYesterday"){
      const yesterdayDate= yesterday()
      console.log(yesterdayDate)
      fetchReport(yesterdayDate,token)
      .then((response)=> {
        const netSalesArray= response.data[0].salesOfTheDay;
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
    <Stack>
      <Header/>
    </Stack>
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