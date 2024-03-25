"use server";

import { db } from "@/lib/db";

export const getFormsServer = async(id:string) => {
    const forms = await db.savedForm.findMany({
        where: {
          authorID: {
            equals: id,
          },
        },
      });
return forms;
}