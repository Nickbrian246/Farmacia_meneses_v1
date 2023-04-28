
import "./inputList.css"

interface Props {
    name:string,
    _id:string,
    setElementSelected: React.Dispatch<React.SetStateAction<string>>,

}
const InputListByName= (props:Props) => {
    const {name, _id, setElementSelected} = props
    return (
        <>
            <p 
            className="Inputlist" 
            onClick={ ()=> {setElementSelected(_id)}}
            >
            {name}
            </p>
        </>
    )
}

export { InputListByName}