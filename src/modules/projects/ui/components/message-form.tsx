"use client";

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "sonner";
import { ArrowUpIcon, Loader2Icon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";

interface MessageFormProps {
  projectId: string;
}

const formSchema = z.object({
  value: z
    .string()
    .min(1, { message: "Value is required" })
    .max(10000, { message: "Value is too long" }),
});

export const MessageForm = ({ projectId }: MessageFormProps) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: "",
    },
  });

  const createMessage = useMutation(
    trpc.messages.create.mutationOptions({
      onSuccess: () => {
        form.reset();
        queryClient.invalidateQueries(
          trpc.messages.getMany.queryOptions({ projectId }),
        );
        // TODO: invalidate usage status
      },
      onError: (error) => {
        toast.error(error.message);
        // TODO: redirect to pricing page if specific error
      },
    }),
  );

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await createMessage.mutateAsync({
      value: values.value,
      projectId,
    });
  };

  const [isFocused, setIsFocused] = useState(false);
  const isPending = createMessage.isPending;
  const isButtonDisabled = isPending || !form.formState.isValid;
  const showUsage = false;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "bg-sidebar dark:bg-sidebar relative rounded-xl border p-4 pt-1 transition-all",
          isFocused && "shadow-xs",
          showUsage && "rounded-t-none",
        )}
      >
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <TextareaAutosize
              {...field}
              disabled={isPending}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              minRows={2}
              maxRows={8}
              className="w-full resize-none border-none bg-transparent pt-4 outline-none"
              placeholder="What would you like to build?"
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                  e.preventDefault();
                  form.handleSubmit(onSubmit)(e);
                }
              }}
            />
          )}
        />

        <div className="flex items-end justify-between gap-x-2 pt-2">
          <div className="text-muted-foreground font-mono text-[10px]">
            <kbd className="bg-muted text-muted-foreground pointer-events-none ml-auto inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium select-none">
              <span>&#8984;</span>Enter
            </kbd>
            &nbsp;to submit
          </div>
          <Button
            className={cn(
              "size-8 rounded-full",
              isButtonDisabled && "bg-muted-foreground border",
            )}
            disabled={isButtonDisabled}
          >
            {isPending ? (
              <Loader2Icon className="size-4 animate-spin" />
            ) : (
              <ArrowUpIcon className="" />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
