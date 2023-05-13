import React from "react"
import { Home } from "../pages/home"
import { Reports } from "../pages/reports"



interface RouterList{
  path:string,
  title:string,
  description:string,
  status:boolean,
  element: React.ReactElement
}


const routerList :RouterList[]= [
  {
  path:"/Home",
  description:"home element",
  element:<Home  path="/" />,
  status:false,
  title:"home"
  },
  {
    path:"/Reports",
    description:"Reports element",
    element:<Reports  path="/Reports" />,
    status:false,
    title:"home"
    },
]
export {routerList}