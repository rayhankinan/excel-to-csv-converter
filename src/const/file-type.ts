export const FILE_TYPE = {
  CSV: "CSV",
  HTML: "HTML",
} as const;

export const MIME_TYPE: Record<
  (typeof FILE_TYPE)[keyof typeof FILE_TYPE],
  string
> = {
  [FILE_TYPE.CSV]: "text/csv",
  [FILE_TYPE.HTML]: "text/html",
} as const;

export const EXTENSION: Record<
  (typeof FILE_TYPE)[keyof typeof FILE_TYPE],
  string
> = {
  [FILE_TYPE.CSV]: ".csv",
  [FILE_TYPE.HTML]: ".html",
} as const;
