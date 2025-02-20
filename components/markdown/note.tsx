import { PropsWithChildren } from "react"
import clsx from "clsx"

import { cn } from "@/lib/utils"

type NoteProps = PropsWithChildren & {
  title?: string
  type?: "note" | "success" | "warning" | "danger"
}

export default function Note({
  children,
  title = "Note",
  type = "note",
}: NoteProps) {
  const noteClassNames = clsx({
    "dark:!bg-slate-950 bg-slate-100": type == "note",
    "dark:bg-green-950 bg-green-100 border-green-200 dark:border-green-900":
      type === "success",
    "dark:bg-fuchsia-950/60 bg-fuchsia-100 border-fuchsia-200 dark:border-fuchsia-900 text-fuchsia-800 dark:text-fuchsia-300":
      type === "warning",
    "dark:bg-red-950/60 bg-red-100 border-red-200 dark:border-red-900":
      type === "danger",
  })

  return (
    <div
      className={cn(
        "border rounded-md py-0.5 px-3.5 text-sm tracking-wide",
        noteClassNames
      )}
    >
      <p className="font-semibold -mb-3">{title}:</p> {children}
    </div>
  )
}
