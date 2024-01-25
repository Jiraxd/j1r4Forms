"use client";

import Link from "next/link";

interface BackButtonProps {
  href: string;
  label: string;
}
export const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <button className="font-normal w-full text-sm">
      <Link href={href}>{label}</Link>
    </button>
  );
};
