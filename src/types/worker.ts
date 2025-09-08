import * as XLSX from "xlsx";

export type WorkerArgs = {
  handle: FileSystemFileHandle;
  file: File;
  opts?: XLSX.ParsingOptions;
};
