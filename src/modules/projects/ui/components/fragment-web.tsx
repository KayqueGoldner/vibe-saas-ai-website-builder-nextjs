"use client";

import { useState } from "react";
import { ExternalLinkIcon, RefreshCcwIcon } from "lucide-react";

import { Fragment } from "@/generated/prisma";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/hint";

interface FragmentWebProps {
  data: Fragment;
}

export const FragmentWeb = ({ data }: FragmentWebProps) => {
  const [fragmentKey, setFragmentKey] = useState(0);
  const [copied, setCopied] = useState(false);

  const onRefresh = () => {
    setFragmentKey((prev) => prev + 1);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(data.sandboxUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="flex size-full flex-col">
      <div className="bg-sidebar flex items-center gap-x-2 border-b p-2">
        <Hint text="Refresh" side="bottom" align="start">
          <Button size="sm" variant="outline" onClick={onRefresh}>
            <RefreshCcwIcon />
          </Button>
        </Hint>
        <Hint text="Click to copy" side="bottom">
          <Button
            size="sm"
            variant="outline"
            onClick={handleCopy}
            className="flex-1 justify-start text-start font-normal"
            disabled={!data.sandboxUrl || copied}
          >
            <span className="truncate">{data.sandboxUrl}</span>
          </Button>
        </Hint>
        <Hint text="Open in a new tab" side="bottom" align="start">
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              if (!data.sandboxUrl) return;
              window.open(data.sandboxUrl, "_blank");
            }}
            disabled={!data.sandboxUrl}
          >
            <ExternalLinkIcon />
          </Button>
        </Hint>
      </div>
      <iframe
        key={fragmentKey}
        className="size-full"
        sandbox="allow-forms allow-scripts allow-same-origin"
        loading="lazy"
        src={data.sandboxUrl}
      />
    </div>
  );
};
