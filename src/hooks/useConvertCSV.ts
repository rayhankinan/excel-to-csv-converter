import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import type { WorkerArgs } from "@/types/worker";
import workerInstance from "@/utils/comlink";

export default function useConvertCSV() {
  return useMutation({
    mutationFn: (args: WorkerArgs) => workerInstance.excel2csv(args),
    onError: () =>
      toast.error("Failed to convert file to CSV. Please try again."),
  });
}
