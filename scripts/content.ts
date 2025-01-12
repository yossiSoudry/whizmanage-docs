import { promises as fs } from "fs"
import path from "path"
import { Documents, LocalizedPaths } from "@/settings/documents"
import grayMatter from "gray-matter"
import remarkMdx from "remark-mdx"
import remarkParse from "remark-parse"
import remarkStringify from "remark-stringify"
import { unified } from "unified"
import { Node, Parent } from "unist"
import { visit } from "unist-util-visit"

import { Paths } from "@/lib/pageroutes"

// קבועים
const docsDir = path.join(process.cwd(), "contents/docs")
const outputDir = path.join(process.cwd(), "public", "search-data")

// טיפוסים
interface MdxJsxFlowElement extends Node {
  name: string
  children?: Node[]
}

interface ProcessedDocument {
  slug: string
  title: string
  description: string
  content: string
}

// פונקציות בדיקה (Type Guards)
function isMdxJsxFlowElement(node: Node): node is MdxJsxFlowElement {
  return node.type === "mdxJsxFlowElement" && "name" in node
}

function isRoute(
  node: Paths
): node is Extract<Paths, { href: string; title: string }> {
  return "href" in node && "title" in node
}

// פונקציות עזר
function createSlug(filePath: string): string {
  const relativePath = path.relative(docsDir, filePath)
  const parsed = path.parse(relativePath)
  const slugPath = parsed.dir ? `${parsed.dir}/${parsed.name}` : parsed.name
  const normalizedSlug = slugPath.replace(/\\/g, "/")
  return parsed.name === "index"
    ? `/${parsed.dir.replace(/\\/g, "/")}` || "/"
    : `/${normalizedSlug}`
}

async function ensureDirectoryExists(dir: string) {
  try {
    await fs.access(dir)
  } catch {
    await fs.mkdir(dir, { recursive: true })
  }
}

function findDocumentBySlug(slug: string): Paths | null {
  function searchDocs(docs: (Paths | LocalizedPaths)[]): Paths | null {
    for (const doc of docs) {
      if ("spacer" in doc) continue
      if ("href" in doc) {
        if (doc.href === slug) {
          return {
            title: typeof doc.title === "string" ? doc.title : doc.title.en,
            href: doc.href,
          }
        }
        if (doc.items) {
          const found = searchDocs(doc.items)
          if (found) return found
        }
      }
    }
    return null
  }
  return searchDocs(Documents)
}

// הסרת קומפוננטות מותאמות אישית
function removeCustomComponents() {
  const customComponentNames = [
    "Tabs",
    "TabsList",
    "TabsTrigger",
    "pre",
    "Mermaid",
  ]
  return (tree: Node) => {
    visit(
      tree,
      "mdxJsxFlowElement",
      (node: Node, index: number | null, parent: Parent | null) => {
        if (
          isMdxJsxFlowElement(node) &&
          parent &&
          Array.isArray(parent.children) &&
          customComponentNames.includes(node.name)
        ) {
          parent.children.splice(index!, 1)
        }
      }
    )
  }
}

// עיבוד קובץ MDX
async function processMdxFile(filePath: string): Promise<ProcessedDocument> {
  const rawMdx = await fs.readFile(filePath, "utf-8")
  const { content, data: frontmatter } = grayMatter(rawMdx)

  const plainContent = await unified()
    .use(remarkParse)
    .use(remarkMdx)
    .use(removeCustomComponents)
    .use(remarkStringify)
    .process(content)

  const slug = createSlug(filePath)
  const matchedDoc = findDocumentBySlug(slug)

  return {
    slug,
    title:
      frontmatter.title ||
      (matchedDoc && isRoute(matchedDoc) ? matchedDoc.title : "Untitled"),
    description: frontmatter.description || "",
    content: String(plainContent.value),
  }
}

// איסוף קבצי MDX
async function getMdxFiles(dir: string): Promise<string[]> {
  let files: string[] = []
  const items = await fs.readdir(dir, { withFileTypes: true })

  for (const item of items) {
    const fullPath = path.join(dir, item.name)
    if (item.isDirectory()) {
      files = files.concat(await getMdxFiles(fullPath))
    } else if (item.name.endsWith(".mdx")) {
      files.push(fullPath)
    }
  }

  return files
}

// הפונקציה הראשית
async function convertMdxToJson() {
  try {
    await ensureDirectoryExists(outputDir)
    const mdxFiles = await getMdxFiles(docsDir)

    const documents = await Promise.all(
      mdxFiles.map((file) => processMdxFile(file))
    )

    const outputPath = path.join(outputDir, "documents.json")
    await fs.writeFile(outputPath, JSON.stringify(documents, null, 2))

    console.log("Successfully generated search data")
  } catch (err) {
    console.error("Error processing MDX files:", err)
  }
}

// הפעלה
convertMdxToJson()
