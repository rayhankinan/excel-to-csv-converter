import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import type { FormSchema } from "@/types/form";
import workerInstance from "@/utils/comlink";

export default function useConvertTXT() {
  return useMutation({
    mutationFn: (args: FormSchema) => workerInstance.excel2txt(args),
    onError: () =>
      toast.error("Failed to convert file to TXT. Please try again."),
  });
}
