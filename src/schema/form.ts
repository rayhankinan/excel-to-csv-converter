import { z } from "zod";

import { FILE_TYPE } from "@/const/file-type";

const formSchema = z.object({
  file: z.instanceof(File, {
    error: "Please upload a valid Excel file.",
  }),
  type: z.enum([FILE_TYPE.CSV, FILE_TYPE.JSON, FILE_TYPE.HTML], {
    error: "Please select a valid file type.",
  }),
  password: z
    .string({
      error: "Password must be a string.",
    })
    .optional(),
  sheets: z
    .string({
      error: "Sheets must be a string.",
    })
    .optional(),
});

export default formSchema;
