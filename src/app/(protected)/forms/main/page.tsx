"use client";
import Image from "next/image";
import { Moonicon, Sunicon } from "@/app/icons";
import { EnterSettingsBTN } from "@/components/mainPage/settingsBTN";
import { NavBarForms } from "@/components/forms/navbarForms";
import { useEffect, useState } from "react";
import { FormPreview } from "@/components/forms/formPreview";

const MainFormsPage = () => {
  const [theme, setTheme] = useState<string>("dark");
  useEffect(() => {
    let localTheme = localStorage.getItem("theme");
    if (localTheme) setTheme(localTheme);
  }, []);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <main data-theme={theme}>
      <NavBarForms theme={theme} onThemeChange={handleThemeChange} />
      <div className="flex min-h-screen flex-col items-center mt-40">
      <FormPreview />
      </div>
    </main>
  );
};

export default MainFormsPage;
