import { createReadStream, promises as fs } from "fs"
import path from "path"
import { GitHubLink } from "@/settings/navigation"
import { Element, Text } from "hast"
import { compileMDX } from "next-mdx-remote/rsc"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeCodeTitles from "rehype-code-titles"
import rehypeKatex from "rehype-katex"
import rehypePrism from "rehype-prism-plus"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import { Node } from "unist"
import { visit } from "unist-util-visit"

import { components } from "@/lib/components"
import { Settings } from "@/lib/meta"
import { getPageRoutes } from "@/lib/pageroutes"
import { SupportedLanguage } from "@/app/[lang]/layout"

declare module "hast" {
  interface Element {
    raw?: string
  }
}

type BaseMdxFrontmatter = {
  title: string
  description: string
  keywords: string
}

const headingsRegex = /^(#{2,4})\s(.+)$/gm

async function parseMdx<Frontmatter>(rawMdx: string) {
  return await compileMDX<Frontmatter>({
    source: rawMdx,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [
          preCopy,
          rehypeCodeTitles,
          rehypeKatex,
          rehypePrism,
          rehypeSlug,
          rehypeAutolinkHeadings,
          postCopy,
        ],
        remarkPlugins: [remarkGfm],
      },
    },
    components,
  })
}

const computeDocumentPath = (slug: string, lang: string) => {
  return Settings.gitload
    ? `${GitHubLink.href}/raw/main/contents/docs/${lang}/${slug}/index.mdx`
    : path.join(process.cwd(), "contents/docs", lang, `${slug}/index.mdx`)
}

const getDocumentPath = (() => {
  const cache = new Map<string, string>()
  return (slug: string, lang: string) => {
    const key = `${lang}:${slug}`
    if (!cache.has(key)) {
      cache.set(key, computeDocumentPath(slug, lang))
    }
    return cache.get(key)!
  }
})()

export async function getDocument(slug: string, lang: string) {
  try {
    const contentPath = getDocumentPath(slug, lang)
    let rawMdx = ""
    let lastUpdated: string | null = null

    if (Settings.gitload) {
      const response = await fetch(contentPath)
      if (!response.ok) {
        throw new Error(
          `Failed to fetch content from GitHub: ${response.statusText}`
        )
      }
      rawMdx = await response.text()
      lastUpdated = response.headers.get("Last-Modified") ?? null
    } else {
      rawMdx = await fs.readFile(contentPath, "utf-8")
      const stats = await fs.stat(contentPath)
      lastUpdated = stats.mtime.toISOString()
    }

    const parsedMdx = await parseMdx<BaseMdxFrontmatter>(rawMdx)
    const tocs = await getTable(slug, lang)

    return {
      frontmatter: parsedMdx.frontmatter,
      content: parsedMdx.content,
      tocs,
      lastUpdated,
    }
  } catch (err) {
    console.error(err)
    return null
  }
}

export async function getTable(
  slug: string,
  lang: string
): Promise<Array<{ level: number; text: string; href: string }>> {
  const extractedHeadings: Array<{
    level: number
    text: string
    href: string
  }> = []
  let rawMdx = ""

  if (Settings.gitload) {
    const contentPath = `${GitHubLink.href}/raw/main/contents/docs/${lang}/${slug}/index.mdx`
    try {
      const response = await fetch(contentPath)
      if (!response.ok) {
        throw new Error(
          `Failed to fetch content from GitHub: ${response.statusText}`
        )
      }
      rawMdx = await response.text()
    } catch (error) {
      console.error("Error fetching content from GitHub:", error)
      return []
    }
  } else {
    const contentPath = path.join(
      process.cwd(),
      "contents/docs",
      lang,
      `${slug}/index.mdx`
    )
    try {
      const stream = createReadStream(contentPath, { encoding: "utf-8" })
      for await (const chunk of stream) {
        rawMdx += chunk
      }
    } catch (error) {
      console.error("Error reading local file:", error)
      return []
    }
  }

  let match
  while ((match = headingsRegex.exec(rawMdx)) !== null) {
    const level = match[1].length
    const text = match[2].trim()
    extractedHeadings.push({
      level: level,
      text: text,
      href: `#${innerslug(text)}`,
    })
  }

  return extractedHeadings
}

function innerslug(text: string) {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
}

// יצירת מפה נפרדת לכל שפה
function createPathIndexMap(lang: SupportedLanguage) {
  const localizedRoutes = getPageRoutes(lang)
  return new Map(localizedRoutes.map((route, index) => [route.href, index]))
}

const pathIndexMaps = {
  en: createPathIndexMap("en"),
  he: createPathIndexMap("he"),
}

export function getPreviousNext(path: string, lang: SupportedLanguage) {
  const pathIndexMap = pathIndexMaps[lang]
  const index = pathIndexMap.get(`/${path}`)

  if (index === undefined || index === -1) {
    return { prev: null, next: null }
  }

  const routes = getPageRoutes(lang)
  const prev = index > 0 ? routes[index - 1] : null
  const next = index < routes.length - 1 ? routes[index + 1] : null

  return { prev, next }
}

const preCopy = () => (tree: Node) => {
  visit(tree, "element", (node: Element) => {
    if (node.tagName === "pre") {
      const [codeEl] = node.children as Element[]
      if (codeEl?.tagName === "code") {
        const textNode = codeEl.children?.[0] as Text
        node.raw = textNode?.value || ""
      }
    }
  })
}

const postCopy = () => (tree: Node) => {
  visit(tree, "element", (node: Element) => {
    if (node.tagName === "pre" && node.raw) {
      node.properties = node.properties || {}
      node.properties["raw"] = node.raw
    }
  })
}
