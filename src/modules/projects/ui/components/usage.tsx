import Link from "next/link";
import { CrownIcon } from "lucide-react";
import { formatDuration, intervalToDuration } from "date-fns";
import { useAuth } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

interface UsageProps {
  points: number;
  msBeforeNext: number;
}

export const Usage = ({ msBeforeNext, points }: UsageProps) => {
  const { has } = useAuth();
  const hasProAccess = has?.({
    plan: "pro",
  });

  return (
    <div className="bg-background rounded-t-xl border border-b-0 p-2.5">
      <div className="flex items-center gap-x-2">
        <div>
          <p className="text-sm">
            {points} {hasProAccess ? "" : "free"} credits remaining
          </p>
          <p className="text-muted-foreground text-xs">
            Resets in{" "}
            {formatDuration(
              intervalToDuration({
                start: new Date(),
                end: new Date(Date.now() + msBeforeNext),
              }),
              { format: ["months", "days", "hours"] },
            )}
          </p>
        </div>

        {!hasProAccess && (
          <Button size="sm" variant="tertiary" className="ml-auto" asChild>
            <Link href="/pricing">
              <CrownIcon /> Upgrade
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};
