"use client"

import type { ReactElement } from "react"
import { useEffect, useRef } from "react"
import cn from "clsx"
import { LuArrowUp } from "react-icons/lu"

function ScrollUp() {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
}

export function BackToTop({ className }: { className?: string }): ReactElement {
  const ref = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    function toggleVisible() {
      const { scrollTop } = document.documentElement
      if (ref.current) {
        ref.current.classList.toggle("opacity-0", scrollTop < 300)
      }
    }

    window.addEventListener("scroll", toggleVisible)
    return () => {
      window.removeEventListener("scroll", toggleVisible)
    }
  }, [])

  return (
    <button
      ref={ref}
      onClick={ScrollUp}
      className={cn("flex items-center ml-2 transition opacity-0 gap-1 rounded-sm text-xs border py-1 px-2 hover:bg-muted rtl:flex-row-reverse", className)}
    >
      <LuArrowUp className="inline-block w-4 h-4 align-middle" />
      <span className="rtl:hidden">Scroll to top</span>
      <span className="ltr:hidden">גלול לראש הדף</span>
    </button>
  )
}
