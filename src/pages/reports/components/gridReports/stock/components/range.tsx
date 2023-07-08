import { useDispatch } from "react-redux";
import { Box, Button, ButtonGroup, ClickAwayListener, Grow, Menu, MenuItem, MenuList, Paper, Popper, Stack ,Typography} from "@mui/material"
import { ChangeEvent, useRef, useState } from "react";
import { setErrorMessage } from "../../../../../../store/slices/globalErrorMessage/globalErrorMessage";
import { v4 as uuidd} from "uuid"
import {TiDelete} from "react-icons/ti";

interface Ranges{
startRange:number,
endRange:number
color:string,
id:string
}
type OptionSelections = "quantity"| "price"|"pieces"|"default" ;
interface Props{
  rangesSelected:Ranges[],
  setRangesSelected: React.Dispatch<React.SetStateAction<Ranges[]>>,
  isOptionSelected:boolean,
  unMarkRowColor:(topRange: number, bottomRange: number, reference: OptionSelections)=> void,
  menuOptionSelected:OptionSelections
}


const Range = (props:Props) => {
  const {
    rangesSelected,
    setRangesSelected,
    isOptionSelected,
    unMarkRowColor,
    menuOptionSelected,
  } = props
  const [startRangeNumber, setStartRangeNumber] = useState<string >("")
  const [endRangeNumber, setEndRangeNumber] = useState<string>("")

  const [colorSelected, setColorSelected] = useState("")
  const [anchorSelectColor, setAnchorSelectColor] = useState<null | HTMLElement>(null);

  const dispatch =  useDispatch()


  const openMenuSelectColor = Boolean(anchorSelectColor);

  const handleClickSelectColor = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorSelectColor(event.currentTarget);
  };

  const handleCloseSelectColor = () => {
    setAnchorSelectColor(null);

  };
  const handleStartInputRangeNumber = (event: ChangeEvent<HTMLInputElement>)=> {
    setStartRangeNumber(event.target.value)
  }
  const handleEndInputRangeNumber = (event: ChangeEvent<HTMLInputElement>)=> {
    setEndRangeNumber(event.target.value)
  }
  const handleFilterBtn = ():void => {
    let error:boolean = false; 
    
    if(startRangeNumber && endRangeNumber ){// reviso que las propiedades sean differences de null
      if (parseFloat(endRangeNumber) < parseFloat(startRangeNumber) ) {//reviso que el rango superior sea mayor que el rango inferior
        dispatch(setErrorMessage({
          errorMessage:`el limite superior debe  ${endRangeNumber} debe ser mayor a ${startRangeNumber}`,
          errorMessageBold:`"Hasta" debe ser mayor que " Desde"`,
          isError:true,
          severityType:"error",
          title:"Error al seleccionar limite superior",
          duration:5000
        })) 
        error = true
        
      }
      rangesSelected.forEach((item) => {
        if (item.startRange ===  parseFloat(startRangeNumber)|| item.endRange === parseFloat(endRangeNumber) ) {
          dispatch(setErrorMessage({
            errorMessage:`los rangos ${startRangeNumber} y ${endRangeNumber} ya existen `,
            errorMessageBold:`No se permiten rangos repetidos`,
            isError:true,
            severityType:"error",
            title:"Error en los parametros de rangos",
            duration:5000
          })) 
          error = true
        }
        if (item.color === colorSelected) {
          dispatch(setErrorMessage({
            errorMessage:`el color ${colorSelected === "#ff0000"
            ? "Rojo"
            : colorSelected === "#008000"
            ? "Verde"
            : colorSelected === "#ffff00"
            ? "Amarillo"
            : "Elegir color"
            } ya habia sido seleccionado  `,
            errorMessageBold:`ha elegido un color repetido `,
            isError:true,
            severityType:"warning",
            title:" Advertencia Color Repetido",
            duration:5000
          })) 
        }
        if (item.startRange === parseFloat(startRangeNumber) ) {
          dispatch(setErrorMessage({
            errorMessage:`el limite inferior de ${startRangeNumber} ya fue usado`,
            errorMessageBold:`No se permiten limites repetidos repetidos`,
            isError:true,
            severityType:"error",
            title:"Error al seleccionar limite inferior",
            duration:5000
          })) 
          error = true
          
        }
        if (item.endRange === parseFloat(endRangeNumber) ) {
          dispatch(setErrorMessage({
            errorMessage:`el limite superior de ${endRangeNumber} ya fue usado`,
            errorMessageBold:`No se permiten limites repetidos repetidos`,
            isError:true,
            severityType:"error",
            title:"Error al seleccionar limite superior",
            duration:5000
          })) 
          error = true
          
        } 
        if ( parseFloat(endRangeNumber)  <= item.endRange && parseFloat(startRangeNumber)  >= item.startRange  ) {
          dispatch(setErrorMessage({
            errorMessage:` los rangos ${startRangeNumber} y ${endRangeNumber} estan dentro del rango ${item.startRange} y ${item.endRange} usados previamente `,
            errorMessageBold:`No se permiten limites que esten Dentro de otros limites`,
            isError:true,
            severityType:"error",
            title:"Error al seleccionar limites",
            duration:8000
          })) 
          error = true
          
        } 
      })

      if(error) return
      const obj:Ranges = {
        startRange:parseFloat(startRangeNumber),
        endRange:parseFloat(endRangeNumber),
        color:colorSelected,
        id:uuidd()
          }
          const newArr = [...rangesSelected,obj]
          setRangesSelected(newArr)
    }
    
    setColorSelected("")
    setStartRangeNumber("")
    setEndRangeNumber("")
  }

