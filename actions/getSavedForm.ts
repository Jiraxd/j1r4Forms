"use server";

import {db} from "@/lib/db";
import { Prisma } from "@prisma/client";
import cuid from 'cuid';

export const getSavedForm = async(id:string) => { 
  const form = await db.savedForm.findFirst({
    where: {
      formid: id,
    },
    include: {
      fields: {
        include: {
          Answers: true,
        },
      }
    }
  });
      return form;
}