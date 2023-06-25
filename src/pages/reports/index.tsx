import {ChangeEvent, useEffect} from "react"
import { Reports as Props } from "./interfaces/ReportsInterfaces";
import { Button, Stack, Typography, TextField, Box } from "@mui/material";
import { SellOptionsList } from "./components/sellOptions/options";
import { StockOptionsList } from "./components/stock";
import { SellsList } from "./components/gridReports/sell&Stock";
import { fetchReport ,fetchStock, fetchWeeklyReport } from "./services";
import { useSelector, useDispatch} from "react-redux";
import { useState } from "react";
import { ArraySaleTotalAndDay, ListNetSalesOutPut, addedStockToListNetSales } from "./interfaces";
import { Header } from "../home/components/header/Header";
import { adapterForReport, postWeeklyReportsAdapter } from "./adapters/forPostWeeklyReport";
import { setErrorMessage } from "../../store/slices/globalErrorMessage/globalErrorMessage";
import { createExcelReport } from "./utils/createExcelReport";
import LinesChart from "./components/graphics/weeklyReportsGraphics/LineChart";
import {
  addDayOfWeek,
  addDayToArray,
  addStockToList,
  formatDate,
  getArrayOfDates,
  getDayOfWeek,
  lastWeek,
  listNetSales,
  reduceArraysOfSalesToTotalAndDate,
  todayAndYesterday,
  totalSales,
  yesterday,
  } from "./utils";

  let dataForReport:any []
  let optionSelected:string
