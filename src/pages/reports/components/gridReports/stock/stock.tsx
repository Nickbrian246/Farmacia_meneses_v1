import React, { SetStateAction, useState, useEffect } from "react";
import { StockWithColorNIsSelected} from "../../../interfaces";
import { Organize } from "./components/organizeComponent";
import { Range } from "./components/range";
import {
  Box,
  CircularProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
  tableCellClasses, } from "@mui/material";

interface Props{
  dataList: StockWithColorNIsSelected[],
  setDataList: React.Dispatch<SetStateAction<StockWithColorNIsSelected[]>>,
}
interface Ranges{
  startRange:number,
  endRange:number
  color:string,
  id:string
  }
  
type OptionsReference = Pick<StockWithColorNIsSelected, "quantity"| "price"|"pieces">
type OptionSelections = "quantity"| "price"|"pieces"|"default" ;
type Order = "mayor"| "menor"
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const StockTable = (props:Props)=>{
  const {
    dataList,
    setDataList,
  }= props
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuOptionSelected , setMenuOptionSelected] = useState<OptionSelections>("default")
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(true)
  const [FromHighestToLowest, setFromHighestToLowest] = useState<boolean>(false)
  const [FromLowestToHighest, setFromLowestToHighest] = useState<boolean>(false)
  const [rangesSelected, setRangesSelected] = useState<Ranges[]>([])

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionSelected = (option:OptionSelections) => {
    setMenuOptionSelected(option)
    setIsOptionSelected(false)
    setFromHighestToLowest(false)
    setFromLowestToHighest(false)
    handleClose()
  };
  const handleCheckFromHighestToLowest = (event: React.ChangeEvent<HTMLInputElement>)=> {
    setFromHighestToLowest(event.target.checked)
    setFromLowestToHighest(false)
    sortElements(menuOptionSelected,"mayor")
  }
  const handleCheckFromLowestToHighest= (event: React.ChangeEvent<HTMLInputElement>)=> {
    setFromHighestToLowest(false)
    setFromLowestToHighest(event.target.checked)
    sortElements(menuOptionSelected,"menor")
  }

  const sortElements = (reference: OptionSelections,order:Order) =>{
  if(order === "mayor"){
    dataList.sort((a,b)=>{  
      // @ts-ignore 
      return b[reference] - a[reference];
    })
  } else{
    dataList.sort((a,b)=>{   
      // @ts-ignore
      return a[reference] - b[reference];
    })
  }
}

const markRowColor = (reference: OptionSelections) => {
  let data:StockWithColorNIsSelected[];
  rangesSelected.forEach((itemRange) => {// tengo que recorrer el array de rangos seleccionados
    let data2 = dataList.map((item)=>{
            // @ts-ignore
      if(item[reference] >= itemRange.startRange && item[reference] <= itemRange.endRange){
        return {...item, color: itemRange.color,isSelected:true}
      }
      else{
        return item
      }
    })
    data = data2
  });
      // @ts-ignore
  return data
}
/**
 * 
 * @param topRange rango superior
 * @param bottomRange rango inferior
 */
const unMarkRowColor = (topRange:number, bottomRange:number, reference: OptionSelections):void => {
  const data:StockWithColorNIsSelected[] = dataList.map((item)=>{
          // @ts-ignore
    if(item[reference] >= topRange && item[reference] <= bottomRange){
      return {...item, color: "",isSelected:false}
    }
    else{
      return item
    }
  }) 
  setDataList(data)
}

useEffect(()=>{
  if(rangesSelected&&rangesSelected.length >=1){
    setDataList(markRowColor(menuOptionSelected))
  }
},[rangesSelected])

return (
  <>
  <Stack sx={{display:"flex", minWidth:"1400px", flexDirection:"row" ,mt:"30px", justifyContent:"space-evenly",mb:"10px", maxHeight:"140px"}} >
    <Organize
    FromHighestToLowest={FromHighestToLowest}
    FromLowestToHighest={FromLowestToHighest}
    anchorEl={anchorEl}
    handleCheckFromHighestToLowest={handleCheckFromHighestToLowest}
    handleCheckFromLowestToHighest={handleCheckFromLowestToHighest}
    handleClick={handleClick}
    handleClose={handleClose}
    handleOptionSelected={handleOptionSelected}
    isOptionSelected={isOptionSelected}
    menuOptionSelected={menuOptionSelected}
    open={open}
    />
    <Range
    rangesSelected={rangesSelected}
    setRangesSelected={setRangesSelected}
    isOptionSelected={isOptionSelected}
    unMarkRowColor={unMarkRowColor}
    menuOptionSelected={menuOptionSelected}
    />
    </Stack>
  <TableContainer component={Paper} sx={{maxWidth:"1400px", mt:"30px", minHeight:"690px", mb:"50px"}}>
    <Table stickyHeader aria-label="sticky table">
      <TableHead>
        <TableRow>
          <StyledTableCell>Nombre</StyledTableCell>
          <StyledTableCell align="center">Precio</StyledTableCell>
          <StyledTableCell align="center" >articulos por paquete</StyledTableCell>
          <StyledTableCell align="center">Tamaño</StyledTableCell>
          <StyledTableCell align="center">Tag</StyledTableCell>
          <StyledTableCell align="center">marca</StyledTableCell>
          <StyledTableCell align="center">cantidad en stock</StyledTableCell>
        </TableRow>
      </TableHead>

      <TableBody>
      {dataList.length>0 && (
        dataList.map((item) => (
          <StyledTableRow key={item._id}>
            <StyledTableCell 
              sx={{background:item.isSelected ? item.color : "inherit",color:item.isSelected ? "#fff8e1" : "inherit"}}
            >
              {item.name}
            </StyledTableCell>
            <StyledTableCell 
              sx={{background:item.isSelected ? item.color : "inherit",color:item.isSelected ? "#fff8e1" : "inherit"}}
              align="center"
            >
              {item.price.toLocaleString("en-US", { style: "currency", currency: "USD" })}
            </StyledTableCell>
            <StyledTableCell 
              sx={{background:item.isSelected ? item.color : "inherit",color:item.isSelected ? "#fff8e1" : "inherit"}}
              align="center"
            >
              {item.pieces ? item.pieces : "No definido"}
            </StyledTableCell>
            <StyledTableCell 
              sx={{background:item.isSelected ? item.color : "inherit",color:item.isSelected ? "#fff8e1" : "inherit"}}
              align="center"
            >
              {item.size}
            </StyledTableCell>
            <StyledTableCell 
              sx={{background:item.isSelected ? item.color : "inherit",color:item.isSelected ? "#fff8e1" : "inherit"}}
              align="center"
            >
              {item.tag? item.tag :"No definido"}
            </StyledTableCell>
            <StyledTableCell 
              sx={{background:item.isSelected ? item.color : "inherit",color:item.isSelected ? "#fff8e1" : "inherit"}}
              align="center"
            >
              {item.brand ? item.brand :"No definido"}
            </StyledTableCell>
            <StyledTableCell 
              sx={{background:item.isSelected ? item.color : "inherit",color:item.isSelected ? "#fff8e1" : item.quantity<=0 ? "red": "inherit"}}
              align="center"
            >
              {item.quantity}
            </StyledTableCell>
          </StyledTableRow>
        ))
      )}
      </TableBody>
    </Table>
  </TableContainer>
  {/* {isLoading && (
      <Box sx={{ display: 'flex',}}>
        <CircularProgress  sx={{fontSize:"300px"}}/>
      </Box>)}  */}

  </>
  ) 
};
export {StockTable}
