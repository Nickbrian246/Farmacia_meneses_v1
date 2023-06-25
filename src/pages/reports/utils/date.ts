import {addDays, format, subDays} from "date-fns"
import { ArraySaleTotalAndDay, DateFormat, SaleModel, Total } from "../interfaces";

export function formatDate(date:string | Date) {
  const today = new Date(date);
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
/**
 * este metodo retorna la fecha correspondiente al dia de ayer
 * @returns fecha de ayer en formato año-mes-dia
 */
export function yesterday (): string{
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const year = yesterday.getFullYear();
  const month = yesterday.getMonth() + 1;
  const day = yesterday.getDate();
  const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

  return formattedDate
}

/**
 * This function returns the first day of the week if no argument is passed.
 * It returns the corresponding day of the week in the format year-month-day,
 * always taking the current week as a reference, starting on Monday.
 * @param dayNumber dia en numero 
 * @returns 
 */
export function weekly(dayNumber?:number){
  let currentDate = new Date(); // obteniendo la fecha actual 
  let currentDay = currentDate.getDay(); // obtengo el dia en formato numero de 0 al 6
  let firstDayOfWeek= dayNumber ?? 1 //starts on monday // si no viene como parametro  lo seteo en 1 es decir  lunes 
  console.log(firstDayOfWeek)
  let differenceInDays = currentDay - firstDayOfWeek; 
    if (differenceInDays < 0) {
      differenceInDays += 7; 
    }
    console.log(differenceInDays);
    
  currentDate.setDate(currentDate.getDate() - differenceInDays); // obtengo el dia del mes actual

  let year = currentDate.getFullYear();
  let month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
  let day = ("0" + currentDate.getDate()).slice(-2);
  return year + "/" + month + "/" + day;

}

/**
 * This function returns an array of dates from the first day of the week to the current day.
 * It receives the date of the first day of the week as a parameter.
 * @param fromDate pasa formato fecha en string y formato AÑO / MES  / DIA
 * @returns 
 */
export function getArrayOfDates(fromDate:string): string[]{
  let formattedDate = fromDate.split("-").join("/")
  const date = new Date (formattedDate)
  const day = date.getDay()

  if(day === 1) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const dateFormatted= `${year}-${month}-${day}`;
    return new Array(dateFormatted)
  }
  let difference = 1 - day
  const  absolute = Math.abs(difference)
  let arrOfDates :string[]= []
  
  for(let i = absolute; i>=0; i--){
    let day = subDays(date, i)
    let dateformat = formatDate(day)
    arrOfDates.push(dateformat)
  }
return arrOfDates
}
/**
 * remplaza el "/" con "-"
 * @param arrayDates pasa array con fechas o vacio para usar el date 
 * @returns 
 */
