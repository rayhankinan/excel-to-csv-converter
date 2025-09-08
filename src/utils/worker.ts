import { Readable } from "node:stream";
import { makeDefaultReadableStreamFromNodeReadable } from "node-readable-to-web-readable-stream";
import * as XLSX from "xlsx";

import type { WorkerArgs } from "@/types/worker";

XLSX.stream.set_readable(Readable);

export const excel2csv = async ({
  file,
  password,
  sheets,
  handle,
}: WorkerArgs) => {
  const arrayBuffer = await file.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, {
    dense: true,
    password,
    sheets,
  });

  const stream: Readable = XLSX.stream.to_csv(
    workbook.Sheets[workbook.SheetNames[0]]
  );
  const webStream = makeDefaultReadableStreamFromNodeReadable(stream);
  const writeStream = await handle.createWritable();
  await webStream.pipeTo(writeStream);
};

export const excel2html = async ({
  file,
  password,
  sheets,
  handle,
}: WorkerArgs) => {
  const arrayBuffer = await file.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, {
    dense: true,
    password,
    sheets,
  });

  const stream: Readable = XLSX.stream.to_html(
    workbook.Sheets[workbook.SheetNames[0]]
  );
  const webStream = makeDefaultReadableStreamFromNodeReadable(stream);
  const writeStream = await handle.createWritable();
  await webStream.pipeTo(writeStream);
};
