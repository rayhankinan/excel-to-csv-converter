import { Readable } from "node:stream";
import { makeDefaultReadableStreamFromNodeReadable } from "node-readable-to-web-readable-stream";
import * as Comlink from "comlink";
import * as XLSX from "xlsx";

import type { FormSchema } from "@/types/form";

XLSX.stream.set_readable(Readable);

export const excel2csv = ({ file, password, sheets }: FormSchema) => {
  const arrayBuffer = new FileReaderSync().readAsArrayBuffer(file);
  const workbook = XLSX.read(arrayBuffer, {
    dense: true,
    password,
    sheets,
  });

  const stream: Readable = XLSX.stream.to_csv(
    workbook.Sheets[workbook.SheetNames[0]]
  );

  const webStream = makeDefaultReadableStreamFromNodeReadable(stream);
  const response = new Response(webStream);

  return Comlink.proxy(response);
};

export const excel2json = ({ file, password, sheets }: FormSchema) => {
  const arrayBuffer = new FileReaderSync().readAsArrayBuffer(file);
  const workbook = XLSX.read(arrayBuffer, {
    dense: true,
    password,
    sheets,
  });

  const stream: Readable = XLSX.stream.to_json(
    workbook.Sheets[workbook.SheetNames[0]]
  );

  const webStream = makeDefaultReadableStreamFromNodeReadable(stream);
  const response = new Response(webStream);

  return Comlink.proxy(response);
};

export const excel2html = ({ file, password, sheets }: FormSchema) => {
  const arrayBuffer = new FileReaderSync().readAsArrayBuffer(file);
  const workbook = XLSX.read(arrayBuffer, {
    dense: true,
    password,
    sheets,
  });

  const stream: Readable = XLSX.stream.to_html(
    workbook.Sheets[workbook.SheetNames[0]]
  );

  const webStream = makeDefaultReadableStreamFromNodeReadable(stream);
  const response = new Response(webStream);

  return Comlink.proxy(response);
};
