"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Moonicon, Sunicon } from "@/app/icons";
import { EnterSettingsBTN } from "@/components/mainPage/settingsBTN";
import { Session } from "next-auth";
import { getAuth } from "../../../actions/getAuth";
import { FormPreview } from "./formPreview";

type Props = {
  theme: string;
  onThemeChange: (newTheme: string) => void;
};

export const NavBarForms = ({ theme, onThemeChange }: Props) => {
  const [session, setSession] = useState<Session>();
  useEffect(() => {
    async function getxd() {
      const sessionTMP = await getAuth();
      if (sessionTMP !== null) setSession(sessionTMP);
    }
    getxd();
  }, []);

  return (
    <div>
      <div
      className="fixed w-full top-0 bg-base-300"
      style={{
        zIndex: 200,
      }}
    >
      <div className="flex w-full min-h-16 items-center">
        <div className="flex">
          <Image
            src={session?.user?.image || "/images/default.webp"}
            alt={"logo"}
            width={32}
            height={32}
            className="ml-5"
          />
          <p className="ml-3 font-bold text-xl text-base-content">
            {`Welcome back, ${session?.user?.name || "user"}`}
          </p>
        </div>
        <div className="flex cursor-pointer gap-2 mx-auto">
          <Moonicon color={theme === "dark" ? "white" : "black"} />
          <input
            type="checkbox"
            value="light"
            className="toggle theme-controller"
            checked={theme === "light"}
            onClick={() => {
              onThemeChange(theme === "dark" ? "light" : "dark");
            }}
          />
          <Sunicon color={theme === "dark" ? "white" : "black"} />
        </div>
        <EnterSettingsBTN>
          <button className="btn btn-accent w-32 mr-5">Settings</button>
        </EnterSettingsBTN>
      </div>
    </div>
    <div className="flex min-h-screen flex-col items-center mt-40">
      <FormPreview />
      </div>
    </div>
  );
};
