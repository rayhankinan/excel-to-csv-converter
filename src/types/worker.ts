import type { FormSchema } from "@/types/form";

export type WorkerArgs = FormSchema & {
  handle: FileSystemFileHandle;
};
