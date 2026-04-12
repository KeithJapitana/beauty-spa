import { generateHTML } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import TiptapImage from '@tiptap/extension-image'
import TiptapUnderline from '@tiptap/extension-underline'
import TiptapLink from '@tiptap/extension-link'
import { Highlight } from '@tiptap/extension-highlight'
import { HorizontalRule } from '@tiptap/extension-horizontal-rule'
import type { JSONContent } from '@tiptap/core'

const extensions = [
  StarterKit,
  TiptapImage,
  TiptapUnderline,
  TiptapLink,
  Highlight,
  HorizontalRule,
]

interface NovelRendererProps {
  content: JSONContent | null
}

export function NovelRenderer({ content }: NovelRendererProps) {
  if (!content || Object.keys(content).length === 0) {
    return null
  }

  let html = ''
  try {
    html = generateHTML(content, extensions)
  } catch {
    return null
  }

  return (
    <div
      className="prose prose-lg max-w-none prose-headings:font-semibold prose-headings:text-[#222222] prose-a:text-[#ff385c] prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:shadow-[0_6px_16px_0_rgb(0_0_0/0.12)] prose-blockquote:border-l-[#ff385c] prose-blockquote:text-gray-600"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
