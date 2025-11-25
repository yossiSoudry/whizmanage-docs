import { Paths } from "@/lib/pageroutes"

type LocalizedContent = {
  en: string
  he: string
}

// הרחבת הטיפוס Paths לתמיכה בתוכן מתורגם
export type LocalizedPaths =
  | {
      title: LocalizedContent
      href: string
      heading?: LocalizedContent
      items?: LocalizedPaths[]
    }
  | {
      spacer: true
    }

// settings/documents.ts
export const Documents: LocalizedPaths[] = [
  {
    title: {
      en: "Introduction",
      he: "מבוא",
    },
    href: "/introduction",
    heading: {
      en: "Getting started",
      he: "צעדים ראשונים",
    },
    items: [
      {
        title: {
          en: "Installation",
          he: "התקנה",
        },
        href: "/installation",
      },
      {
        title: {
          en: "Setup",
          he: "הגדרות ראשוניות",
        },
        href: "/setup",
      },
    ],
  },
  {
    title: {
      en: "Import Products",
      he: "ייבוא מוצרים",
    },
    href: "/import",
    heading: {
      en: "Features",
      he: "פיצ'רים",
    },
    items: [
      {
        title: {
          en: "Google Sheets Import",
          he: "ייבוא מטבלת גוגל שיטס",
        },
        href: "/spreadsheet",
      },
    ],
  },
  {
    title: {
      en: "Variations",
      he: "ווריאציות",
    },
    href: "/variations",
    items: [
      {
        title: {
          en: "Attributes",
          he: "תכונות",
        },
        href: "/attributes",
      },
      {
        title: {
          en: "Options",
          he: "אופציות",
        },
        href: "/options",
      },
      {
        title: {
          en: "Create variations",
          he: "יצירת ווריאציות",
        },
        href: "/creation",
      },
      {
        title: {
          en: "Manage variations",
          he: "ניהול ווריאציות",
        },
        href: "/management",
      },
    ],
  },
  {
    title: {
      en: "Discount Rules",
      he: "חוקי הנחות",
    },
    href: "/discount-rules",
    items: [
      {
        title: {
          en: "Creating Rules",
          he: "יצירת חוקים",
        },
        href: "/creating",
      },
      {
        title: {
          en: "Rule Types",
          he: "סוגי חוקים",
        },
        href: "/types",
      },
      {
        title: {
          en: "Conditions",
          he: "תנאים",
        },
        href: "/conditions",
      },
      {
        title: {
          en: "Managing Rules",
          he: "ניהול חוקים",
        },
        href: "/managing",
      },
    ],
  },
  {
    spacer: true,
  },
  {
    spacer: true,
  },
  {
    spacer: true,
  },
  {
    spacer: true,
  },
  {
    spacer: true,
  },
  {
    spacer: true,
  },
  {
    spacer: true,
  },
  {
    spacer: true,
  },
  {
    spacer: true,
  },
  {
    spacer: true,
  },
  {
    spacer: true,
  },
  {
    spacer: true,
  },
  {
    spacer: true,
  },
  {
    spacer: true,
  },
  {
    spacer: true,
  },
  {
    title: {
      en: "Terms & Conditions",
      he: "תנאים והגבלות",
    },
    href: "/terms-conditions",
    heading: {
      en: "Policies",
      he: "מדיניות",
    },
    items: [
      {
        title: {
          en: "Terms of Use",
          he: "תנאי שימוש",
        },
        href: "/terms-of-use",
      },
      {
        title: {
          en: "Purchase Policy",
          he: "מדיניות רכישה",
        },
        href: "/purchase-policy",
      },
      {
        title: {
          en: "Support Services",
          he: "שירותי תמיכה",
        },
        href: "/support-services",
      },
      {
        title: {
          en: "Privacy Policy",
          he: "מדיניות פרטיות",
        },
        href: "/privacy-policy",
      },
    ],
  },
]

export function getLocalizedContent(
  content: LocalizedContent | undefined,
  lang: string
): string {
  if (!content) return ""
  return content[lang as keyof LocalizedContent] || content.en
}

export function getLocalizedDocuments(lang: string): Paths[] {
  function processItem(item: LocalizedPaths): Paths {
    if ("spacer" in item) return item

    return {
      title: getLocalizedContent(item.title, lang),
      href: item.href,
      heading: item.heading
        ? getLocalizedContent(item.heading, lang)
        : undefined,
      items: item.items?.map(processItem),
    }
  }

  return Documents.map(processItem)
}
