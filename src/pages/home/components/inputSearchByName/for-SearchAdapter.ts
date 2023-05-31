import { DynamicSearch } from "./for-searchInterface";

const adapterForDynamicSearch =( id:DynamicSearch):DynamicSearch=>{
  const payload= {
    id:id
  }
  return payload
}
export {adapterForDynamicSearch}