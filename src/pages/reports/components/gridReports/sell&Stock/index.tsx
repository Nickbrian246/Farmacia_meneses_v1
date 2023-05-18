import { useEffect, useState } from "react";
import { getAllProducts } from "../../../../../services/dashboard-api/adapters/driven/getProduct-api";
import { SellCellItem } from "./SellICellItem";
import { ModelData } from "../../../../../services/dashboard-api/adapters/interfaces/productInterface";
import { Divider, Grid, Skeleton, Stack } from "@mui/material";



const Sells=()=>{
  const[loading, setLoading] = useState<boolean>(false)
  const [productFetched, setProductsFetched]= useState<ModelData []>([])
  
  let arrayForSkeleton=  new Array(20).fill("h") 
useEffect(()=>{
  setLoading(true)
  getAllProducts()
  .then((response)=> {
    setProductsFetched(response.data)
    setLoading(false)
  })
  .catch((error)=> {console.log(error)})
},[])

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
        <p style={{fontSize:"2.4rem"}}>Ventas</p>
      </Grid>
      <Divider orientation="vertical" flexItem />
      <Grid width={"250px"} >
        <p style={{fontSize:"2.4rem"}}>Productos en Almacen</p>
      </Grid>


      <Divider orientation="vertical" flexItem />
    </Grid>

    {loading && (
      arrayForSkeleton.map((item) => (
        <Skeleton animation="wave" />
      ))
    )}
  {productFetched.length>0 && (
    productFetched.map((item) => (
      <SellCellItem
      inStock={item.quantity}
      name={item.name}
      price={item.price}
      sells={item.price}
      key={item._id}
      id={item._id}
      />
    ))
  )}
  <Divider/>
  </Stack>

  </>
  )
};
export {Sells}