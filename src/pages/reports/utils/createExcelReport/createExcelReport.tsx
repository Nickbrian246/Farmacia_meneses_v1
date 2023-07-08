import * as XLSX from "xlsx"
import { SaleModel, SaleModelForReport, StockReport } from "../../interfaces";
import { formatDate } from "../date";

export function createExcelReport (data:any []){
  const workbook = XLSX.utils.book_new();
  if(data.length ===1){
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

export function createStockReport(stock:StockReport[]):void{
  const today = new Date()
  const formattedDate = formatDate(today)
  const workbook = XLSX.utils.book_new()
  const worksheet = XLSX.utils.json_to_sheet(stock);
  XLSX.utils.sheet_add_aoa(worksheet,[["Nombre","Precio","Tag","Tamaño","Marca","Articulos por paquete","cantidad en stock"]]);
  worksheet["!cols"] = [ { wch: 25 },{ wch: 10 },{ wch: 15 } ,{ wch: 10 },{ wch: 18 },{ wch: 18 },{ wch: 18 }];
  XLSX.utils.book_append_sheet(workbook, worksheet,`Inventario_fecha${formattedDate}`)

  XLSX.writeFile(workbook,`Inventario_fecha${formattedDate}.xlsx`, { compression: true });

}