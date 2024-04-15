"use server";
import * as fs from 'fs';
import path from 'path';

export const saveImageServer = async(base64:string, name:string) => {
    if(!fs.existsSync(path.join(process.cwd(),'/public/previews/')))
        await fs.promises.mkdir(path.join(process.cwd(),'/public/previews/'), { recursive: true });
    const filePath = path.join(process.cwd(),`/public/previews/${name}.webp`); 
    await fs.promises.writeFile(filePath, base64, 'base64');
}