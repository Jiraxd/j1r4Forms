"use client";

import { usePathname } from "next/navigation";
import { auth } from "../../../../../../auth";
import { db } from "@/lib/db";
import { useEffect, useState } from "react";
import { LoaderCircle } from "@/components/loader";
import { getSavedForm } from "../../../../../../actions/getSavedForm";
import { NavBarFormMain } from "@/components/formAdmin/navbarFormsMain";

const formPage = () => {
  const [theme, setTheme] = useState<string>("dark");
  const [form, setForm] = useState<any>(null);
  const pathname = usePathname();
  useEffect(() => {
    let localTheme = localStorage.getItem("theme");
    if (localTheme) setTheme(localTheme);
    async function getxd() {
      const formtmp = await getSavedForm(pathname.split("/")[3]);
      setForm(formtmp);
    }
    getxd();
  }, []);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };
  if (form == null)
    return (
      <div className="flex w-full min-h-screen flex-row justify-center align-middle">
        <LoaderCircle></LoaderCircle>
      </div>
    );
  return (
    <main data-theme={theme}>
      <NavBarFormMain
        theme={theme}
        onThemeChange={handleThemeChange}
        form={form}
      />
    </main>
  );
};

export default formPage;
