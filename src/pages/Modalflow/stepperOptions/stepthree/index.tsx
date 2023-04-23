import {AddMedicine} from "../../../forms/addMedicine"
interface Props {
    selectedOption:string
}


const StepperForms = (props:Props) => {
    const { selectedOption} = props
    
    return(
        <>
        <AddMedicine/>
        </>
    )
}
export {StepperForms}