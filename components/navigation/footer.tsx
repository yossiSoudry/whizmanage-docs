import Image from "next/image"
import Link from "next/link"

import { Company } from "@/lib/meta"
import { SupportedLanguage } from "@/app/[lang]/layout"

import { Logo } from "./logo"

type FooterProps = {
  lang: SupportedLanguage
}

export function Footer({ lang }: FooterProps) {
  return (
    <footer className="w-full h-16 border-t">
      <div className="flex ltr:flex-row-reverse ltr:md:flex-row rtl:md:flex-row-reverse flex-wrap items-center justify-center sm:justify-between gap-2 sm:gap-0 w-full h-full px-2 sm:py-0 py-3 sm:px-4 lg:px-8 text-sm text-muted-foreground">
        <div className="hidden md:block w-20"></div>
        <p className="text-center">
          &copy; {new Date().getFullYear()}{" "}
          <Link className="font-semibold" href={Company.link}>
            {Company.name}
          </Link>
        </p>
        {Company.branding !== false && (
          <div className="text-center">
            <Link
              className="font-semibold sm:hidden"
              href="https://whizmanage.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/icon.svg"
                alt="WhizManage Logo"
                width={30}
                height={30}
              />
            </Link>
            <div className="hidden sm:block">
              <Logo lang={lang} />
            </div>
          </div>
        )}
      </div>
    </footer>
  )
}
