"use client";
import Image from "next/image";
import { Moonicon, Sunicon } from "@/app/icons";
import { useState } from "react";

export const HomePage = () => {
  const [theme, setTheme] = useState<string>("dark");
  return (
    <main>
      <div className="flex min-h-14 justify-between bg-base-300">
        <label className="flex cursor-pointer gap-2">
          <Moonicon color={theme === "dark" ? "white" : "black"} />
          <input
            type="checkbox"
            value="light"
            className="toggle theme-controller"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          />
          <Sunicon color={theme === "dark" ? "white" : "black"} />
        </label>
      </div>
      <div className="flex min-h-screen flex-col items-center">
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div>
              <h1 className="text-5xl font-bold text-gray-600">J1R4 Forms</h1>
              <p className="py-6 text-slate-500">
                Create good looking forms and get answers to them using a simple
                link!
              </p>
              <button className="btn btn-primary">Get Started</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
