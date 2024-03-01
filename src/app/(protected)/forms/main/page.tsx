"use client";
import { useEffect, useState } from "react";
import { auth } from "../../../../../auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Moonicon, Sunicon } from "@/app/icons";
import { EnterSettingsBTN } from "@/components/mainPage/settingsBTN";

const MainFormsPage = async () => {
  useEffect(() => {
    let localTheme = localStorage.getItem("theme");
    if (localTheme) setTheme(localTheme);
  }, []);
  const [theme, setTheme] = useState<string>("dark");
  const session = await auth();
  const router = useRouter();
  if (session === null) router.push("/");
  return (
    <main data-theme={theme}>
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
              {`Welcome back, ${session?.user?.name}`}
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
                setTheme(theme === "dark" ? "light" : "dark");
                localStorage.setItem(
                  "theme",
                  theme === "dark" ? "light" : "dark"
                );
              }}
            />
            <Sunicon color={theme === "dark" ? "white" : "black"} />
          </div>
          <EnterSettingsBTN>
            <button className="btn btn-secondary w-32 mr-5">Settings</button>
          </EnterSettingsBTN>
        </div>
      </div>
    </main>
  );
};

export default MainFormsPage;
