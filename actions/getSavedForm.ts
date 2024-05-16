"use server";

import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import cuid from "cuid";

export const getSavedForm = async (id: string) => {
  const form = await db.savedForm.findFirst({
    where: {
      formid: id,
    },
    include: {
      fields: {
        include: {
          Answers: true,
        },
      },
      answersfromusers: true,
    },
  });
  return form;
};

export const getSavedFormClient = async (id: string) => {
  const formid = await db.sharableLinkForm.findFirst({
    where: {
      link: id,
    },
  });
  if (formid === undefined) {
    return "null";
  }
  if (formid === null) {
    return "null";
  }
  if (formid.expirationDate.getTime() !== 0) {
    if (formid.expirationDate.getTime() < new Date().getTime()) {
      return "expired";
    }
  }
  const form = await db.savedForm.findFirst({
    where: {
      formid: formid.formid,
    },
    include: {
      fields: {
        include: {
          Answers: true,
        },
      },
    },
  });
  return form;
};
