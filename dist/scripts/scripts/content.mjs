import { promises as fs } from "fs";
import path from "path";
import { Documents } from "../settings/documents.mjs";
import grayMatter from "gray-matter";
import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import { visit } from "unist-util-visit";
// קבועים
const docsDir = path.join(process.cwd(), "contents/docs");
const outputDir = path.join(process.cwd(), "public", "search-data");
// פונקציות בדיקה (Type Guards)
function isMdxJsxFlowElement(node) {
    return node.type === "mdxJsxFlowElement" && "name" in node;
}
function isRoute(node) {
    return "href" in node && "title" in node;
}
// פונקציות עזר
function createSlug(filePath) {
    const relativePath = path.relative(docsDir, filePath);
    const parsed = path.parse(relativePath);
    const slugPath = parsed.dir ? `${parsed.dir}/${parsed.name}` : parsed.name;
    const normalizedSlug = slugPath.replace(/\\/g, "/");
    return parsed.name === "index"
        ? `/${parsed.dir.replace(/\\/g, "/")}` || "/"
        : `/${normalizedSlug}`;
}
async function ensureDirectoryExists(dir) {
    try {
        await fs.access(dir);
    }
    catch {
        await fs.mkdir(dir, { recursive: true });
    }
}
function findDocumentBySlug(slug) {
    function searchDocs(docs) {
        for (const doc of docs) {
            if ("spacer" in doc)
                continue;
            if ("href" in doc) {
                if (doc.href === slug) {
                    return {
                        title: typeof doc.title === "string" ? doc.title : doc.title.en,
                        href: doc.href,
                    };
                }
                if (doc.items) {
                    const found = searchDocs(doc.items);
                    if (found)
                        return found;
                }
            }
        }
        return null;
    }
    return searchDocs(Documents);
}
// הסרת קומפוננטות מותאמות אישית
function removeCustomComponents() {
    const customComponentNames = [
        "Tabs",
        "TabsList",
        "TabsTrigger",
        "pre",
        "Mermaid",
    ];
    return (tree) => {
        visit(tree, "mdxJsxFlowElement", (node, index, parent) => {
            if (isMdxJsxFlowElement(node) &&
                parent &&
                Array.isArray(parent.children) &&
                customComponentNames.includes(node.name)) {
                parent.children.splice(index, 1);
            }
        });
    };
}
// עיבוד קובץ MDX
async function processMdxFile(filePath) {
    const rawMdx = await fs.readFile(filePath, "utf-8");
    const { content, data: frontmatter } = grayMatter(rawMdx);
    const plainContent = await unified()
        .use(remarkParse)
        .use(remarkMdx)
        .use(removeCustomComponents)
        .use(remarkStringify)
        .process(content);
    const slug = createSlug(filePath);
    const matchedDoc = findDocumentBySlug(slug);
    return {
        slug,
        title: frontmatter.title ||
            (matchedDoc && isRoute(matchedDoc) ? matchedDoc.title : "Untitled"),
        description: frontmatter.description || "",
        content: String(plainContent.value),
    };
}
// איסוף קבצי MDX
async function getMdxFiles(dir) {
    let files = [];
    const items = await fs.readdir(dir, { withFileTypes: true });
    for (const item of items) {
        const fullPath = path.join(dir, item.name);
        if (item.isDirectory()) {
            files = files.concat(await getMdxFiles(fullPath));
        }
        else if (item.name.endsWith(".mdx")) {
            files.push(fullPath);
        }
    }
    return files;
}
// הפונקציה הראשית
async function convertMdxToJson() {
    try {
        await ensureDirectoryExists(outputDir);
        const mdxFiles = await getMdxFiles(docsDir);
        const documents = await Promise.all(mdxFiles.map((file) => processMdxFile(file)));
        const outputPath = path.join(outputDir, "documents.json");
        await fs.writeFile(outputPath, JSON.stringify(documents, null, 2));
        console.log("Successfully generated search data");
    }
    catch (err) {
        console.error("Error processing MDX files:", err);
    }
}
// הפעלה
convertMdxToJson();
