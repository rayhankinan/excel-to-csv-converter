import { useQuery } from "@tanstack/react-query";
import workerInstance from "@/utils/comlink";

export default function useAdd({ a, b }: { a: number; b: number }) {
  return useQuery({
    queryKey: ["add", a, b],
    queryFn: () => workerInstance.add(a, b),
  });
}
