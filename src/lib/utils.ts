import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { saveImageServer } from "../../actions/saveImageServer";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



