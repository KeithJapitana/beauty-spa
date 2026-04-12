'use client'

import { useParams } from 'next/navigation'
import PostEditorClient from '@/components/blog/post-editor-client'

export default function EditPostPage() {
  const params = useParams()
  return <PostEditorClient postId={params.id as string} />
}
