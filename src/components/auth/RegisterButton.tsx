"use client";

import { useRouter } from "next/navigation";

interface RegButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const RegisterButton = ({
  children,
  mode = "redirect",
  asChild,
}: RegButtonProps) => {
  const router = useRouter();
  const onClickHandle = () => {
    router.push("/auth/register");
  };

  if (mode === "modal") {
    return <span>xdéčko</span>;
  }
  return (
    <span onClick={onClickHandle} className="cursor-pointer">
      {children}
    </span>
  );
};
