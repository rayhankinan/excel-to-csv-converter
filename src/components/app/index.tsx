import type { JSX } from "react";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import useAdd from "@/hooks/useAdd";

export default function Page(): JSX.Element {
  const sumQuery = useAdd({ a: 1, b: 2 });

  if (sumQuery.isLoading) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center">
        <LoaderCircle className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Button>Click me ({sumQuery.data})</Button>
    </div>
  );
}
