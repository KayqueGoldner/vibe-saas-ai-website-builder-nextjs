"use client";

import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [value, setValue] = useState("");

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
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
      <Button
        onClick={() => invoke.mutate({ value })}
        disabled={invoke.isPending}
      >
        Invoke background job
      </Button>
    </div>
  );
}
