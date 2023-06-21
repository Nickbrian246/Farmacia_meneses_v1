import { useEffect, useState } from "react";
import { SellCellItem } from "./SellICellItem";
import { ModelData } from "../../../../../services/dashboard-api/adapters/interfaces/productInterface";
import { Divider, Grid, Skeleton, Stack } from "@mui/material";
import { addedStockToListNetSales } from "../../../interfaces";

interface Props{
  isLoading:boolean,
  dataList: addedStockToListNetSales[],
  total :number |null
}


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
  <Stack useFlexGap sx={{p:5}}>
  <Divider/>

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
    </Grid>

    {isLoading && (
      arrayForSkeleton.map((item, index) => (
        <Skeleton key={index} animation="wave" />
      ))
    )}
  {dataList.length>0 && (
    dataList.map((item) => (
      <SellCellItem
      inStock={item.stock}
      name={item.name}
      price={item.price}
      quantityOfProductsSold={item.quantity}
      sells={item.total}
      key={item.id}
      id={item.id}
      />
    ))
  )}
  {total && (
        <><Divider /><Grid container>
            <Divider orientation="vertical" flexItem />
            <Grid width={"250px"}>
              <p style={{ fontSize: "2.4rem" }}>Total </p>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid width={"250px"}>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid width={"250px"}>

            </Grid>

            <Divider orientation="vertical" flexItem />
            <Grid sx={{ display: "flex", justifyContent: "center" }} width={"250px"}>
              <p style={{ fontSize: "2.4rem", color: "red" }}>$ {total}</p>
            </Grid>

            <Divider orientation="vertical" flexItem />
            <Grid width={"250px"}>

            </Grid>


            <Divider orientation="vertical" flexItem />
          </Grid><Divider /></>
  )}

  </Stack>

  </>
  )
};
export {SellsList}