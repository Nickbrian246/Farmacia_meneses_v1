import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import Dialog from '@mui/material/Dialog';
import { Button, DialogTitle } from '@mui/material';
import { DateRange } from '@mui/x-date-pickers-pro';
import 'dayjs/locale/es';
import { useNavigate } from 'react-router-dom';

const today = dayjs();
const twoPM = dayjs().set('hour', 14).startOf('hour');
const threePM = dayjs().set('hour', 15).startOf('hour'); 
interface Props {
    setIsOpenModal:React.Dispatch<React.SetStateAction<boolean>>,
    setIsDatePickerOpen:React.Dispatch<React.SetStateAction<boolean>>,
}

    function DatePicker(props:Props) {
        const navigate = useNavigate()
        const [open, setOpen] = React.useState(true);
        const [isDateSelected, setDateSelected] = React.useState<boolean>(false)
        const [value, setValue] = React.useState<DateRange<Dayjs>>([
            dayjs('2023-04-17'),
            dayjs('2023-04-21'),
        ]);
        const {
            setIsDatePickerOpen,
            setIsOpenModal
        } = props
        

        const handleClickOpen = () => {
            setOpen(true);
        };
    
        const handleClose = () => {
            setOpen(false);
        }; 
        const handleSearchBtn = () =>{
            setIsDatePickerOpen(true)
            setIsOpenModal(false)
            navigate(`/reportes/personalized?startDate=${startDate?.format('YYYY-MM-DD')}&endDate=${endDate?.format('YYYY-MM-DD')}`)
        }
        const [startDate, endDate] = value;

        // console.log('Start Date:', startDate?.format('YYYY-MM-DD'));
        // console.log('End Date:', endDate?.format('YYYY-MM-DD'));       

return (
    <Dialog sx={{top:"-250px"}}  onClose={handleClose} open={open}>
    <div style={{padding:"10px"}}>
        <DialogTitle sx={{textAlign:"center"}}>Elija los rangos de fechas</DialogTitle>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                <DateRangePicker
                value={value}
                onChange={(newValue) => {
                    setValue(newValue),
                    setDateSelected(true)}}
                />
            </LocalizationProvider>
            <Button
            disabled = {!isDateSelected}
            sx={{width:"200px", margin:"21px"}}
            variant='contained'
            onClick={()=>{
                handleSearchBtn()
            }}
            >
                Buscar
            </Button>
    </div>
    </Dialog>
);
}
export {DatePicker}