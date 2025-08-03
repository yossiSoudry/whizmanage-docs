import { PageRoutes } from "@/lib/pageroutes";
export const Navigations = [
    {
        title: {
            en: "Docs",
            he: "מרכז המידע",
        },
        href: `/docs${PageRoutes[0].href}`,
    },
    {
        title: {
            en: "Home",
            he: "אתר הבית"
        },
        href: "https://www.whizmanage.com/",
        external: true,
    },
];
export const GitHubLink = {
    href: "https://github.com/whizmanagevi/whizmanage-documents",
};
