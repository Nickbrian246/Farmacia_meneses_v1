import { DynamicSearch } from "./for-searchInterface";

const adapterForDynamicSearch = ( id:string):DynamicSearch=>{
  const payload:DynamicSearch= {id,}
  return payload
}
export {adapterForDynamicSearch}