"use server";

import { db } from "@/lib/db";

export const updateFormName = async(id:string, name:string) => {
    await db.savedForm.update({
        where: {
          formid: id,
        },
        data: {
          name: name,
        },
      });
}

export const updateTitleDesc = async(id:string, type:string, text:string) => {
  switch(type){
    case "title":
      await db.savedForm.update({
        where: {
          formid: id,
        },
        data: {
          formtitle: text,
        },
      });
    case "desc":
      await db.savedForm.update({
        where: {
          formid: id,
        },
        data: {
          formdescription: text,
        },
      });
    break;
}

};