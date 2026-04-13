'use client'

import { generateHTML } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import TiptapImage from '@tiptap/extension-image'
import TiptapUnderline from '@tiptap/extension-underline'
import TiptapLink from '@tiptap/extension-link'
import { Highlight } from '@tiptap/extension-highlight'
import { HorizontalRule } from '@tiptap/extension-horizontal-rule'
import type { JSONContent } from '@tiptap/core'
import { useState, useEffect } from 'react'

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
  const [html, setHtml] = useState<string>('')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    if (!content || Object.keys(content).length === 0) {
      setHtml('')
      return
    }

    try {
      const generated = generateHTML(content, extensions)
      setHtml(generated)
    } catch (err) {
      console.error('[NovelRenderer] Failed to generate HTML:', err)
      setHtml('')
    }
  }, [content])

  // Don't render until client-side hydration to avoid SSR mismatch
  if (!isClient || !html) {
    return null
  }

  return (
    <div
      className="blog-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
