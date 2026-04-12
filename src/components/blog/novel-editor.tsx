'use client'

import {
  EditorRoot,
  EditorContent,
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandList,
  EditorCommandItem,
  EditorBubble,
  EditorBubbleItem,
  type JSONContent,
  StarterKit,
  TiptapImage,
  TiptapUnderline,
  TiptapLink,
  Placeholder,
  HighlightExtension,
  HorizontalRule,
  createImageUpload,
  createSuggestionItems,
} from 'novel'
import { useState } from 'react'
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Highlighter,
  Type,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Minus,
  ImageIcon,
} from 'lucide-react'

const uploadFn = createImageUpload({
  onUpload: async (file) => {
    const form = new FormData()
    form.append('file', file)
    form.append('bucket', 'blog-images')
    const res = await fetch('/api/upload', { method: 'POST', body: form })
    const json = await res.json()
    if (!res.ok) throw new Error(json.error || 'Upload failed')
    return json.url
  },
  validateFn: (file) => {
    if (!file.type.startsWith('image/')) {
      return false
    }
    if (file.size > 5 * 1024 * 1024) {
      return false
    }
    return true
  },
})

const suggestionItems = createSuggestionItems([
  {
    title: 'Text',
    description: 'Plain paragraph',
    icon: <Type className="w-4 h-4" />,
    searchTerms: ['p', 'paragraph'],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleNode('paragraph', 'paragraph').run()
    },
  },
  {
    title: 'Heading 2',
    description: 'Large section heading',
    icon: <Heading2 className="w-4 h-4" />,
    searchTerms: ['h2', 'heading'],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode('heading', { level: 2 }).run()
    },
  },
  {
    title: 'Heading 3',
    description: 'Medium section heading',
    icon: <Heading3 className="w-4 h-4" />,
    searchTerms: ['h3', 'subheading'],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode('heading', { level: 3 }).run()
    },
  },
  {
    title: 'Bullet List',
    description: 'Unordered list',
    icon: <List className="w-4 h-4" />,
    searchTerms: ['ul', 'bullet', 'list'],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run()
    },
  },
  {
    title: 'Numbered List',
    description: 'Ordered list',
    icon: <ListOrdered className="w-4 h-4" />,
    searchTerms: ['ol', 'number', 'list'],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run()
    },
  },
  {
    title: 'Quote',
    description: 'Block quotation',
    icon: <Quote className="w-4 h-4" />,
    searchTerms: ['blockquote', 'quote'],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBlockquote().run()
    },
  },
  {
    title: 'Divider',
    description: 'Horizontal rule',
    icon: <Minus className="w-4 h-4" />,
    searchTerms: ['hr', 'divider', 'line'],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setHorizontalRule().run()
    },
  },
  {
    title: 'Image',
    description: 'Upload an image',
    icon: <ImageIcon className="w-4 h-4" />,
    searchTerms: ['img', 'photo'],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).run()
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = 'image/*'
      input.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0]
        if (!file) return
        const form = new FormData()
        form.append('file', file)
        form.append('bucket', 'blog-images')
        const res = await fetch('/api/upload', { method: 'POST', body: form })
        const json = await res.json()
        if (res.ok && json.url) {
          editor.chain().focus().setImage({ src: json.url }).run()
        }
      }
      input.click()
    },
  },
])

const extensions = [
  StarterKit.configure({ history: false }),
  TiptapImage.configure({ allowBase64: false }),
  TiptapUnderline,
  TiptapLink.configure({ openOnClick: false }),
  Placeholder.configure({ placeholder: 'Start writing or type / for commands...' }),
  HighlightExtension,
  HorizontalRule,
]

interface NovelEditorProps {
  initialContent?: JSONContent
  onChange: (content: JSONContent) => void
}

export function NovelEditor({ initialContent, onChange }: NovelEditorProps) {
  const [openNode, setOpenNode] = useState(false)
  const [openLink, setOpenLink] = useState(false)

  return (
    <div className="relative w-full border rounded-xl border-gray-200 bg-white min-h-[400px]">
      <EditorRoot>
        <EditorContent
          extensions={extensions}
          initialContent={initialContent}
          onUpdate={({ editor }) => onChange(editor.getJSON())}
          editorProps={{
            handleDOMEvents: {
              keydown: (_view, event) => {
                // prevent default slash command from propagating
                return false
              },
            },
            attributes: {
              class:
                'prose prose-sm sm:prose-base lg:prose-lg prose-headings:font-semibold prose-headings:text-[#222222] max-w-none focus:outline-none p-6 min-h-[400px]',
            },
          }}
        >
          {/* Slash command menu */}
          <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-xl border border-gray-200 bg-white px-1 py-2 shadow-[0_6px_16px_0_rgb(0_0_0/0.12)] transition-all">
            <EditorCommandEmpty className="px-2 py-1.5 text-sm text-gray-400">
              No commands found
            </EditorCommandEmpty>
            <EditorCommandList>
              {suggestionItems.map((item) => (
                <EditorCommandItem
                  key={item.title}
                  value={item.title}
                  onCommand={(val) => item.command?.(val)}
                  className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 aria-selected:bg-gray-50"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium">{item.title}</span>
                    <span className="text-xs text-gray-400">{item.description}</span>
                  </div>
                </EditorCommandItem>
              ))}
            </EditorCommandList>
          </EditorCommand>

          {/* Bubble menu for inline formatting */}
          <EditorBubble
            tippyOptions={{ duration: 100 }}
            className="flex items-center gap-0.5 rounded-lg border border-gray-200 bg-white p-1 shadow-[0_6px_16px_0_rgb(0_0_0/0.12)]"
          >
            <EditorBubbleItem
              onSelect={(editor) => editor.chain().focus().toggleBold().run()}
              className="p-0.5"
            >
              <button type="button" className="h-7 w-7 flex items-center justify-center rounded hover:bg-gray-100 transition-colors">
                <Bold className="w-3.5 h-3.5" />
              </button>
            </EditorBubbleItem>
            <EditorBubbleItem
              onSelect={(editor) => editor.chain().focus().toggleItalic().run()}
              className="p-0.5"
            >
              <button type="button" className="h-7 w-7 flex items-center justify-center rounded hover:bg-gray-100 transition-colors">
                <Italic className="w-3.5 h-3.5" />
              </button>
            </EditorBubbleItem>
            <EditorBubbleItem
              onSelect={(editor) => editor.chain().focus().toggleUnderline().run()}
              className="p-0.5"
            >
              <button type="button" className="h-7 w-7 flex items-center justify-center rounded hover:bg-gray-100 transition-colors">
                <Underline className="w-3.5 h-3.5" />
              </button>
            </EditorBubbleItem>
            <EditorBubbleItem
              onSelect={(editor) => editor.chain().focus().toggleStrike().run()}
              className="p-0.5"
            >
              <button type="button" className="h-7 w-7 flex items-center justify-center rounded hover:bg-gray-100 transition-colors">
                <Strikethrough className="w-3.5 h-3.5" />
              </button>
            </EditorBubbleItem>
            <EditorBubbleItem
              onSelect={(editor) => editor.chain().focus().toggleHighlight().run()}
              className="p-0.5"
            >
              <button type="button" className="h-7 w-7 flex items-center justify-center rounded hover:bg-gray-100 transition-colors">
                <Highlighter className="w-3.5 h-3.5" />
              </button>
            </EditorBubbleItem>
          </EditorBubble>
        </EditorContent>
      </EditorRoot>
    </div>
  )
}
