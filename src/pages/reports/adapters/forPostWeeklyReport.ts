import { ArrayOfDates } from "../interfaces"
export function  postWeeklyReportsAdapter(date: string[]):ArrayOfDates{
    const dates:ArrayOfDates = {
      dates: date.map((item) => {
        return item
      })
    }
    return dates 
}