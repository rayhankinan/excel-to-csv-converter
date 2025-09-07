const workerInstance = new ComlinkWorker<typeof import("@/utils/worker")>(
  new URL("./worker", import.meta.url),
  {
    type: "module",
  }
);

export default workerInstance;
