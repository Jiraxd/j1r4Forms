"use server";

import {db} from "@/lib/db";
import cuid from 'cuid';

export const createFormServer = async(id:string) => { 
    const newFormId = cuid();
    await db.savedForm.create({
        data: {
          authorID: id,
          name: "Untitled Form",
          formid: newFormId,
        },
      });
      return newFormId;
}