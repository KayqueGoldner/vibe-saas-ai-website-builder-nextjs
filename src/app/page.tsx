"use client";

import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [value, setValue] = useState("");

  const trpc = useTRPC();
  const { data: messages } = useQuery(trpc.messages.getMany.queryOptions());
  const createMessage = useMutation(
    trpc.messages.create.mutationOptions({
      onSuccess: () => {
        toast.success("Message created");
      },
    }),
  );

  return (
    <div className="mx-auto max-w-7xl py-4">
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
      <Button
        onClick={() => createMessage.mutate({ value })}
        disabled={createMessage.isPending}
      >
        Invoke background job
      </Button>
      {JSON.stringify(messages, null, 2)}
    </div>
  );
}
