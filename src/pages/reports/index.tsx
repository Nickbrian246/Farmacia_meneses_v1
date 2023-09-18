import {ChangeEvent, useEffect} from "react"
import { Reports as Props } from "./interfaces/ReportsInterfaces";
import { Button, Stack, Typography, TextField, Box, CircularProgress } from "@mui/material";
import { SellOptionsList } from "./components/sellOptions/options";
import { StockOptionsList } from "./components/stock";
import { SellsList } from "./components/gridReports/sell&Stock";
import { fetchReport ,fetchStock, fetchWeeklyReport } from "./services";
import { useSelector, useDispatch} from "react-redux";
import { useState } from "react";
import { ArraySaleTotalAndDay, ListNetSalesOutPut, StockWithColorNIsSelected, addedStockToListNetSales } from "./interfaces";
import { Header } from "../home/components/header/Header";
import { adapterForReport, adapterForReportTwoDimensionalArray, postWeeklyReportsAdapter } from "./adapters/forPostWeeklyReport";
import { setErrorMessage } from "../../store/slices/globalErrorMessage/globalErrorMessage";
import { createExcelReport, createStockReport } from "./utils/createExcelReport";
import LinesChart from "./components/graphics/weeklyReportsGraphics/LineChart";
import { VerticalGhrapic } from "./components/graphics/verticalGraphics/VerticalGraphics";
import { StockTable } from "./components/gridReports/stock/stock";
import { stockAdapter } from "./adapters";
import { useParams } from "react-router-dom";
import {
  addDayOfWeek,
  addDayToArray,
  addStockToList,
  cleanStockNAddProperties,
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
  //dataList es donde se guarda la informacion pura de todo lo que es ventas 
  const [dataList, setDataList]= useState<addedStockToListNetSales[]>([])
  // dataStockList es donde se guarda la informacion pura la que llega desde el backend 
  const [dataStockList, setDataStockList]= useState<StockWithColorNIsSelected[]>([])
  ///**************************************************************************************************** */
  // cuando el input tiene una entrada se filtran las coincidencias que cumplen y  se alojan en dataListFiler
  // cuando su propiedad length es mayor a uno entonces se cambia de tabla y se renderiza con la informacion de dataList
  const [dataListFilter, setDataListFilter]= useState<addedStockToListNetSales[]>([])
  const [dataListFilterStock, setDataListFilterStock]= useState<StockWithColorNIsSelected[]>([])
  // el estado qu ese encarga del input
  const [inputFilter, setInputFilter] = useState<string>("")

  const [optionSelected, setOptionSelected] = useState<string>("")
  const [apiResponse, setApiResponse]= useState<ListNetSalesOutPut[]>([])
  const [arrayDateTotalAndDay, setArrayDateTotalAndDay] = useState<ArraySaleTotalAndDay[]>([])
  const [total,setTotalSales]= useState<number | null>(0)
  const [isLoading, setIsLoading]= useState<boolean>(false)
  const [isGraphicOpen, setIsGraphicOpen] = useState<Boolean>(false)
  const dispatch =  useDispatch()
  const {option} = useParams()
  const token= useSelector((state:any)=> state.loggedUser.token)

const handleFilterInput = (e:ChangeEvent<HTMLInputElement>):void =>{
    setInputFilter(e.target.value)
}
useEffect(()=>{
  if(option){    
    handleOptionSelected(option);    
  }else {
    dispatch(setErrorMessage({
      errorMessage:"ha habido un error ",
      isError:true,
      errorMessageBold:"comuniquese con asistencia en caso de que persiste",
      severityType:"error",
      title:"error"
    }))
  }
},[option])

const handleOptionSelected=(name:string) :void=> {
    setOptionSelected(name) 

    setIsLoading((prevState)=> !prevState)
    setDataList([])
    setTotalSales(null)
    setIsGraphicOpen(false)
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
            setDataStockList([])
            
            const dataCleaningTest = adapterForReport(cleaningListNetSales)
            dataForReport = new Array([dayOfWeek,[...dataCleaningTest]])
          }).catch((error)=>{ 
            if(error.response.status === 404) {
              dispatch(
                setErrorMessage({
                isError:true,
                errorMessage:"",
                errorMessageBold:`${error.response.data.error}`,
                severityType:"warning",
                title:`${error.message}`,
                duration:6_000,
              }))
                setIsLoading((prevState)=> !prevState)
            }else {

              dispatch(
                setErrorMessage({
                isError:true,
                errorMessage:"",
                errorMessageBold:`${error.response.data.error}`,
                severityType:"error",
                title:`${error.message}`}))
                setIsLoading((prevState)=> !prevState)
            }
        })
        break
      case "stock":       
        fetchStock(token)
        .then((response)=> {
          const dataForTable =  cleanStockNAddProperties(response)
          setIsLoading((prevState)=> !prevState)
          setDataStockList(dataForTable)
          

          // setDataListFilter(dataForTable)
          
          
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
      case "sellsYesterday":
        const yesterdayDate= yesterday()

        fetchReport(yesterdayDate,token)
        .then((response)=> {
          const netSalesArray= response.data[0].salesOfTheDay;
          const cleaningListNetSales= listNetSales(netSalesArray)
          const total= totalSales(cleaningListNetSales)
          setApiResponse(cleaningListNetSales)
          setTotalSales(total)
          setDataStockList([])
          // se prepara data para reporte
          const dayOfWeek = getDayOfWeek(yesterdayDate)
          const dataCleaningTest = adapterForReport(cleaningListNetSales);
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
          const dataForExcelReportRow = addDayToArray(response.data)
          dataForReport =  adapterForReportTwoDimensionalArray (dataForExcelReportRow)
    
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
          setDataStockList([])
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
        const arrayOfDays = getArrayOfDates(currentDay);
        
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
          setDataStockList([])
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
        const ArrayOfDatesAdapter = postWeeklyReportsAdapter(dateLastWeek);
        
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
        setDataStockList([])
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
  if(optionSelected === "stock"){
    const stockData = stockAdapter(dataStockList)
    createStockReport(stockData);
    return
  }
  else{
  
    
    createExcelReport(dataForReport)
  }
}
// este effect se ejecuta cada que se recibe una respusta
// pide informacion del stock y une las compras con sus
// correspondientes stock
useEffect(()=>{
  fetchStock(token)
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
    setDataListFilterStock([])
    return setDataListFilter([])
  }
  if(optionSelected !=="stock"){
    const dataFiltered = dataList.filter((item) =>{
      return item.name.includes(inputFilter)
    })
    setDataListFilter(dataFiltered)
  }else{
    const dataFiltered = dataStockList.filter((item) =>{
      return item.name.includes(inputFilter)
    })
    setDataListFilterStock(dataFiltered)
  }
},[inputFilter])


  return (
    <>
    <Stack>
      <Header/>
    </Stack>

    <Stack justifyContent={"center"} alignItems={"center"} useFlexGap flexWrap="wrap" >
      <Typography variant="h2" alignSelf={"center"}>Reportes de: {option} </Typography>
      {(dataList.length > 0 ||(dataStockList.length>0))  && (
        <Stack direction="row" sx={{pt:"30px" ,minWidth:"1200px"}}  justifyContent="space-between">
          <TextField onChange={handleFilterInput} value={inputFilter} id="outlined-basic" label="filtrar" variant="outlined" sx={{minWidth:"400px"}} />
            <Stack direction="row" spacing={10} >
              {optionSelected!=="sellsToday" && optionSelected !== "sellsYesterday" && optionSelected !== "stock" &&   (
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
        ((dataList.length>0)) &&  (dataListFilter.length<=0) && optionSelected !=="stock" &&
        (<SellsList total={total} dataList={dataList}/>)
      }
      { 
        ((dataListFilter.length>0)) &&  optionSelected !=="stock" &&
        (<SellsList  dataList={dataListFilter}/>)
      }
      { 
        ((dataStockList.length>0)) && (dataListFilterStock.length<=0) && optionSelected === "stock" &&
        (<StockTable setDataList={setDataStockList}  dataList={dataStockList} />)
      }
      { 
        ((dataListFilterStock.length>0)) && optionSelected === "stock" &&
        (<StockTable  dataList={dataListFilterStock} setDataList={setDataStockList} />)
      }
      {isLoading && (
            <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
      )}
    
        
      {( isGraphicOpen  && (
        <>
        {optionSelected === "yesterdayNToday" && (
                    <Box sx={{width:"1090px", height:"500px", mb:"50px"}}>
                    <VerticalGhrapic arrayDateTotalAndDay={arrayDateTotalAndDay} />
                      </Box>
        )}
        {optionSelected !== "yesterdayNToday" && (
            <Box sx={{width:"1090px", height:"700px"}}>
              <LinesChart arrayDateTotalAndDay={arrayDateTotalAndDay} />
            </Box>
        )}

        </>
      ))}
    </Stack>
    </> 
  )
};

export {Reports}