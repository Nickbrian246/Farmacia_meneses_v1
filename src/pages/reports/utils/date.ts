import {addDays, subDays} from "date-fns"
import { ArraySaleTotalAndDay, DateFormat, Total } from "../interfaces";

export function formatDate(date:string) {
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
  const currentDay= new Date() // current day
  const today = currentDay.getDay() // dia en numero de 0 al 6
  const conversionToDate = new Date(fromDate) // convierto la fecha recibida por parametro  un tipo fecha que se pueda manipular 
  const from =   conversionToDate.getDay() //obtengo el dia de comienzo 

  let differenceInDays = from - today // obtengo la diferencia en dias que sera el numero de veces que iterara el for 
    if (differenceInDays < 0) {
      differenceInDays += 7; 
    }
  let arrayOfDates = []//  guardar las fechas 
  
  for(let i = 1 ; i<differenceInDays +3; i++){ // iterar en la diferencia obtenida para sacar las fechas en formato año mes dia 
    const date = weekly(i) // cada iteracion pasa un dia de la presente semana y el metodo weekly retorna la fecha en formato año mes dia
    arrayOfDates.push(date)
  }
  return arrayOfDates
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
