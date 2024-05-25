"use client";
import Image from "next/image";
import { Moonicon, Sunicon } from "@/app/icons";
import { useEffect, useState } from "react";
import Link from "next/link";
import { LoginButton } from "./auth/LoginButton";
import { RegisterButton } from "./auth/RegisterButton";
import { LogReg } from "./mainPage/logreg";

export const HomePage = () => {
  useEffect(() => {
    let localTheme = localStorage.getItem("theme");
    if (localTheme) setTheme(localTheme);
  }, []);
  const [theme, setTheme] = useState<string>("dark");
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
              src={"/images/logo.webp"}
              alt={"logo"}
              width={32}
              height={32}
              className="ml-5"
            />
            <p className="ml-3 font-bold text-xl text-base-content">
              {"J1R4's Forms"}
            </p>
          </div>
          <div className="flex cursor-pointer gap-2 ml-auto mr-6">
            <Moonicon color={theme === "dark" ? "white" : "black"} />
            <input
              type="checkbox"
              value="light"
              className="toggle theme-controller"
              defaultChecked={theme === "light"}
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
          <LogReg />
        </div>
      </div>
      <div className="flex min-h-screen flex-col items-center">
        <div className="min-h-screen bg-base-200 flex min-w-full">
          <div className="hero mt-40">
            <div className="hero-content flex-col">
              <div className="flex">
                <div className="max-w-xl">
                  <h1 className="text-5xl font-bold text-gray-600">
                    Create surveys with cool and modern look!
                  </h1>
                  <p className="py-6 text-slate-500">
                    Create good looking surveys and get answers to them using a
                    simple link!
                  </p>
                  <RegisterButton>
                    <button className="btn btn-primary">Get Started</button>
                  </RegisterButton>
                </div>
                <div className="ml-25 text-slate-500 h-[400px] w-[600px]">
                  <Image
                    src={"/images/Preview1.webp"}
                    alt={"preview1"}
                    width={1920}
                    height={1080}
                    className="ml-5"
                  />
                </div>
              </div>
              <div className="divider text-m">
                ↓ Look at some of the features you can use to create your
                surveys ↓
              </div>
              <div className="flex flex-row mt-10">
                <div className="max-w-sm">
                  <h1 className="text-xl font-bold text-gray-600">
                    Create online forms as easily as possible!
                  </h1>
                  <p className="py-6 text-slate-500">
                    You can use many different components in a simple UI design
                    to achieve your desired looks.
                  </p>
                </div>
                <div className="ml-24 text-slate-500 h-[400px] w-[600px]">
                  <Image
                    src={"/images/Preview2.webp"}
                    alt={"preview2"}
                    width={1920}
                    height={1080}
                  />
                </div>
              </div>
              <div className="flex flex-row-reverse mt-10">
                <div className="max-w-sm">
                  <h1 className="text-xl font-bold text-gray-600">
                    Share your forms with one click and get answers instantly!
                  </h1>
                  <p className="py-6 text-slate-500">
                    You can also allow others to view the answers to your form.
                  </p>
                </div>
                <div className="text-slate-500 h-[400px] w-[600px] mr-24">
                  <Image
                    src={"/images/Preview3.webp"}
                    alt={"preview3"}
                    width={1920}
                    height={1080}
                  />
                </div>
              </div>
              <div className="flex flex-row mt-10">
                <div className="max-w-sm">
                  <h1 className="text-xl font-bold text-gray-600">
                    Analyse your answers with ease using our analysation tools!
                  </h1>
                  <p className="py-6 text-slate-500">
                    View graphs, charts or open the un-formatted answers
                    directly.
                  </p>
                </div>
                <div className="ml-24 text-slate-500 h-[400px] w-[600px]">
                  <Image
                    src={"/images/Preview4.webp"}
                    alt={"preview4"}
                    width={1920}
                    height={1080}
                    className="ml-5"
                  />
                </div>
              </div>
              <div className="mt-30">
                Created by <Link href={"https://github.com/Jiraxd"}>J1R4</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