const handleDelete =(id:string)=> {
  const found = rangesSelected.find((item)=>{
    return item.id === id
  })
  if(found){
    const top= found.startRange
    const bottom = found.endRange
    unMarkRowColor(top, bottom,menuOptionSelected)
  }
  const itemDelete =  rangesSelected.filter((item)=> item.id !== id)
  setRangesSelected(itemDelete)
}

  return (
    <>
    <Stack sx={{display:"flex", maxWidth:"560px",flexDirection:"row",flexWrap:"wrap",height:"200px", flexFlow:"column", gap:"20px"}}>
      <Stack sx={{display:"flex", flexDirection:"row", height:"42px", maxWidth:"560px"}}>
      <Typography sx={{alignSelf:"center"}}>Filtrar por Rangos:</Typography>
      <Typography sx={{alignSelf:"center", m:"2px"}}>Desde: </Typography>
      

      <input
      disabled={isOptionSelected}
      type="number"
        // @ts-ignore
      value={startRangeNumber}
      
      onChange={handleStartInputRangeNumber}
      style={{
        width:"80px",
        borderTop:"none",
        borderRight:"none",
        borderLeft:"none",
        textAlign:"center"
      }}
      placeholder="0"
      />
      <Typography sx={{alignSelf:"center", m:"2px"}}>Hasta: </Typography>
      

      <input
      disabled={isOptionSelected}
      type="number"
        // @ts-ignore
      value={endRangeNumber}
      
      onChange={handleEndInputRangeNumber}
      style={{
        width:"80px",
        borderTop:"none",
        borderRight:"none",
        borderLeft:"none",
        textAlign:"center"
      }}
      placeholder="0"
      />
        <Button onClick={handleClickSelectColor}
        sx={{width:"130px"}}
        disabled={isOptionSelected}
        >
        {colorSelected === "#d50000"
        ? "Rojo"
        : colorSelected === "#008000"
        ? "Verde"
        : colorSelected === "#ff9800"
        ? "Amarillo"
        : "Elegir color"
        }
        </Button>

        <Menu
          id="basic-menu"
          anchorEl={anchorSelectColor}
          open={openMenuSelectColor}
          onClose={handleCloseSelectColor}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem
          sx={{display:"flex" , justifyContent:"space-between"}}
          onClick={()=>{ 
            setColorSelected("#d50000")
            handleCloseSelectColor();
            }
            }> 
            rojo <div style={{width:"10px",background:"#d50000", height:"10px", borderRadius:"100%"}}></div>
          </MenuItem>
          <MenuItem
          sx={{display:"flex" , justifyContent:"space-between"}}
          onClick={()=>{
            setColorSelected("#008000")
            handleCloseSelectColor();
            }
            }>
            verde <div style={{width:"10px",background:"green", height:"10px", borderRadius:"100%"}}></div>
            </MenuItem>
          <MenuItem
          sx={{display:"flex" , justifyContent:"space-between", width:"120px"}}
          onClick={()=>{
            setColorSelected("#ff9800")
            handleCloseSelectColor();
            }
            }>
            Amarillo <div style={{width:"10px",background:"#ff9800", height:"10px", borderRadius:"100%"}}></div>
            </MenuItem>
        </Menu>
        <Button 
        disabled={isOptionSelected}
        onClick={handleFilterBtn}
        variant="contained"
        >
          Filtrar
        </Button>
      </Stack>
      <Box sx={{maxHeight:"100px",overflow:"auto"}}>
        {rangesSelected.map((item)=>(
          <Box sx={{display:"flex", alignItems:"center", gap:"2px", Width:"400px", border:"1px solid gray", borderRadius:"5px", margin:"3px",  padding:"1px"}} key={item.id} >
            <Typography>Rango: desde {item.startRange} hasta</Typography>
            <Typography sx={{color:item.color,  fontWeight:"bold"}}>  {item.endRange}</Typography>
            <Typography>, se pintaran en color </Typography>
            <Box sx={{width:"20px",background:item.color, height:"20px", borderRadius:"5px"}}></Box>
            <button onClick={()=> {handleDelete(item.id)}} style={{background:"none",border:"none",padding:"0", cursor:"pointer", width:"30px"}}><TiDelete style={{fontSize:"25px", display:"flex", color:"red"}}/></button>
          </Box>
        ))}
      </Box>

    </Stack>
    </>
  )
}

export {Range}
{/* <Menu
<Button sx={{width:"120px"}} onClick={handleClickRangeMenu}>{openMenuForChooseGraterOrLess ? openMenuForChooseGraterOrLess :"Seleccione"} </Button>
id="basic-menu"
anchorEl={anchorEl}
open={openMenu}
onClose={handleCloseRangeMenu}
MenuListProps={{
  'aria-labelledby': 'basic-button',
}}
>
<MenuItem
onClick={()=>{ 
  setOpenMenuForChooseGraterOrLess("Mayor que >")
  handleCloseRangeMenu();
  }
  }>
    Mayor que {">"}
</MenuItem>
<MenuItem
onClick={()=>{
  setOpenMenuForChooseGraterOrLess("Menor que <")
  handleCloseRangeMenu();
  }
  }>
    Menor que {"<"}
  </MenuItem>
</Menu> */}
// dispatch(setErrorMessage({
//   errorMessage:"Por favor revise que haya seleccionado todos los campos necesarios para filtrar por rangos",
//   errorMessageBold:"error en Rangos",
//   isError:true,
//   severityType:"error",
//   title:"Error al seleccionar los parametros de rangos",
//   duration:5000
// })) 
// }