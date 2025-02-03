"use client"

import Link from "next/link"
import clsx from "clsx"
import { ScrollArea } from "@/components/ui/scroll-area"

type TocProps = {
  tocs: { href: string; level: number; text: string }[]
}

export default function Toc({ tocs }: TocProps) {
  // פונקציה מורחבת לניקוי טקסט ויצירת ID תקין
  const createValidId = (text: string): string => {
    return text
      // מחליף את כל התווים המיוחדים, כולל סוגריים מכל הסוגים
      .replace(/[\s.,\/#!$%\^&\*;:{}=\-_`~()\[\]\?]/g, "-")
      // מסיר quotes וגרשיים
      .replace(/["']/g, "")
      // מחליף רצף של hyphens בבודד
      .replace(/-+/g, "-")
      // מסיר hyphens מתחילת וסוף המחרוזת
      .replace(/^-+|-+$/g, "")
      .toLowerCase();
  };

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    text: string
  ) => {
    e.preventDefault()
    
    // יוצר ID תקין מהטקסט
    const sanitizedId = createValidId(text);
    
    // בוחר את ה-href המתאים
    const actualHref = (href === '#' || href === '#-' || href.match(/^#\d/) || href.includes('-') || text.includes('?'))
      ? `#${sanitizedId}`
      : href;

    // מקודד את ה-URL להיסטוריה
    const encodedHref = '#' + encodeURIComponent(actualHref.substring(1));
    
    // מכין selector תקין ל-querySelector
    const selector = actualHref.match(/^#\d/)
      ? `#\\3${actualHref.substring(1)}`
      : actualHref;

    console.log({
      originalHref: href,
      text,
      sanitizedId,
      actualHref,
      selector,
      encodedHref
    });

    const targetElement = document.querySelector(selector)
    
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" })
      window.history.pushState(null, "", encodedHref)
    } else {
      console.log('Element not found:', selector)
    }
  }

  if (!tocs.length) {
    return null
  }

  return (
    <div className="flex flex-col gap-3 w-full pl-2">
      <h3 className="text-sm font-semibold rtl:hidden">On this page</h3>
      <h3 className="text-sm font-semibold ltr:hidden">תוכן הדף</h3>
      <ScrollArea className="pt-0.5 pb-4">
        <div className="flex flex-col gap-2.5 text-sm text-neutral-800 dark:text-neutral-300/85">
          {tocs.map(({ href, level, text }, index) => {
            const sanitizedId = createValidId(text);
            const actualHref = (href === '#' || href === '#-' || href.match(/^#\d/) || href.includes('-') || text.includes('?'))
              ? `#${sanitizedId}`
              : href;
            const encodedHref = '#' + encodeURIComponent(actualHref.substring(1));
            
            return (
              <Link
                key={`${href}-${index}`}
                href={encodedHref}
                scroll={false}
                onClick={(e) => handleSmoothScroll(e, href, text)}
                className={clsx({
                  "pl-0": level == 2,
                  "pl-3": level == 3,
                  "pl-6": level == 4,
                }, "rtl:text-right")}
              >
                {text}
              </Link>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}