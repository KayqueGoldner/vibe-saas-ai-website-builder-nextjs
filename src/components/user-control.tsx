"use client";

import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import { useCurrentTheme } from "@/hooks/use-current-theme";

interface UserButtonProps {
  showName?: boolean;
}

export const UserControl = ({ showName }: UserButtonProps) => {
  const currentTheme = useCurrentTheme();

  return (
    <UserButton
      showName={showName}
      appearance={{
        elements: {
          userButtonbox: "rounded-md!",
          userButtonAvatarBox: "rounded-md! size-8!",
          userButtonTrigger: "rounded-md!",
        },
        theme: currentTheme === "dark" ? dark : undefined,
      }}
    />
  );
};
