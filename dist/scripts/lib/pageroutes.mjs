import { getLocalizedDocuments } from "@/settings/documents";
// פונקציה שמקבלת שפה ומחזירה את הניתובים המתורגמים
export function getRoutes(lang) {
    return getLocalizedDocuments(lang);
}
function isRoute(node) {
    return "title" in node && "href" in node;
}
function getAllLinks(node) {
    const pages = [];
    if (isRoute(node) && !node.noLink) {
        pages.push({ title: node.title, href: node.href });
    }
    if (isRoute(node) && node.items) {
        node.items.forEach((subNode) => {
            if (isRoute(subNode)) {
                const temp = { ...subNode, href: `${node.href}${subNode.href}` };
                pages.push(...getAllLinks(temp));
            }
        });
    }
    return pages;
}
// פונקציה שמחזירה את כל הנתיבים לפי שפה
export function getPageRoutes(lang) {
    const routes = getRoutes(lang);
    return routes.map((it) => getAllLinks(it)).flat();
}
// ייצוא ברירת מחדל באנגלית לתאימות לאחור
export const Routes = getRoutes("en");
export const PageRoutes = getPageRoutes("en");
