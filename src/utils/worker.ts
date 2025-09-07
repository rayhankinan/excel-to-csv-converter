import * as XLSX from "xlsx";

import type { FormSchema } from "@/types/form";

// TODO: Change all of these to stream: https://docs.sheetjs.com/docs/demos/bigdata/stream/#browser

export const excel2csv = async ({ file, password, sheets }: FormSchema) => {
  const selectedFile = file[0];

  const arrayBuffer = await selectedFile.arrayBuffer();

  const workbook = XLSX.read(arrayBuffer, {
    dense: true,
    password,
    sheets,
  });

  return XLSX.utils.sheet_to_csv(workbook.Sheets[workbook.SheetNames[0]]);
};

export const excel2txt = async ({ file, password, sheets }: FormSchema) => {
  const selectedFile = file[0];

  const arrayBuffer = await selectedFile.arrayBuffer();

  const workbook = XLSX.read(arrayBuffer, {
    dense: true,
    password,
    sheets,
  });

  return XLSX.utils.sheet_to_txt(workbook.Sheets[workbook.SheetNames[0]]);
};

export const excel2html = async ({ file, password, sheets }: FormSchema) => {
  const selectedFile = file[0];

  const arrayBuffer = await selectedFile.arrayBuffer();

  const workbook = XLSX.read(arrayBuffer, {
    dense: true,
    password,
    sheets,
  });

  return XLSX.utils.sheet_to_html(workbook.Sheets[workbook.SheetNames[0]]);
};
