import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import type { FormSchema } from "@/types/form";
import workerInstance from "@/utils/comlink";

export default function useConvertJSON() {
  return useMutation({
    mutationFn: (args: FormSchema) => workerInstance.excel2json(args),
    onError: () =>
      toast.error("Failed to convert file to JSON. Please try again."),
  });
}
