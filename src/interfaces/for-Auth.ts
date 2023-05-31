
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
  token:string
}
interface UserFromBackEnd {
  name:string,
  token:string
}
interface ResponseApiUser {
  token:string,
  user:UserFromBackEnd,
}

interface ResponseAuthFromBackEnd {
  data:ResponseApiUser
}
export type  {UserLogIn,UserLogged,UserFromBackEnd,ResponseAuthFromBackEnd}