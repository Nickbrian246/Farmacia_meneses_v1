
export type Role= "employee"| "admin" | "master"
export default interface RegisterUser {
name:string,
age:number,
state:string,
email:string,
password:string,
howManyBusinessHasWithUs:number
role:"employee"| "admin" | "master"
}
