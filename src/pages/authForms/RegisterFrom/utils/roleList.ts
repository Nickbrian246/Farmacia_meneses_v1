import { Role } from "../../../../interfaces/for-Auth";
interface RoleList {
  label:string,
  value:Role
}

export const roles: RoleList[] = [
  { label: "empleado", value:"employee" },
  { label: "administrador", value:"admin" },
  { label: "maestro", value:"master" },

];
