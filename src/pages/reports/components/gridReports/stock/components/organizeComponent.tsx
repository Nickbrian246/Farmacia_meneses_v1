import { Box, Button, Checkbox, FormControlLabel, FormGroup, Menu, MenuItem, Stack, Typography } from "@mui/material";
type OptionSelections = "quantity"| "price"|"pieces"|"default" ;
interface Props {
  menuOptionSelected:string,
  handleOptionSelected:(option:OptionSelections)=> void,
  FromHighestToLowest:boolean,
  isOptionSelected:boolean,
  handleCheckFromLowestToHighest:(event: React.ChangeEvent<HTMLInputElement>)=> void,
  handleCheckFromHighestToLowest: (event: React.ChangeEvent<HTMLInputElement>)=> void,
  handleClick:(event: React.MouseEvent<HTMLButtonElement>)=>void
  open:boolean,
  anchorEl:null | HTMLElement,
  handleClose:()=>void,
  FromLowestToHighest:boolean

}


const Organize = (props :Props) => {
  const {
      FromHighestToLowest,
      handleCheckFromHighestToLowest,
      handleCheckFromLowestToHighest,
      handleOptionSelected,
      isOptionSelected,
      menuOptionSelected,
      handleClick,
      open,
      anchorEl,
      handleClose,
      FromLowestToHighest,
      } = props 

  return  (
  <>
    <Stack sx={{display:"flex", minWidth:"800px", flexDirection:"row", bgcolor:"#EDF5BA", borderRadius:"5px", height:"42px"}}>
      <Typography  style={{alignSelf:"center",marginLeft:"5px"}}>Organizar por :</Typography>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={{width:"310px", textDecoration:"underline"}}
        >
          {menuOptionSelected ==="pieces" && "Articulos por paquete"
          || menuOptionSelected ==="price" && "Precio"
          || menuOptionSelected ==="quantity" && "Cantidad en Stock"
          || menuOptionSelected ==="default" && "Seleccione una opcion"
          }
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem
          onClick={()=>{ 
            handleClose;
            handleOptionSelected("price")}
            }>
              Precio
          </MenuItem>
          <MenuItem
          onClick={()=>{
                handleClose;
                handleOptionSelected("pieces")}
            }>
              Articulos por paquetes
            </MenuItem>
          <MenuItem
          onClick={()=>{
            handleClose;
            handleOptionSelected("quantity")}}
            >
              cantidad en stock
          </MenuItem>
        </Menu>
        <Box>
          <FormGroup sx={{display:"flex", flexDirection:"row"}}>
            <FormControlLabel
              control={
              <Checkbox
                checked={FromHighestToLowest}
                disabled={isOptionSelected}
                onChange={handleCheckFromHighestToLowest}
              />}
            label="De mayor a menor"
            />
            <FormControlLabel
              control={
              <Checkbox 
                checked={FromLowestToHighest} 
                disabled={isOptionSelected} 
                onChange={handleCheckFromLowestToHighest}
              />
              } label="De menor a mayor" />
          </FormGroup>
        </Box>
      </Stack>

  </>
  )
}
export {Organize}