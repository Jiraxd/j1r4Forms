"use client";

import { usePathname } from "next/navigation";
import { auth } from "../../../../../../auth";
import { db } from "@/lib/db";
import { useEffect, useState } from "react";
import { LoaderCircle } from "@/components/loader";
import { getSavedForm } from "../../../../../../actions/getSavedForm";
import { NavBarFormMain } from "@/components/formAdmin/navbarFormsMain";
import { FormWrapper } from "@/components/formAdmin/formWrapper";
import { Prisma } from "@prisma/client";
import Mousetrap from "mousetrap";

const FormPage = () => {
  const [theme, setTheme] = useState<string>("dark");
  const [form, setForm] = useState<any>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
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

  Mousetrap.bind(["command+s", "ctrl+s"], function () {
    //@ts-ignore
    document.getElementById("save_popup")?.showModal();
    return false;
  });
  const callbackUpdateFormClient = (formupdated: any) => {
    setForm(formupdated);
  };
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
    <main data-theme={theme} className="overflow-y-auto">
      <NavBarFormMain
        theme={theme}
        onThemeChange={handleThemeChange}
        form={form}
      />
      <FormWrapper form={form} callback={callbackUpdateFormClient} />
      <dialog id="save_popup" className="modal border-transparent">
        <div className="modal-box">
          <h3 className="font-bold text-lg">No need to save!</h3>
          <p className="py-4">
            Your changes are saved automatically upon every change
          </p>
        </div>
        <form method="dialog" className="modal-backdrop border-transparent">
          <button>close</button>
        </form>
      </dialog>
    </main>
  );
};

export default FormPage;
