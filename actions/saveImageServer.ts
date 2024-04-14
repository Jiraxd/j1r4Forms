"use server";
import * as fs from 'fs';

export const saveImageServer = async(base64:string, name:string) => {
    const filePath = `./public/previews/${name}.webp`; 
    await fs.promises.writeFile(filePath, base64, 'base64');
}