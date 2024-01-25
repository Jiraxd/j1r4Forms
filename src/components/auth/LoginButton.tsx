"use client";

import { useRouter } from "next/navigation";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const LoginButton = ({
  children,
  mode = "redirect",
  asChild,
}: LoginButtonProps) => {
  const router = useRouter();
  const onClickHandle = () => {
    router.push("/auth/login");
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
