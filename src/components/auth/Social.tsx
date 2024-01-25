"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export const Social = () => {
  return (
    <div className="flex justify-center items-center gap-x-2">
      <button className="ml-auto">
        <FcGoogle className="h-5 w-5" />
      </button>
      <button className="mr-auto ml-auto">
        <FaGithub className="h-5 w-5" />
      </button>
    </div>
  );
};
