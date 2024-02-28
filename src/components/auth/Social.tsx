"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { defaultRedirect } from "../../../routes";

export const Social = () => {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: defaultRedirect,
    });
  };
  return (
    <div className="flex justify-center items-center gap-x-2">
      <button className="ml-auto" onClick={() => onClick("google")}>
        <FcGoogle className="h-5 w-5" />
      </button>
      <button className="mr-auto ml-auto" onClick={() => onClick("github")}>
        <FaGithub className="h-5 w-5" />
      </button>
    </div>
  );
};
