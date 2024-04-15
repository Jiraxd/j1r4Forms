"use server";
import * as fs from "fs";
import path from "path";

export const saveImageServer = async (base64: string, name: string) => {
  const filePath = path.join(process.cwd(), `public/${name}.webp`);
  console.error(fs.readdirSync(process.cwd()).toString());
  await fs.promises.writeFile(filePath, base64, "base64");
};
