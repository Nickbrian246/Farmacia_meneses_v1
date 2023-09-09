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
  path:"/home",
  description:"home element",
  element:<Home  path="/" />,
  status:false,
  title:"home"
  },
{
  path:"/reportes/:optionId",
  description:"Reports element",
  element:<Reports  path="/reportes/:opitonId" />,
  status:false,
  title:"reportes"
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