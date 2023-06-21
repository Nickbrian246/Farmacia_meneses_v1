import {useEffect} from "react"
import { Reports as Props } from "./interfaces/ReportsInterfaces";
import { Button, Stack, Typography, TextField, Box } from "@mui/material";
import { SellOptionsList } from "./components/sellOptions/options";
import { StockOptionsList } from "./components/stock";
import { SellsList } from "./components/gridReports/sell&Stock";
import { fetchReport ,fetchStock, fetchWeeklyReport } from "./services";
import { useSelector } from "react-redux";
import { useState } from "react";
import { ArraySaleTotalAndDay, ListNetSalesOutPut, addedStockToListNetSales } from "./interfaces";
import { Header } from "../home/components/header/Header";
import { postWeeklyReportsAdapter } from "./adapters/forPostWeeklyReport";
import * as XLSX from "xlsx"
import LinesChart from "./components/graphics/weeklyReportsGraphics/LineChart";
import {
  addDayOfWeek,
  addStockToList,
  formatDate,
  getArrayOfDates,
  lastWeek,
  listNetSales,
  reduceArraysOfSalesToTotalAndDate,
  replaceSlashInDates,
  totalSales,
  weekly,
  yesterday,
  } from "./utils";


const Reports = (props:Props) => {
  const [dataList, setDataList]= useState<addedStockToListNetSales[]>([])
  const [apiResponse, setApiResponse]= useState<ListNetSalesOutPut[]>([])
  const [arrayDateTotalAndDay, setArrayDateTotalAndDay] = useState<ArraySaleTotalAndDay[]>([])
  const [total,setTotalSales]= useState<number | null>(0)
  const [isLoading, setIsLoading]= useState<boolean>(false)
  const [isGraphicOpen, setIsGraphicOpen] = useState<Boolean>(false)
  const token= useSelector((state:any)=> state.loggedUser.token)
  /**
   * this function handles the user option selected 
   * where each case do something and show something
   * @param name name action selected
   */
const handleOptionSelected=(name:string) :void=> {
    console.log(name)

    setIsLoading((prevState)=> !prevState)
    setDataList([])
    setTotalSales(null)

    if(name==="sellsToday"){
      const today = new Date();
      const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
      const formaDate= formatDate(formattedDate)

      fetchReport(formaDate,token)
        .then((response)=> {
          const netSalesArray= response.data[0].salesOfTheDay;
          const cleaningListNetSales= listNetSales(netSalesArray)
          const total= totalSales(cleaningListNetSales)
          setApiResponse(cleaningListNetSales)
          setTotalSales(total)
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
        setApiResponse(cleaningListNetSales)
        setTotalSales(total)
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
    else if(name==="sellsLastWeek"){
      const dateLastWeek= lastWeek()
      const ArrayOfDatesAdapter = postWeeklyReportsAdapter(dateLastWeek)
      
      fetchWeeklyReport(ArrayOfDatesAdapter,token)
      .then((response) => {
      const arrayOfTotalAndDates = reduceArraysOfSalesToTotalAndDate(response.data)
      const dayAdded = addDayOfWeek(arrayOfTotalAndDates)
      setArrayDateTotalAndDay(dayAdded)
      console.log(dayAdded)
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
    }
}

const handleDownloadExcelReport = () => {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(dataList);
  XLSX.utils.book_append_sheet(workbook, worksheet, "SALES");
  XLSX.writeFile(workbook, "Sales22.xlsx", { compression: true });
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
      {dataList.length > 0 && (
        <Stack direction="row" spacing={10} sx={{pt:"30px"}}  justifyContent="space-between">
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
            <Stack direction="row" spacing={10}  >
              <Button variant="contained" color="success">Visualizar en grafica</Button>
              <Button variant="contained"  color="secondary"  onClick={handleDownloadExcelReport}>Descargar en excel</Button>
            </Stack>
        </Stack>
      )}
      {  (isLoading ||(dataList.length>0)) && 
      (<SellsList total={total} dataList={dataList} isLoading={isLoading}/>)}
    
        
      {( isLoading ||(dataList.length>0) && (
          <Box sx={{width:"1090px", height:"700px"}}>
        <LinesChart arrayDateTotalAndDay={arrayDateTotalAndDay} />
          </Box>
      ))}
    </Stack>
    </>
  )
};

export {Reports}