"use server";
import * as fs from "fs";
import { put } from "@vercel/blob";

export const saveImageServer = async (base64: string, name: string) => {
  if (process.env.NODE_ENV === "production") {
    const buffer = Buffer.from(base64, "base64");
    await put(`${name}.webp`, buffer, {
      access: "public",
      contentType: "image/webp",
      token: process.env.BLOB_TOKEN,
    });
  } else {
    const filePath = `./public/previews/${name}.webp`;
    await fs.promises.writeFile(filePath, base64, "base64");
  }
};
