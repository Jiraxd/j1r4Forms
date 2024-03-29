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