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
      he: "מבוא"
    },
    href: "/introduction", 
    heading: {
      en: "Getting started",
      he: "צעדים ראשונים"
    },
    items: [
      {
        title: {
          en: "Installation",
          he: "התקנה"
        },
        href: "/installation",
      },
      {
        title: {
          en: "Setup", 
          he: "הגדרות ראשוניות"
        },
        href: "/setup",
      },
      // {
      //   title: {
      //     en: "Changelog",
      //     he: "היסטוריית שינויים"  
      //   },
      //   href: "/changelog",
      // },
    ],
  },
  {
    spacer: true,
  },
  {
    title: {
      en: "Import Products",
      he: "ייבוא מוצרים"
    },
    href: "/import",
    heading: {
      en: "Documents",
      he: "מסמכים"
    },
    items: [
      // {
      //   title: {
      //     en: "Overview",
      //     he: "סקירה כללית"
      //   },
      //   href: "/",
      // },
      // {
      //   title: {
      //     en: "Import Process", 
      //     he: "תהליך הייבוא"
      //   },
      //   href: "/process",
      // },
      {
        title: {
          en: "Google Sheets Import", 
          he: "ייבוא מטבלת גוגל שיטס"
        },
        href: "/spreadsheet",
      },
      // {
      //   title: {
      //     en: "WooCommerce Import", 
      //     he: "ייבוא מקבצי WooCommerce"
      //   },
      //   href: "/woocommerce",
      // },
      // {
      //   title: {
      //     en: "WhizManage Import", 
      //     he: "ייבוא מקבצי WhizManage"
      //   },
      //   href: "/whizmanage",
      // },
      // {
      //   title: {
      //     en: "Review Mode", 
      //     he: "מצב סקירה ועריכה"
      //   },
      //   href: "/review",
      // },
    ],
  },
  {
    title: {
      en: "Variations",
      he: "ווריאציות"
    },
    href: "/variations",
    items: [
      {
        title: {
          en: "Attributes",
          he: "תכונות"
        },
        href: "/attributes",
      },
      {
        title: {
          en: "Options", 
          he: "אופציות"
        },
        href: "/options",
      },
      {
        title: {
          en: "Create variations",
          he: "יצירת ווריאציות"  
        },
        href: "/creation",
      },
      {
        title: {
          en: "Manage variations",
          he: "ניהול ווריאציות"  
        },
        href: "/management",
      },
    ],
  },
  // {
  //   title: {
  //     en: "Structure",
  //     he: "מבנה"
  //   },
  //   href: "/structure",
  //   items: [
  //     {
  //       title: {
  //         en: "Deep",
  //         he: "עמוק"
  //       },
  //       href: "/deep",
  //       items: [
  //         {
  //           title: {
  //             en: "Deeper",
  //             he: "עמוק יותר"
  //           },
  //           href: "/deeper",
  //           items: [
  //             {
  //               title: {
  //                 en: "Even deeper",
  //                 he: "עמוק מאוד"
  //               },
  //               href: "/even-deeper",
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  // },
  {
    spacer: true,
  },
  // {
  //   title: {
  //     en: "Markdown",
  //     he: "מארקדאון"
  //   },
  //   href: "/markdown",
  //   heading: {
  //     en: "Components",
  //     he: "רכיבים"
  //   },
  //   items: [
  //     {
  //       title: {
  //         en: "Cards",
  //         he: "כרטיסים"
  //       },
  //       href: "/cards",
  //     },
  //     {
  //       title: {
  //         en: "Diagrams",
  //         he: "תרשימים"
  //       },
  //       href: "/diagrams",
  //     },
  //     {
  //       title: {
  //         en: "Filetree",
  //         he: "עץ קבצים"
  //       },
  //       href: "/filetree",
  //     },
  //     {
  //       title: {
  //         en: "Lists",
  //         he: "רשימות"
  //       },
  //       href: "/lists",
  //     },
  //     {
  //       title: {
  //         en: "Maths",
  //         he: "מתמטיקה"
  //       },
  //       href: "/maths",
  //     },
  //     {
  //       title: {
  //         en: "Notes",
  //         he: "הערות"
  //       },
  //       href: "/notes",
  //     },
  //     {
  //       title: {
  //         en: "Steps",
  //         he: "שלבים"
  //       },
  //       href: "/steps",
  //     },
  //     {
  //       title: {
  //         en: "Table",
  //         he: "טבלה"
  //       },
  //       href: "/table",
  //     },
  //     {
  //       title: {
  //         en: "Tabs",
  //         he: "לשוניות"
  //       },
  //       href: "/tabs",
  //     },
  //   ],
  // },
 ]


export function getLocalizedContent(content: LocalizedContent | undefined, lang: string): string {
  if (!content) return '';
  return content[lang as keyof LocalizedContent] || content.en;
}

export function getLocalizedDocuments(lang: string): Paths[] {
  function processItem(item: LocalizedPaths): Paths {
    if ('spacer' in item) return item;
    
    return {
      title: getLocalizedContent(item.title, lang),
      href: item.href,
      heading: item.heading ? getLocalizedContent(item.heading, lang) : undefined,
      items: item.items?.map(processItem)
    };
  }

  return Documents.map(processItem);
}