export function replaceSlashInDates(arrayDates:string[]): string[]{

    const dates =  arrayDates.map((item)=>{
      return item.replace(/\//g, "-")
    })
    return dates

  // if(date){
  //   return  date.replace(/\//g, "-")
  // }

}
/**
 * 
 * @returns regresa un array con las fechas desde el lunes pasado hasta el domingo
 */
export function lastWeek() :string[]{
    const currentDate = new Date()
    let start = 7
    let  accedingToLastWeek = subDays(currentDate, start) 
    let day  = accedingToLastWeek.getDay() 
    
    for(let i = start; i<20; i++){
      if(day ===1 ){
        console.log(day,"dia",accedingToLastWeek)
        break
      }else{
        start = start +1 
        accedingToLastWeek = subDays(currentDate, start)
        day  = accedingToLastWeek.getDay()
      }
    }
    const dates = []
    
    for(let i = 6,j =0; i>=0 ; i--,j++){
      const date = addDays(accedingToLastWeek, j)
      dates.push(date)
    }

  const formattedDates = dates.map((itemDate) => {
    const date = new Date(itemDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  });
return formattedDates
}

/**
 * 
 * @param dates array con total sales, fecha en formato año mes dia
 * @returns array de objetos con propiedades total, date, day
 */

export function addDayOfWeek(dates: Array<[Total, DateFormat]>): Array<ArraySaleTotalAndDay>{
  const datesObj: Array<ArraySaleTotalAndDay> = dates.map((item) => {
    let dayOfWeek = "";
    let date = item[1];
    const replaceSlashWithHypen = date.split("-").join("/")
    
    let convertingToDateObject = new Date(replaceSlashWithHypen);
    let gettingDay = convertingToDateObject.getDay();
    
    switch (gettingDay) {
      case 0:
        dayOfWeek = "Domingo";
        break;
      case 1:
        dayOfWeek = "Lunes";
        break;
      case 2:
        dayOfWeek = "Martes";
        break;
      case 3:
        dayOfWeek = "Miércoles";
        break;
      case 4:
        dayOfWeek = "Jueves";
        break;
      case 5:
        dayOfWeek = "Viernes";
        break;
      case 6:
        dayOfWeek = "Sábado";
        break;
    }
    return  { total: item[0], date: item[1], day: dayOfWeek };
  });
  
  return datesObj;
}
/**
 * 
 * @param arr array de arrays donde cada subArray representa un dia 
 * @returns array de arrays con el una propiedad day donde viene el dia de la semana a la que pertenece 
 */
export function addDayToArray (arr:[]){
  const salesWWithDay = arr.map((ArrayItem:[])=> {
        const newObj= ArrayItem.map((item:SaleModel)=>{
          const date = item.date
          let dayOfWeek = ""
          const replaceSlashWithHypen = date.split("-").join("/")
          let convertingToDateObject = new Date(replaceSlashWithHypen);
          let gettingDay = convertingToDateObject.getDay();
          
          switch (gettingDay) {
            case 0:
              dayOfWeek = "Domingo";
              break;
            case 1:
              dayOfWeek = "Lunes";
              break;
            case 2:
              dayOfWeek = "Martes";
              break;
            case 3:
              dayOfWeek = "Miércoles";
              break;
            case 4:
              dayOfWeek = "Jueves";
              break;
            case 5:
              dayOfWeek = "Viernes";
              break;
            case 6:
              dayOfWeek = "Sábado";
              break;
          }
            return {...item, day:dayOfWeek}
          })
        return newObj
    
  })
  return salesWWithDay

  
}
/**
 * 
 * @returns array de fechas de hoy y ayer
 */
export function todayAndYesterday():string[]{
  const today = new Date();
  const yesterday = subDays(today,1);
    
  const formattedYesterday = format(yesterday, 'yyyy-MM-dd');
  const formattedToday = format(today, 'yyyy-MM-dd');
  
    return [formattedYesterday,formattedToday]
  }

  export function  addDayToSingleArray(saleArray:[]){  
    const date = saleArray[0].date
    const data = saleArray[0]
    let dayOfWeek = ""
    
    const replaceSlashWithHypen = date.split("-").join("/")
    const convertingDateFromStringToObjectDate = new Date(replaceSlashWithHypen)
    const getDay = convertingDateFromStringToObjectDate.getDay()
    switch (getDay) {
      case 0:
        dayOfWeek = "Domingo";
        break;
      case 1:
        dayOfWeek = "Lunes";
        break;
      case 2:
        dayOfWeek = "Martes";
        break;
      case 3:
        dayOfWeek = "Miércoles";
        break;
      case 4:
        dayOfWeek = "Jueves";
        break;
      case 5:
        dayOfWeek = "Viernes";
        break;
      case 6:
        dayOfWeek = "Sábado";
        break;
    }
    const dayAdded = {...data,day:dayOfWeek}
    return new Array(dayAdded)
  
  }
  /**
   * 
   * @param date date string cualquer Formato
   * @returns dia de la semana Lunes, Martes, Miercoles ...etc
   */
  export function getDayOfWeek(date: string){
    const adapterForDateObject = date.split("-").join("/")
    const convertDayToOjectDay = new Date(adapterForDateObject)
    const getDay = convertDayToOjectDay.getDay()
    let dayOfWeek: string = ""
    switch (getDay) {
        case 0:
          dayOfWeek = "Domingo";
          break;
        case 1:
          dayOfWeek = "Lunes";
          break;
        case 2:
          dayOfWeek = "Martes";
          break;
        case 3:
          dayOfWeek = "Miércoles";
          break;
        case 4:
          dayOfWeek = "Jueves";
          break;
        case 5:
          dayOfWeek = "Viernes";
          break;
        case 6:
          dayOfWeek = "Sábado";
          break;
      }
    return dayOfWeek
  }