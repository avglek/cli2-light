import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

export async function toExcel(data, fileName) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(data.title.slice(0, 30), {
    headerFooter: { firstHeader: data.title, firstFooter: '' },
  });

  const fontSize = 10;
  worksheet.columns = data.col.map((col) => {
    let len = +col.size > col.name.length ? col.size : col.name.length + 2;
    len = (len * fontSize) / 11;
    return {
      header: col.name,
      key: col.value,
      width: len,
      style: { font: { size: fontSize } },
    };
  });
  data.rows.forEach((row) => {
    const newRow = data.col.map((col) => {
      const colType = col.type;
      const colValue = row[col.value];
      return colType === 'r8' ? Number.parseInt(colValue) : colValue;
    });
    worksheet.addRow(newRow);
  });

  const rowTitle = worksheet.getRow(1);
  rowTitle.alignment = { vertical: 'middle', horizontal: 'center' };
  rowTitle.height = 32;
  rowTitle.font = { bold: true, size: fontSize };

  const countCols = worksheet.actualColumnCount;

  for (let i = 0; i < countCols; i++) {
    const cols = worksheet.getColumn(i + 1);
    cols.eachCell((cell) => {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });
  }

  const buffer = await workbook.xlsx.writeBuffer();

  saveAs(
    new Blob([buffer], { type: 'application/octet-stream' }),
    `${fileName}.xlsx`
  );
}

export function fromExcel(columns, data) {
  console.log(columns, data);

  const headers = columns.map((title) => {
    //title.name;
  });
  return [];
}
