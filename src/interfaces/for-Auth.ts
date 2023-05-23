
export type Role= "employee"| "admin" | "master"
export default interface RegisterUser {
name:string,
age:number ,
state:string,
email:string,
password:string,
howManyBusinessHasWithUs?:number
role:"employee"| "admin" | "master"
}
interface UserLogIn{
  email:string,
  password:string

}
interface UserLogged{
  name:string,
  clientId:string,
  role:[Role], 
  token:string
}
interface UserFromBackEnd {
  name:string,
  _id:string
}
interface ResponseApiUser {
  token:string,
  user:UserFromBackEnd,
  role:[Role]
}

interface ResponseAuthFromBackEnd {
  data:ResponseApiUser
}
export type  {UserLogIn,UserLogged,UserFromBackEnd,ResponseAuthFromBackEnd}