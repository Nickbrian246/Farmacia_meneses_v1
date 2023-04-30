
import "./inputList.css"

interface Props {
    name:string,
    _id:string,
    setElementSelected: React.Dispatch<React.SetStateAction<string>>,
    setCloseList: React.Dispatch<React.SetStateAction<boolean>>,
    setName: React.Dispatch<React.SetStateAction<string>>

}
const InputListByName= (props:Props) => {
    const {
        name,
        _id,
        setElementSelected,
        setCloseList,
        setName,
    } = props
    return (
        <>
            <p 
            className="Inputlist" 
            onClick={ ()=> {
                setCloseList(true);
                setElementSelected(_id);
                setName("")
            }}
            >
            {name}
            </p>
        </>
    )
}

export { InputListByName}