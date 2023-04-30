
import "./inputList.css"

interface Props {
    name:string,
    _id:string,
    setElementSelected: React.Dispatch<React.SetStateAction<string>>,
    setItemsList: React.Dispatch<React.SetStateAction<boolean>>

}
const InputListByName= (props:Props) => {
    const {name, _id, setElementSelected, setItemsList} = props
    return (
        <>
            <p 
            className="Inputlist" 
            onClick={ ()=> {
                setItemsList(true);
                setElementSelected(_id);
            }}
            >
            {name}
            </p>
        </>
    )
}

export { InputListByName}