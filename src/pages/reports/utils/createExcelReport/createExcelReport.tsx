import * as XLSX from "xlsx"
import { SaleModel, SaleModelForReport } from "../../interfaces";

export function createExcelReport (data:any []){
  console.log(data.length)
  console.log(data);
  
    const workbook = XLSX.utils.book_new();
  if(data.length ===1){
    console.log(data)
    console.log(data[0][1])
    const worksheet = XLSX.utils.json_to_sheet(data[0][1]);// json _to_sheet espera un array
    XLSX.utils.sheet_add_aoa(worksheet, [["Producto", "Precio","Cantidad vendida","Total"]], { origin: "A1" });
    worksheet["!cols"] = [ { wch: 20 },{ wch: 10 },{ wch: 15 } ,{ wch: 10 }  ];
    XLSX.utils.book_append_sheet(workbook, worksheet, data[0][0]);

  }
  else {
    //  este caso es para cuando es mas de dos dias
    data.forEach((subArray:SaleModelForReport[]) => {
      const salesData = subArray[0].salesOfTheDay; // Obtener los datos de ventas del día actual
      
      // Crear una nueva hoja en el libro de Excel con el nombre del día
      const worksheet = XLSX.utils.json_to_sheet(salesData);
      XLSX.utils.sheet_add_aoa(worksheet, [["Producto", "Precio", "Cantidad vendida", "Total"]], { origin: "A1" });//  asignando headers
      const max_width = salesData.reduce((w, r) => Math.max(w, r.name.length), 10); // asignando ancho de columnas tomando como ref el texto mas grande
      worksheet["!cols"] = [ { wch: max_width },{ wch: 10 },{ wch: 15 }   ];
      XLSX.utils.book_append_sheet(workbook, worksheet, subArray[0].day);
  
    })
  }

  XLSX.writeFile(workbook, "venta del .xlsx", { compression: true });
}