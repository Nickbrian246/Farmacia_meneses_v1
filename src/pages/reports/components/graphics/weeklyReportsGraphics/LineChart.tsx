import { Line } from "react-chartjs-2"
import {Chart as chartjs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from  "chart.js"
import { ArraySaleTotalAndDay } from "../../../interfaces";

  chartjs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
  );

interface Props {
  arrayDateTotalAndDay:ArraySaleTotalAndDay[]
}

export default function LinesChart(props:Props){
  const { arrayDateTotalAndDay} = props

  const axisY = arrayDateTotalAndDay.map((item) => item.total)
  const axisX = arrayDateTotalAndDay.map((item) => item.day)

  const firstDate = arrayDateTotalAndDay[0].date
  const lastDate = arrayDateTotalAndDay[arrayDateTotalAndDay.length -1].date

  const myData = {
    labels: axisX,
    datasets : [
      {
        label:`Ventas de ${firstDate} a ${lastDate} `,
        data:axisY,
        tension:0.5,
        fill: true,
        borderColor:"rgb(255,99,132",
        backGroundColor:" rgba(255,99,132)",
        pointRadius:5,
        pointBorderColor:"rgba(255,99,132)",
        pointBackgroundColor:"rgba (255,99,132)",
      }
    ]
  }

// let misoptions = {

// }

  return <Line data={myData} />
}
