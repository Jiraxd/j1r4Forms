"use server";

import { db } from "@/lib/db";

export const createLinkForm = async (formid: string, expirationDate: Date) => {
  const link = await db.sharableLinkForm.create({
    data: {
      formid: formid,
      expirationDate: expirationDate,
    },
  });
  return link.link;
};
