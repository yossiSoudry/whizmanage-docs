import { getLocalizedDocuments } from "@/settings/documents"

import { SupportedLanguage } from "@/app/[lang]/layout"

// הטיפוס המקורי נשאר לשימוש פנימי
export type Paths =
  | {
      title: string
      href: string
      noLink?: true
      heading?: string
      items?: Paths[]
    }
  | {
      spacer: true
    }

// פונקציה שמקבלת שפה ומחזירה את הניתובים המתורגמים
export function getRoutes(lang: SupportedLanguage): Paths[] {
  return getLocalizedDocuments(lang)
}

type Page = { title: string; href: string }

function isRoute(
  node: Paths
): node is Extract<Paths, { title: string; href: string }> {
  return "title" in node && "href" in node
}

function getAllLinks(node: Paths): Page[] {
  const pages: Page[] = []

  if (isRoute(node) && !node.noLink) {
    pages.push({ title: node.title, href: node.href })
  }

  if (isRoute(node) && node.items) {
    node.items.forEach((subNode) => {
      if (isRoute(subNode)) {
        const temp = { ...subNode, href: `${node.href}${subNode.href}` }
        pages.push(...getAllLinks(temp))
      }
    })
  }

  return pages
}

// פונקציה שמחזירה את כל הנתיבים לפי שפה
export function getPageRoutes(lang: SupportedLanguage): Page[] {
  const routes = getRoutes(lang)
  return routes.map((it) => getAllLinks(it)).flat()
}

// ייצוא ברירת מחדל באנגלית לתאימות לאחור
export const Routes: Paths[] = getRoutes("en")
export const PageRoutes = getPageRoutes("en")
