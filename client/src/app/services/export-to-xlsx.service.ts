import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExportToXlsxService {

  constructor() { }
  worksheet: XLSX.WorkSheet;

  public exportAsExcelFile(table: HTMLElement, excelFileName: string): void {       
    const workbook: XLSX.WorkBook = { Sheets: { 'Detalle': XLSX.utils.table_to_sheet(table) }, SheetNames: ['Detalle'] };  
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });  
    this.saveAsExcelFile(excelBuffer, excelFileName);

  }
  
  private saveAsExcelFile(buffer: any, fileName: string): void {
      const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
      FileSaver.saveAs(data, fileName + '_export_' + new  Date().getTime() + EXCEL_EXTENSION);
  } 
  
}