const Reports = (props:Props) => {
  const [dataList, setDataList]= useState<addedStockToListNetSales[]>([])
  const [dataListFilter, setDataListFilter]= useState<addedStockToListNetSales[]>([])
  const [inputFilter, setInputFilter] = useState<string>("")
  const [apiResponse, setApiResponse]= useState<ListNetSalesOutPut[]>([])
  const [arrayDateTotalAndDay, setArrayDateTotalAndDay] = useState<ArraySaleTotalAndDay[]>([])
  const [total,setTotalSales]= useState<number | null>(0)
  const [isLoading, setIsLoading]= useState<boolean>(false)
  const [isGraphicOpen, setIsGraphicOpen] = useState<Boolean>(false)
  const dispatch =  useDispatch()
  const token= useSelector((state:any)=> state.loggedUser.token)

const handleFilterInput = (e:ChangeEvent<HTMLInputElement>):void =>{
    setInputFilter(e.target.value)
}

const handleOptionSelected=(name:string) :void=> {
    console.log(name)
    optionSelected = name

    setIsLoading((prevState)=> !prevState)
    setDataList([])
    setTotalSales(null)
    switch (name){
      case "sellsToday":
        const today = new Date();
        const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
        const formaDate= formatDate(formattedDate)
        const dayOfWeek = getDayOfWeek(formattedDate)
    
        fetchReport(formaDate,token)
          .then((response)=> {
            
            const netSalesArray= response.data[0].salesOfTheDay;
            const cleaningListNetSales= listNetSales(netSalesArray)
            const total= totalSales(cleaningListNetSales)
            setApiResponse(cleaningListNetSales)
            setTotalSales(total)
            
            const dataCleaningTest = adapterForReport(cleaningListNetSales)
            dataForReport = new Array([dayOfWeek,[...dataCleaningTest]])
          }).catch((error)=>{ 
            dispatch(setErrorMessage({
              isError:true,
              errorMessage:"",
              errorMessageBold:`${error.response.data.data}`,
              severityType:"error",
              title:`${error.message}`}))
              setIsLoading((prevState)=> !prevState)
        })
        break
      case "sellsYesterday":
        const yesterdayDate= yesterday()

        fetchReport(yesterdayDate,token)
        .then((response)=> {
          const netSalesArray= response.data[0].salesOfTheDay;
          const cleaningListNetSales= listNetSales(netSalesArray)
          const total= totalSales(cleaningListNetSales)
          setApiResponse(cleaningListNetSales)
          setTotalSales(total)
          // se prepara data para reporte
          const dayOfWeek = getDayOfWeek(yesterdayDate)
          const dataCleaningTest = adapterForReport(cleaningListNetSales)
          dataForReport = new Array([dayOfWeek,[...dataCleaningTest]])
          dataForReport = dataForReport
        }).catch((error)=>{ 
          dispatch(setErrorMessage({
            isError:true,
            errorMessage:"",
            errorMessageBold:`${error.response.data.data}`,
            severityType:"error",
            title:`${error.message}`}))
            setIsLoading((prevState)=> !prevState)
      })
        break
      case "yesterdayNToday":
        const dates = todayAndYesterday()
        const datesAdapter = postWeeklyReportsAdapter(dates)
    
        fetchWeeklyReport(datesAdapter,token)
        .then((response)=>{
          const dataForExcelReport = addDayToArray(response.data)
          dataForReport = dataForExcelReport
          
          const arrayOfTotalAndDates = reduceArraysOfSalesToTotalAndDate(response.data)
          const dayAdded = addDayOfWeek(arrayOfTotalAndDates)
          setArrayDateTotalAndDay(dayAdded)
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
        .catch((error)=>{
          dispatch(setErrorMessage({
            isError:true,
            errorMessage:"",
            errorMessageBold:`${error.response.data.data}`,
            severityType:"error",
            title:`${error.message}`}))
            setIsLoading((prevState)=> !prevState)
        })


        break
      case "sellsWeek":
        const currentDay= formatDate(new Date())
        const arrayOfDays = getArrayOfDates(currentDay)
        const postAdapter = postWeeklyReportsAdapter(arrayOfDays)
    
        fetchWeeklyReport(postAdapter,token)
        .then((response) => {
          const dataForExcelReport = addDayToArray(response.data)
          dataForReport = dataForExcelReport
    
          const arrayOfTotalAndDates = reduceArraysOfSalesToTotalAndDate(response.data)
          const dayAdded = addDayOfWeek(arrayOfTotalAndDates)
          setArrayDateTotalAndDay(dayAdded)
    
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
        .catch((error) => {
          dispatch(setErrorMessage({
            isError:true,
            errorMessage:"",
            errorMessageBold:`${error.response.data.data}`,
            severityType:"error",
            title:`${error.message}`}))
            setIsLoading((prevState)=> !prevState)
        })
        break
      case "sellsLastWeek":
        const dateLastWeek= lastWeek()
        const ArrayOfDatesAdapter = postWeeklyReportsAdapter(dateLastWeek)
        
        fetchWeeklyReport(ArrayOfDatesAdapter,token)
        .then((response) => {
        const dataForExcelReport = addDayToArray(response.data)
        dataForReport=dataForExcelReport
        
    
        const arrayOfTotalAndDates = reduceArraysOfSalesToTotalAndDate(response.data)
        const dayAdded = addDayOfWeek(arrayOfTotalAndDates)
        setArrayDateTotalAndDay(dayAdded)
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
        }).catch((error) => {
          dispatch(setErrorMessage({
            isError:true,
            errorMessage:"",
            errorMessageBold:`${error.response.data.data}`,
            severityType:"error",
            title:`${error.message}`}))
            setIsLoading((prevState)=> !prevState)
        })
        break
    }
  }

const handleDownloadExcelReport = () => {
  createExcelReport(dataForReport)

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
  }).catch((error)=> {
    dispatch(setErrorMessage({
      isError:true,
      errorMessage:"",
      errorMessageBold:`${error.response.data.data}`,
      severityType:"error",
      title:`${error.message}`}))
  })
},[apiResponse])

useEffect(()=>{
  if (inputFilter.length === 0) {
    return setDataListFilter([])
  }
  const dataFiltered = dataList.filter((item) =>{
    return item.name.includes(inputFilter)
  })
  setDataListFilter(dataFiltered)
},[inputFilter])
console.log(dataListFilter)

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
        <Stack direction="row" sx={{pt:"30px" ,minWidth:"1200px"}}  justifyContent="space-between">
          <TextField onChange={handleFilterInput} value={inputFilter} id="outlined-basic" label="filtrar" variant="outlined" sx={{minWidth:"400px"}} />
            <Stack direction="row" spacing={10} >
              {optionSelected!=="sellsToday" && optionSelected !== "sellsYesterday" && (
                <Button
                variant="contained"
                color="success"
                onClick={()=>{setIsGraphicOpen((prevState)=>!prevState)}}
                >
                  Visualizar en grafica
                </Button>
              )}
              <Button variant="contained"  color="secondary"  onClick={handleDownloadExcelReport}>Descargar en excel</Button>
            </Stack>
        </Stack>
      )}
      { 
        (isLoading ||(dataList.length>0)) &&  (dataListFilter.length<=0) &&
        (<SellsList total={total} dataList={dataList} isLoading={isLoading}/>)
      }
      { 
        (isLoading ||(dataListFilter.length>0)) && 
        (<SellsList  dataList={dataListFilter} isLoading={isLoading}/>)
      }
    
        
      {( isGraphicOpen  && (
          <Box sx={{width:"1090px", height:"700px"}}>
        <LinesChart arrayDateTotalAndDay={arrayDateTotalAndDay} />
          </Box>
      ))}
    </Stack>
    </>
  )
};

export {Reports}