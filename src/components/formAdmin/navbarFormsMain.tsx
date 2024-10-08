"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Moonicon, Sunicon } from "@/app/icons";
import { EnterSettingsBTN } from "@/components/mainPage/settingsBTN";
import { useRouter } from "next/navigation";
import { db } from "@/lib/db";
import { updateFormName } from "../../../actions/dbUpdates";
import { Input } from "../ui/input";
import { button } from "@nextui-org/react";
import { ShareFormBtn } from "../forms/ShareFormBtn";

type Props = {
  theme: string;
  onThemeChange: (newTheme: string) => void;
  form: any;
  changeSelected: (questions: boolean) => void;
};

export const NavBarFormMain = ({
  theme,
  onThemeChange,
  form,
  changeSelected,
}: Props) => {
  const router = useRouter();
  const [formName, setName] = useState<string>(form.name);
  const [selectedQuestions, setSelected] = useState<boolean>(true);

  const handleNameChange = async () => {
    if (formName === form.name) return;
    await updateFormName(form.formid, formName);
  };

  return (
    <div>
      <div
        className="fixed w-full top-0"
        style={{
          zIndex: 200,
        }}
      >
        <div className="flex w-full min-h-16 items-center bg-base-300">
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
              spellCheck={false}
            />
          </div>
          <div className="flex w-full items-center min-h-8 justify-center gap-8">
            <span
              className="cursor-pointer pb-1 pt-2"
              onClick={() => {
                setSelected(true);
                changeSelected(true);
              }}
              style={{
                borderBottom: selectedQuestions
                  ? "3px solid rgb(76, 43, 135)"
                  : "3px solid rgba(0,0,0,0)",
                transition: "border-bottom 0.3s ease",
              }}
            >
              Questions
            </span>
            <span
              className="inline-block whitespace-nowrap cursor-pointer pb-1 pt-2"
              onClick={() => {
                setSelected(false);
                changeSelected(false);
              }}
              style={{
                borderBottom: selectedQuestions
                  ? "3px solid rgba(0,0,0,0)"
                  : "3px solid rgb(76, 43, 135)",
                transition: "border-bottom 0.3s ease",
              }}
            >
              {"Answers"}
              <span
                className={`rounded-full px-2 ${
                  theme === "dark" ? "bg-base-300" : "bg-slate-300"
                } ${theme === "dark" ? "text-white" : "text-black"}`}
              >
                {(form.answersfromusers as [])?.length || "0"}
              </span>
            </span>
          </div>
          <div className="flex cursor-pointer gap-2 mr-6 ml-auto">
            <Moonicon color={theme === "dark" ? "white" : "black"} />
            <input
              type="checkbox"
              value="light"
              className="toggle theme-controller"
              defaultChecked={theme === "light"}
              onClick={() => {
                onThemeChange(theme === "dark" ? "light" : "dark");
              }}
            />
            <Sunicon color={theme === "dark" ? "white" : "black"} />
          </div>
          <ShareFormBtn formid={form.formid}>
            <button className="btn btn-info w-32 mr-5">Share</button>
          </ShareFormBtn>
          <EnterSettingsBTN>
            <button className="btn btn-error w-32 mr-5">Settings</button>
          </EnterSettingsBTN>
        </div>
      </div>
    </div>
  );
};
