import { Stack } from "@mui/material";
import { ReactNode } from "react";



interface Props{
  Children?:ReactNode,
  text:string,
  whatIsThisFor:string,
  width:string,
  fontSize:string,
  height:string,
  background:string,
  elementId:string,
  handleOptionSelected: (optionSelected:string) => string| void,
}



const OptionsElement=(props:Props) => {
const {
  fontSize,
  handleOptionSelected,
  text,
  whatIsThisFor,
  width,
  Children,
  height,
  background,
  elementId,
}= props

const handleClick=(id:string)=> {
  handleOptionSelected(id)
}
  return (
    <>
    <Stack>
      <button
      onClick={()=> {handleClick(elementId)}}
      style={{
        width:`${props.width}`,
        height:`${props.height}`,
        border:"none",
        borderRadius:"5px",
        background:`${props.background}`,
        cursor:"pointer"

        }}>
        <p
        style={{
          fontSize:`${props.fontSize}`
          }}
          >
          {props.text}
        </p>
      </button>

    </Stack>
    
    </>
  )
};

export {OptionsElement}