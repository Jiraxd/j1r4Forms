"use server";
import * as fs from "fs";
import { list, put } from "@vercel/blob";

export const saveImageServer = async (base64: string, name: string) => {
  if (process.env.NODE_ENV === "production") {
    const buffer = Buffer.from(base64, "base64");
    await put(`${name}.webp`, buffer, {
      access: "public",
      contentType: "image/webp",
      addRandomSuffix: false,
    });
  } else {
    const filePath = `./public/previews/${name}.webp`;
    await fs.promises.writeFile(filePath, base64, "base64");
  }
};

export const getBlob = async (blobname: string) => {
  const response = await list({
    prefix: blobname,
  });
  return response;
};
