import React from "react"
import { Home } from "../pages/home"
import { Reports } from "../pages/reports"
import AuthForms from "../pages/authForms"



interface RouterList{
  path:string,
  title:string,
  description:string,
  status:boolean,
  element: React.ReactElement
}


const routerPrivateList :RouterList[]= [
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
  {
    path:"/LogIn",
    description:"Reports element",
    element:<AuthForms  path="/LogIn" />,
    status:false,
    title:"LogIn"
  },
  {
    path:"/Register",
    description:"Reports element",
    element:<AuthForms  path="/Register" />,
    status:false,
    title:"LogIn"
    },
]
const routerPublicList :RouterList[]= [
  {
    path:"/LogIn",
    description:"Reports element",
    element:<AuthForms  path="/LogIn" />,
    status:false,
    title:"LogIn"
  },
  {
    path:"/Register",
    description:"Reports element",
    element:<AuthForms  path="/Register" />,
    status:false,
    title:"LogIn"
    },
]
export {routerPrivateList,routerPublicList}