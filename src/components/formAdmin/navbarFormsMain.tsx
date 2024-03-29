"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Moonicon, Sunicon } from "@/app/icons";
import { EnterSettingsBTN } from "@/components/mainPage/settingsBTN";
import { useRouter } from "next/navigation";
import { db } from "@/lib/db";
import { updateFormName } from "../../../actions/updateFormName";
import { Input } from "../ui/input";

type Props = {
  theme: string;
  onThemeChange: (newTheme: string) => void;
  form: any;
};

export const NavBarFormMain = ({ theme, onThemeChange, form }: Props) => {
  const router = useRouter();
  const [formName, setName] = useState<string>(form.name);

  const handleNameChange = async () => {
    if (formName === form.name) return;
    await updateFormName(form.formid, formName);
  };

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
            <button onClick={() => router.push("/forms/main")}>
              <Image
                src={"/images/logo.webp"}
                alt={"logo"}
                width={32}
                height={32}
                className="ml-5"
              />
            </button>
            <Input
              className="ml-3 font-bold text-xl text-base-content border-500"
              type="text"
              value={formName}
              onChange={(e) => setName(e.target.value)}
              onBlur={handleNameChange}
            />
          </div>
          <div className="flex cursor-pointer gap-2 mr-6 ml-auto">
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
    </div>
  );
};
