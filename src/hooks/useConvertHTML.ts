import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import type { WorkerArgs } from "@/types/worker";
import workerInstance from "@/utils/comlink";

export default function useConvertHTML() {
  return useMutation({
    mutationFn: (args: WorkerArgs) => workerInstance.excel2html(args),
    onError: () =>
      toast.error("Failed to convert file to HTML. Please try again."),
  });
}
