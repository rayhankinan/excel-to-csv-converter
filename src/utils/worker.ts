import * as XLSX from "xlsx";

import type { FormSchema } from "@/types/form";

// TODO: Change all of these to stream: https://docs.sheetjs.com/docs/demos/bigdata/stream/#browser

export const excel2csv = ({ file, password, sheets }: FormSchema) => {
  const selectedFile = file[0];
  const arrayBuffer = new FileReaderSync().readAsArrayBuffer(selectedFile);
  const workbook = XLSX.read(arrayBuffer, {
    dense: true,
    password,
    sheets,
  });

  return XLSX.utils.sheet_to_csv(workbook.Sheets[workbook.SheetNames[0]]);
};

export const excel2txt = ({ file, password, sheets }: FormSchema) => {
  const selectedFile = file[0];
  const arrayBuffer = new FileReaderSync().readAsArrayBuffer(selectedFile);
  const workbook = XLSX.read(arrayBuffer, {
    dense: true,
    password,
    sheets,
  });

  return XLSX.utils.sheet_to_txt(workbook.Sheets[workbook.SheetNames[0]]);
};

export const excel2html = ({ file, password, sheets }: FormSchema) => {
  const selectedFile = file[0];
  const arrayBuffer = new FileReaderSync().readAsArrayBuffer(selectedFile);
  const workbook = XLSX.read(arrayBuffer, {
    dense: true,
    password,
    sheets,
  });

  return XLSX.utils.sheet_to_html(workbook.Sheets[workbook.SheetNames[0]]);
};
