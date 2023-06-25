import { useEffect, useState } from "react";
import { SellCellItem } from "./SellICellItem";
import { ModelData } from "../../../../../services/dashboard-api/adapters/interfaces/productInterface";
import { Divider, Grid, Paper, Skeleton, Stack, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, styled, tableCellClasses } from "@mui/material";
import { addedStockToListNetSales } from "../../../interfaces";

interface Props{
  isLoading:boolean,
  dataList: addedStockToListNetSales[],
  total?:number |null
}
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


const SellsList=(props:Props)=>{
  const {dataList,isLoading,total}= props
  
  let arrayForSkeleton=  new Array(20).fill("h") 
// useEffect(()=>{
//   setLoading(true)
//   getAllProducts()
//   .then((response)=> {
//     setProductsFetched(response.data)
//     setLoading(false)
//   })
//   .catch((error)=> {console.log(error)})
// },[])

  return (
  <>
  <TableContainer component={Paper} sx={{maxWidth:"1400px", mt:"30px", minHeight:"690px", mb:"50px"}}>
    <Table stickyHeader aria-label="sticky table">
      <TableHead>
        <TableRow>
          <StyledTableCell>Nombre</StyledTableCell>
          <StyledTableCell align="center">Precio</StyledTableCell>
          <StyledTableCell align="center" >productos vendidos</StyledTableCell>
          <StyledTableCell align="center">Total de venta</StyledTableCell>
          <StyledTableCell align="center">Productos en Almacen</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>

      {dataList.length>0 && (
        dataList.map((item) => (
          <StyledTableRow key={item.id}>
            <StyledTableCell >{item.name}</StyledTableCell>
            <StyledTableCell  align="center">{item.price.toLocaleString("en-US", { style: "currency", currency: "USD" })}</StyledTableCell>
            <StyledTableCell align="center">{item.quantity}</StyledTableCell>
            <StyledTableCell align="center" >{item.total.toLocaleString("en-US", { style: "currency", currency: "USD" })}</StyledTableCell>
            <StyledTableCell align="center" style={{ color: item.stock <= 0 ? "red" : "inherit" }} >{item.stock}</StyledTableCell>
          </StyledTableRow>
        ))
      )}
      {isLoading && (
        arrayForSkeleton.map((item, index) => (
          <Skeleton sx={{width:"100%"}} key={index} animation="wave" />
        ))
      )}
      </TableBody>


  {total && (
          <TableFooter>
          <TableRow>
            <StyledTableCell style={{fontSize:"28px", color:"red", fontWeight:"bold"}}>Total</StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell> </StyledTableCell>
            <StyledTableCell align="center" style={{fontSize:"28px", color:"red"}}>{total.toLocaleString("en-US", { style: "currency", currency: "USD" })}</StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableFooter>
  )}
    </Table>
  </TableContainer>

  </>
  )
};
export {SellsList}
  {/* <Divider/>

    <Grid   container >
    <Divider orientation="vertical" flexItem />
      <Grid width={"250px"} >
        <p style={{fontSize:"2.4rem"}}>Nombre</p>
      </Grid>
      <Divider orientation="vertical" flexItem />
      <Grid width={"250px"} >
        <p style={{fontSize:"2.4rem"}}>Precio</p>
      </Grid>
      <Divider orientation="vertical" flexItem />
      <Grid width={"250px"} >
        <p style={{fontSize:"2.4rem"}}>productos vendidos</p>
      </Grid>
      
      <Divider orientation="vertical" flexItem />
      <Grid width={"250px"} >
        <p style={{fontSize:"2.4rem"}}>Total de venta</p>
      </Grid>

      <Divider orientation="vertical" flexItem />
      <Grid width={"250px"} >
        <p style={{fontSize:"2.4rem"}}>Productos en Almacen</p>
      </Grid>


      <Divider orientation="vertical" flexItem />
    </Grid> */}

    // <SellCellItem
    //       inStock={item.stock}
    //       name={item.name}
    //       price={item.price}
    //       quantityOfProductsSold={item.quantity}
    //       sells={item.total}
    //       key={item.id}
    //       id={item.id}
    //       />


  //   <><Divider /><Grid container>
  //   <Divider orientation="vertical" flexItem />
  //   <Grid width={"250px"}>
  //     <p style={{ fontSize: "2.4rem" }}>Total </p>
  //   </Grid>
  //   <Divider orientation="vertical" flexItem />
  //   <Grid width={"250px"}>
  //   </Grid>
  //   <Divider orientation="vertical" flexItem />
  //   <Grid width={"250px"}>

  //   </Grid>

  //   <Divider orientation="vertical" flexItem />
  //   <Grid sx={{ display: "flex", justifyContent: "center" }} width={"250px"}>
  //     <p style={{ fontSize: "2.4rem", color: "red" }}>$ {total}</p>
  //   </Grid>

  //   <Divider orientation="vertical" flexItem />
  //   <Grid width={"250px"}>

  //   </Grid>


  //   <Divider orientation="vertical" flexItem />
  // </Grid><Divider /></>