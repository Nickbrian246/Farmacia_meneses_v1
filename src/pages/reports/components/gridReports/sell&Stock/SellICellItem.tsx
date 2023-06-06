import {  Divider, Grid } from "@mui/material"

interface Props{
  name:string,
  price:number,
  sells:number,
  inStock:number,
  quantityOfProductsSold:number,
  date?:string,
  id:string | undefined
}

const SellCellItem=(props:Props)=> {
  const {
    inStock,
    name,
    price,
    sells,
    quantityOfProductsSold,
    date
        }= props
        let priceWithFormat = price.toLocaleString("en-US", { style: "currency", currency: "USD" });
        let sellsWithFormat= sells.toLocaleString("en-US", { style: "currency", currency: "USD" })
  return(
    <>
      <Divider/>
    <Grid   container >
    <Divider orientation="vertical" flexItem />
      <Grid sx={{display:"flex", justifyContent:"center"}} width={"250px"} >
        <p
        style={{
          fontSize:"2rem",
          display:"inline-block",
          justifySelf:"center"
        }}
        >
          {name}
        </p>
      </Grid>

      <Divider orientation="vertical" flexItem />

      <Grid sx={{display:"flex", justifyContent:"center"}} width={"250px"} >
        <p
        style={{
          fontSize:"2rem"
          }}
          >
            {priceWithFormat}
        </p>
      </Grid>

      <Divider orientation="vertical" flexItem />

      <Grid sx={{display:"flex", justifyContent:"center"}} width={"250px"}   >
        <p
        style={{
          fontSize:"2rem"
          }}
          >
            {quantityOfProductsSold}
        </p>
      </Grid>
      <Divider orientation="vertical" flexItem />

      <Grid sx={{display:"flex", justifyContent:"center"}} width={"250px"}  >
        <p
        style={{
          fontSize:"2rem"
          }}
          >
            {sellsWithFormat}
        </p>
      </Grid>


      <Divider orientation="vertical" flexItem />

      <Grid sx={{display:"flex", justifyContent:"center"}} width={"250px"}   >
        <p
        style={{
          fontSize:"2rem"
          }}
          >
            {inStock}
        </p>
      </Grid>

      <Divider orientation="vertical" flexItem />
      {date && (
              <Grid width={"250px"}  >
              <p>{date}</p>
            </Grid>
      )}
    </Grid>


    
    </>
  )
}
export {SellCellItem}