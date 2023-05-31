import TextField from '@mui/material/TextField';
import { ChangeEvent,  useEffect,  useState } from 'react';
import { useBookMedicineByName } from '../../../../hooks/useBookMedicineByName';
import { InputListByName } from './list/InputListByName';
import CircularProgress from '@mui/material/CircularProgress';
import "./inputSerachByName.css"
import { fetchItemById } from '../../../../fetch/fetchMedicines/fetchMedicines';
import {setCartItems  } from "../../../../store/slices/home/ProductCart";
import {useDispatch} from "react-redux";
import {getProductById} from"../../../../services/dashboard-api/adapters/driven/getProduct-api"
import { adaptingDataForCartList } from '../../../../services/dashboard-api/adapters/cartListAdapter/cartListAdapter';
import { useSelector } from 'react-redux';

interface Props{
    getIdFromInputByName?: (id:string) => string;
    isforCartlist?:boolean
}

function InputSearchByName(props:Props) {
    const { getIdFromInputByName,isforCartlist} = props
    const dispatch= useDispatch()
    const [name, setName] = useState<string>("");
    const [elementSelected, setElementSelected] = useState<string>("")
    const [closeList, setCloseList] = useState<boolean>(false)
    const {
        elements,
        loading,
        errorMessage,
        isError,
        setIsError,
    }=useBookMedicineByName(name, name) 
    const token = useSelector((state:any) => state.loggedUser.token)
 
    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };
    // diferenciar hacia donde manda la info
    useEffect(()=>{ 
        console.log(elementSelected)
        if(elementSelected ==="") return
        getIdFromInputByName?.(elementSelected)
        if (isforCartlist) {
            getProductById(elementSelected,token)
            .then((response) => {
                let cartInterface= adaptingDataForCartList(response.data)
                dispatch(setCartItems(cartInterface))
            })
        }
        setElementSelected("")
    }, [elementSelected])
    const handleOnBlur=()=>{
        setIsError(false)
    }

    return (
        <>
        <section  onBlur={handleOnBlur}>
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
        {(isError) && (
        <div className='InputlistContainer' >
            <span>
                <strong>
                    {errorMessage}
                </strong>
            </span>
        </div>)}
        </section>

        </>
    )
}
export {InputSearchByName}
