export const FILE_TYPE = {
  CSV: "CSV",
  TXT: "TXT",
  HTML: "HTML",
} as const;

export const MIME_TYPE: Record<
  (typeof FILE_TYPE)[keyof typeof FILE_TYPE],
  string
> = {
  [FILE_TYPE.CSV]: "text/csv",
  [FILE_TYPE.TXT]: "text/plain",
  [FILE_TYPE.HTML]: "text/html",
} as const;

export const EXTENSION: Record<
  (typeof FILE_TYPE)[keyof typeof FILE_TYPE],
  string
> = {
  [FILE_TYPE.CSV]: ".csv",
  [FILE_TYPE.TXT]: ".txt",
  [FILE_TYPE.HTML]: ".html",
} as const;
