import "./index-SelectedProduct.css"
import {CardSelectedProduct} from "./card-SelectedProduct/Card-selectedProduc";
import {useSelector} from"react-redux"
import { Button } from "@mui/material";
import { SaleModal } from "../../../modals/saleModal/SaleModal";
import { useState } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch } from "react-redux";
import {AiOutlinePlus} from "react-icons/ai";
import{AiOutlineMinus} from "react-icons/ai";
import {MdDelete} from "react-icons/md";
import { addIndividualProduct,decreaseIndividualProduct ,deleteItem} from "../../../../../store/slices/home/ProductCart";
    interface Item {
        name:string,
        price:number,
        quantity:number,
        total:number,
        id:string
    }
    interface State {
        shoppingCartReducer:shoppingCartReducer
    }
    interface shoppingCartReducer {
        shoppingCart: Item[]
    }
const SelectedProductList=()=>{ 
    const[ isOpenSaleModal, setIsOpenSaleModal] = useState<boolean>(false)
    const data = useSelector((state:State)=> state.shoppingCartReducer.shoppingCart);
    const dispatch = useDispatch();

    const total = data.map((item:Item) => {
        let money = 0
        return money+= item.total
    });

    let sum = total.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
    },0);

    const handleOpenSaleModal=()=> {
        setIsOpenSaleModal((prevState) => !prevState)
    }

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
        }));

        const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
        }));
    const handleDeleteItem=(id:string) => {
        dispatch(deleteItem(id))
    }
    const handleAddClick= (id:string) => {
        dispatch(addIndividualProduct(id))
    }
    const handleDecreaseClick=(id:string)=> {
        dispatch(decreaseIndividualProduct(id))
    }
    const btnStyles = {
        background:"none",
        border:"none",
        color:"red",
        fontSize:"18px",
        cursor:"pointer",
    }

    return (
        <>
    <div style={{padding:"10px"}}>
    <TableContainer  component={Paper}>
        <Table sx={{ minWidth: 700,}} aria-label="customized table">
        <TableHead >
            <TableRow>
            <StyledTableCell align="left">Eliminar</StyledTableCell>
            <StyledTableCell align="left">Productos</StyledTableCell>
            <StyledTableCell align="left">Precio</StyledTableCell>
            <StyledTableCell align="center">Cantidad </StyledTableCell>
            <StyledTableCell align="center">Total</StyledTableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {data.map((row) => (
            <StyledTableRow key={row.name}>
                <StyledTableCell align="left">
                    <button onClick={()=>{handleDeleteItem(row.id)}} style={{...btnStyles}}>
                        <MdDelete/>
                    </button>
                </StyledTableCell>
                <StyledTableCell align="left">{row.name}</StyledTableCell>
                <StyledTableCell align="left">{row.price.toLocaleString("es-MX",{style:"currency", currency:"MXN"})}</StyledTableCell>
                <StyledTableCell align="center">
                    <div style={{display:"flex", width:"100%", justifyContent:"center", alignContent:"center"}}>
                        <AiOutlineMinus onClick={()=>{handleDecreaseClick(row.id)}}/>   
                            <div style={{minWidth:"60px"}}>
                                <span style={{verticalAlign:"center"}}>{row.quantity}</span>
                            </div>
                        <AiOutlinePlus 
                            onClick={() =>{handleAddClick(row.id)}}
                        />
                    </div>
                </StyledTableCell>
                <StyledTableCell align="center">
                    <div style={{minWidth:"100px", display:"flex", justifyContent:"center"}}>
                        <span>{`${row.total.toLocaleString("es-MX",{style:"currency", currency:"MXN"})}`}</span>
                    </div>
                </StyledTableCell>
            </StyledTableRow>
            ))}
        </TableBody>    
    </Table>

    </TableContainer>
    <StyledTableRow >
                <StyledTableCell align="left" style={{color:"#f44336"}}>
                    TOTAL:
                </StyledTableCell>
                <StyledTableCell align="left" style={{fontWeight:"bold"}}>
                    {sum.toLocaleString("es-MX",{style:"currency", currency:"MXN"})}
                </StyledTableCell>
                <StyledTableCell align="left" style={{fontWeight:"bold"}}>
                    <Button 
                    onClick={()=>{setIsOpenSaleModal((preState) =>!preState)}}
                    disabled = {sum===0}
                    variant="contained"
                    >
                        PAGAR
                    </Button>
                </StyledTableCell>
    </StyledTableRow>
    </div>
        {isOpenSaleModal && (
            <SaleModal
            handleOpenSaleModal={handleOpenSaleModal}
            total={sum}
            data={data}
            />
        )}
        </>
    )
}
export {SelectedProductList}