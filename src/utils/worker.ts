import { Readable } from "node:stream";
import { makeDefaultReadableStreamFromNodeReadable } from "node-readable-to-web-readable-stream";
import officeCrypto from "officecrypto-tool";
import * as XLSX from "xlsx";

import type { WorkerArgs } from "@/types/worker";

XLSX.stream.set_readable(Readable);

export const excel2csv = async ({
  handle,
  file,
  opts: { dense = true, password, ...rest } = {},
}: WorkerArgs) => {
  const arrayBuffer = await file.arrayBuffer();

  if (password) {
    const decryptedBuffer = await officeCrypto.decrypt(
      Buffer.from(arrayBuffer),
      {
        password,
      }
    );

    const workbook = XLSX.read(decryptedBuffer, {
      dense,
      ...rest,
    });

    const stream: Readable = XLSX.stream.to_csv(
      workbook.Sheets[workbook.SheetNames[0]]
    );

    const webStream = makeDefaultReadableStreamFromNodeReadable(stream);
    const writeStream = await handle.createWritable();
    await webStream.pipeTo(writeStream);

    return;
  }

  const workbook = XLSX.read(arrayBuffer, {
    dense,
    ...rest,
  });

  const stream: Readable = XLSX.stream.to_csv(
    workbook.Sheets[workbook.SheetNames[0]]
  );

  const webStream = makeDefaultReadableStreamFromNodeReadable(stream);
  const writeStream = await handle.createWritable();
  await webStream.pipeTo(writeStream);
};

export const excel2html = async ({
  handle,
  file,
  opts: { dense = true, password, ...rest } = {},
}: WorkerArgs) => {
  const arrayBuffer = await file.arrayBuffer();

  if (password) {
    const decryptedBuffer = await officeCrypto.decrypt(
      Buffer.from(arrayBuffer),
      {
        password,
      }
    );

    const workbook = XLSX.read(decryptedBuffer, {
      dense,
      ...rest,
    });

    const stream: Readable = XLSX.stream.to_html(
      workbook.Sheets[workbook.SheetNames[0]]
    );

    const webStream = makeDefaultReadableStreamFromNodeReadable(stream);
    const writeStream = await handle.createWritable();
    await webStream.pipeTo(writeStream);
  }

  const workbook = XLSX.read(arrayBuffer, {
    dense,
    ...rest,
  });

  const stream: Readable = XLSX.stream.to_html(
    workbook.Sheets[workbook.SheetNames[0]]
  );

  const webStream = makeDefaultReadableStreamFromNodeReadable(stream);
  const writeStream = await handle.createWritable();
  await webStream.pipeTo(writeStream);
};
