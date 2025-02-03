import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { LuChevronDown, LuChevronRight } from "react-icons/lu"

import { Paths } from "@/lib/pageroutes"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { SheetClose } from "@/components/ui/sheet"
import Anchor from "@/components/navigation/anchor"

// הגדרת טיפוס בסיסי לראוט
type BaseRoute = {
  title: string
  href: string
  noLink?: true
  heading?: string
  items?: Paths[]
}

// הגדרת טיפוס למרווח
type SpacerRoute = {
  spacer: true
}

// הרחבת הטיפוס של SubLinkProps
interface SubLinkProps extends Omit<BaseRoute, 'items'> {
  level: number
  isSheet: boolean
  lang: string
  items?: (BaseRoute | SpacerRoute)[]
}

function isRoute(
  item: BaseRoute | SpacerRoute
): item is BaseRoute {
  return "title" in item && "href" in item
}

export default function SubLink(props: SubLinkProps) {
  const path = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const isRTL = props.lang === 'he'

  useEffect(() => {
    if (props.href && path !== props.href && path.includes(props.href)) {
      setIsOpen(true)
    }
  }, [path, props.href])

  const { title, href, items, noLink, level, isSheet, lang } = props

  const Comp = (
    <Anchor activeClassName="text-fuchsia-500 text-sm font-bold" href={href}>
      {title}
    </Anchor>
  )

  const titleOrLink = !noLink ? (
    isSheet ? (
      <SheetClose asChild>{Comp}</SheetClose>
    ) : (
      Comp
    )
  ) : (
    <h2 className="font-medium text-primary sm:text-sm">{title}</h2>
  )

  if (!items) {
    return (
      <div className={cn(
        "flex flex-col text-sm hover:underline",
        isRTL && "text-right"
      )}>
        {titleOrLink}
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full gap-1">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className={cn(
          "flex items-center gap-2 text-sm",
          isRTL ? "mr-0 flex-row-reverse" : ""
        )}>
          {titleOrLink}
          <CollapsibleTrigger asChild>
            <Button 
              className={cn(
                "h-6 w-6",
                isRTL ? "mr-auto ml-0" : "ml-auto",
                "rtl:transform-none"
              )} 
              variant="link" 
              size="icon"
            >
              {!isOpen ? (
                <LuChevronRight className={cn(
                  "h-[0.9rem] w-[0.9rem]",
                  isRTL && "rotate-180"
                )} />
              ) : (
                <LuChevronDown className="h-[0.9rem] w-[0.9rem]" />
              )}
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="CollapsibleContent">
          <div
            className={cn(
              "mt-2.5 flex flex-col gap-3 text-sm border-l text-neutral-800 dark:text-neutral-300/85",
              isRTL ? "items-end border-r border-l-0 pr-4" : "items-start pl-4",
              level > 0 && cn(
                isRTL ? "mr-1 pr-4" : "ml-1 pl-4",
                // "border-l"
              )
            )}
          >
            {items?.map((innerLink) => {
              if (!isRoute(innerLink)) {
                return null
              }

              const modifiedItems = {
                ...innerLink,
                href: `${href}${innerLink.href}`,
                level: level + 1,
                isSheet,
                lang
              }

              return <SubLink key={modifiedItems.href} {...modifiedItems} />
            })}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}