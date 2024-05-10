"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getSavedForm,
  getSavedFormClient,
} from "../../../../../actions/getSavedForm";
import { LoaderCircle } from "@/components/loader";
import { FormWrapperAnswers } from "@/components/formUser/FormWrapperAnswers";
import { NavbarFormsUser } from "@/components/formUser/navbarFormsUser";
import { getAuth } from "../../../../../actions/getAuth";
import { GetAnswered } from "../../../../../actions/dbUpdates";

const FormsPage = () => {
  const router = useRouter();
  const [form, setForm] = useState<any>(null);
  const [theme, setTheme] = useState<string>("dark");
  const [userid, setuserID] = useState<string>("");
  const [answered, setAnswered] = useState<boolean>(false);
  const pathname = usePathname();
  useEffect(() => {
    let localTheme = localStorage.getItem("theme");
    if (localTheme) setTheme(localTheme);
    async function getxd() {
      const formtmp = await getSavedFormClient(pathname.split("/")[2]);
      const user = await getAuth();
      const id = user?.user?.id || "";
      setuserID(id);
      if (id !== "") {
        try {
          console.log(id);
          const count = await GetAnswered((formtmp as any).formid, id);
          setAnswered(count);
        } catch (e) {}
      }
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
  if (answered === true) {
    return (
      <div className="flex w-full min-h-screen align-middle items-center flex-row">
        <div className="w-full text-center">
          <div className="text-lg font-bold w-full text-center">
            You already answered this form!
          </div>
          <div
            className="text-md w-full text-center cursor-pointer"
            onClick={() => router.push("/")}
          >
            Return to main page
          </div>
        </div>
      </div>
    );
  }
  return (
    <main data-theme={theme} className="overflow-y-auto">
      <div className="overflow-y-auto">
        <NavbarFormsUser theme={theme} callback={handleThemeChange} />
        <FormWrapperAnswers form={form} userid={userid} />
      </div>
    </main>
  );
};

export default FormsPage;
