"use server";

import {db} from "@/lib/db";
import cuid from 'cuid';

export const getSavedForm = async(id:string) => { 
  const form = await db.savedForm.findFirst({
    where: {
      formid: id,
    },
    include: {
      fields: true,
    }
  });
      return form;
}