"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getSavedForm,
  getSavedFormClient,
} from "../../../../../actions/getSavedForm";
import { LoaderCircle } from "@/components/loader";

const FormsPage = () => {
  const [form, setForm] = useState<any>(null);
  const [theme, setTheme] = useState<string>("dark");
  const pathname = usePathname();
  useEffect(() => {
    let localTheme = localStorage.getItem("theme");
    if (localTheme) setTheme(localTheme);
    async function getxd() {
      const formtmp = await getSavedFormClient(pathname.split("/")[2]);
      setForm(formtmp);
    }
    getxd();
  }, []);

  if (form == null)
    return (
      <div className="flex w-full min-h-screen flex-row justify-center align-middle">
        <LoaderCircle></LoaderCircle>
      </div>
    );
  if (form === "null") {
    return (
      <div className="flex w-full min-h-screen align-middle items-center flex-row">
        <div className="text-lg font-bold w-full text-center">
          Form does not exist!
        </div>
      </div>
    );
  }
  if (form === "expired") {
    return (
      <div className="flex w-full min-h-screen align-middle items-center flex-row">
        <div className="text-lg font-bold w-full text-center">
          Form link is expired!
        </div>
      </div>
    );
  }
  return (
    <main data-theme={theme} className="overflow-y-auto">
      <div className="overflow-y-auto"></div>
    </main>
  );
};

export default FormsPage;
