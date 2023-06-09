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
  let currentDate = new Date(); 
  let currentDay = currentDate.getDay();
  let firstDayOfWeek= dayNumber ?? 1 //starts on monday

  let differenceInDays = currentDay - firstDayOfWeek; 
    if (differenceInDays < 0) {
      differenceInDays += 7; 
    }

  currentDate.setDate(currentDate.getDate() - differenceInDays); 

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
  const currentDay= new Date()
  const today = currentDay.getDay()
  const conversionToDate = new Date(fromDate) 
  const from =   conversionToDate.getDay()

  let differenceInDays = from - today
    if (differenceInDays < 0) {
      differenceInDays += 7; 
    }
  let arrayOfDates = []
  
  for(let i = 1 ; i<differenceInDays +3; i++){
    const date = weekly(i)
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

