"use client";

import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";

export default function Home() {
  const trpc = useTRPC();
  const invoke = useMutation(
    trpc.invoke.mutationOptions({
      onSuccess: () => {
        toast.success("Background job invoked");
      },
    }),
  );

  return (
    <div className="mx-auto max-w-7xl py-4">
      <Button
        onClick={() => invoke.mutate({ text: "Kayque" })}
        disabled={invoke.isPending}
      >
        Invoke background job
      </Button>
    </div>
  );
}
