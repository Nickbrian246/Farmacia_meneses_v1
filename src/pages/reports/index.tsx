import {useEffect} from "react"
import { Reports as Props } from "./interfaces/ReportsInterfaces";
import { Stack, Typography, } from "@mui/material";
import { SellOptionsList } from "./components/sellOptions/options";
import { StockOptionsList } from "./components/stock";
import { SellsList } from "./components/gridReports/sell&Stock";
import { fetchReport ,fetchStock, fetchWeeklyReport } from "./services";
import { useSelector } from "react-redux";
import { useState } from "react";
import { ListNetSalesOutPut, addedStockToListNetSales } from "./interfaces";
import { Header } from "../home/components/header/Header";
import { postWeeklyReportsAdapter } from "./adapters/forPostWeeklyReport";
import {
  addStockToList,
  formatDate,
  getArrayOfDates,
  listNetSales,
  replaceSlashInDates,
  totalSales,
  weekly,
  yesterday,
  } from "./utils";





const Reports=(props:Props) => {
  const [dataList, setDataList]= useState<addedStockToListNetSales[]>([])
  const [apiResponse, setApiResponse]= useState<ListNetSalesOutPut[]>([])
  const [total,setTotalSales]= useState<number>(0)
  const [isLoading, setIsLoading]= useState<boolean>(false)
  const token= useSelector((state:any)=> state.loggedUser.token)

const handleOptionSelected=(name:string) :void=> {
    console.log(name)
    setIsLoading((prevState)=> !prevState)
    if(name==="sellsToday"){
      const today = new Date();
      const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
      const formaDate= formatDate(formattedDate)

      fetchReport(formaDate,token)
        .then((response)=> {
          const netSalesArray= response.data[0].salesOfTheDay;
          const cleaningListNetSales= listNetSales(netSalesArray)
          const total= totalSales(cleaningListNetSales)
          setTotalSales(total)
          setApiResponse(cleaningListNetSales)
        }).catch((error)=>{ console.log(error);
      })
    }
    else if(name==="sellsYesterday"){
      const yesterdayDate= yesterday()

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
    else if(name==="sellsWeek"){
      const currentDay= weekly()
      const arrayOfDays = getArrayOfDates(currentDay)
      const replaceSlashInDate = replaceSlashInDates(arrayOfDays)
      const postAdapter = postWeeklyReportsAdapter(replaceSlashInDate)

      fetchWeeklyReport(postAdapter,token)
      .then((response) => {
        const responseFlat = response.data.flat()
        let productsArray :any = []
        responseFlat.forEach((item:any )=> {
            const sells = item.salesOfTheDay
            productsArray.push(sells)
        })
        const productsArrayFlatted= productsArray.flat(1)
        const netSales = listNetSales(productsArrayFlatted)
        const total = totalSales(netSales)
        setApiResponse(netSales)
        setTotalSales(total)

      })
      .catch((error) => console.log(error))

    }
}
// este effect se ejecuta cada que se recibe una respusta
// pide informacion del stock y une las compras con sus
// correspondientes stock
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