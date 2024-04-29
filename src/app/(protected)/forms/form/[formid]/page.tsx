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
import React from "react";
import html2canvas from "html2canvas-pro";
import { saveImageServer } from "../../../../../../actions/saveImageServer";

const FormPage = () => {
  const [theme, setTheme] = useState<string>("dark");
  const [form, setForm] = useState<any>(null);
  const pathname = usePathname();
  useEffect(() => {
    let localTheme = localStorage.getItem("theme");
    if (localTheme) setTheme(localTheme);
    async function getxd() {
      const formtmp = await getSavedForm(pathname.split("/")[3]);
      setForm(formtmp);
      setTimeout(captureScreenshot, 1000);
    }
    getxd();
  }, []);

  Mousetrap.bind(["command+s", "ctrl+s"], function () {
    //@ts-ignore
    document.getElementById("save_popup")?.showModal();
    return false;
  });
  const callbackUpdateFormClient = (formupdated: any) => {
    captureScreenshot();
    setForm(formupdated);
  };
  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const captureScreenshot = async () => {
    try {
      const elementToCapture = document.getElementById(
        "form_wrapper"
      ) as HTMLElement;
      const canvas = await html2canvas(elementToCapture, {
        backgroundColor: "#D5D5D5",
        useCORS: true,
        windowHeight: 1080,
        windowWidth: 1920,
        height: 1080,
        width: 1920,
      });
      const imageDataUrl = canvas
        .toDataURL("image/webp")
        .replace("data:image/webp;base64,", "");
      saveImageServer(imageDataUrl, pathname.split("/")[3]);
    } catch (e) {}
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
      <div className="overflow-y-auto" id="form_wrapper">
        <FormWrapper form={form} callback={callbackUpdateFormClient} />
      </div>
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
