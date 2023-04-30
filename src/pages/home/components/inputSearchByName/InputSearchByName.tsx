import TextField from '@mui/material/TextField';
import { ChangeEvent,  useEffect,  useState } from 'react';
import { useBookMedicineByName } from '../../../../hooks/useBookMedicineByName';
import { InputListByName } from './list/InputListByName';
import CircularProgress from '@mui/material/CircularProgress';
import "./inputSerachByName.css"

interface Props{
    getIdFromInputByName?: (id:string) => string;
}

function InputSearchByName(props:Props) {
    const { getIdFromInputByName} = props
    const [name, setName] = useState<string>("");
    const [elementSelected, setElementSelected] = useState<string>("")
    const [closeList, setCloseList] = useState<boolean>(false)
    const {
        elements,
        loading}=useBookMedicineByName(name, name)    
    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };
    useEffect(()=>{
        
    getIdFromInputByName?.(elementSelected)
    }, [elementSelected])

    return (
        <>
        <section>
        <TextField
        style={{width:"400px", background:"white",minHeight:"40px"}}
        label="escriba el nombre "
        value={name}
        onChange={handleInput}
        onClick={()=> setCloseList(false)}
    />
    {(elements.length !=0 && typeof(elements) != "string" && closeList === false) && (
        <div className='InputlistContainer' >
            {elements.map((item:any) => (
            <InputListByName
            _id={item._id}
            name={item.name}
            setElementSelected={setElementSelected}
            key={item._id}
            setCloseList={setCloseList}
            setName={setName}
            />
        ))}
        </div>)}
        {(typeof(elements)==="string") && (
        <div className='InputlistContainer' >
            <strong>{elements}</strong>
        </div>)}
        {(loading) && (
        <div className='InputlistContainer' >
            <span>
                <strong>
                    Cargando...
                </strong>
                <CircularProgress color='info'
                />
            </span>
        </div>)}
        </section>

        </>
    )
}
export {InputSearchByName}
