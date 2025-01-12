import Image from "next/image"
import Link from "next/link"

import { Settings } from "@/lib/meta"

export function Logo() {
  return (
    <Link
      href="/"
      className="font-normal flex rtl:flex-row-reverse gap-0.5 items-center text-sm mr-4  text-black md:px-2  relative z-20 cursor-pointer"
    >
      <Image
        src={Settings.siteicon}
        alt={`${Settings.title} main logo`}
        width={34}
        height={34}
        loading="lazy"
        decoding="async"
      />
      <div className="notranslate">
        <span className="text-white text-xl">hiz</span>
        <span className="text-white font-bold text-xl">
          <span>Man</span>
          <span>age</span>
        </span>
      </div>
    </Link>
  )
}
