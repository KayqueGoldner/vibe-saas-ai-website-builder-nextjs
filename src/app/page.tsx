"use client";

import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [value, setValue] = useState("");
  const router = useRouter();

  const trpc = useTRPC();
  const createProject = useMutation(
    trpc.projects.create.mutationOptions({
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: (data) => {
        router.push(`/projects/${data.id}`);
      },
    }),
  );

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-y-4">
        <Input value={value} onChange={(e) => setValue(e.target.value)} />
        <Button
          onClick={() => createProject.mutate({ value })}
          disabled={createProject.isPending}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
