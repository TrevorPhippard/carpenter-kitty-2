interface PostContentProps {
  text?: string
  content?: string
}

export function PostContent({ text, content }: PostContentProps) {
  return (
    <>
      {text && <p className="mt-3 text-sm font-medium leading-6">{text}</p>}
      {content && (
        <p className="mt-2 text-sm text-gray-700 leading-6 whitespace-pre-line">
          {content}
        </p>
      )}
    </>
  )
}
