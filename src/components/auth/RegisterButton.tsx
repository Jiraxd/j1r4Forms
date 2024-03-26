"use client";

import { useRouter } from "next/navigation";
import { getAuth } from "../../../actions/getAuth";

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
  const onClickHandle = async() => {
    const session = await getAuth();
    if(session)
    router.push("/forms/main");
  else
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
