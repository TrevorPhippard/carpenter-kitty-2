interface PostMediaProps {
  media: Array<string>
}

export function PostMedia({ media }: PostMediaProps) {
  return (
    <div className="w-full max-h-96 overflow-hidden">
      {media.length > 1 ? (
        <div className="grid grid-cols-2 gap-1">
          {media.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`post media ${index + 1}`}
              className="w-full h-48 object-cover"
            />
          ))}
        </div>
      ) : (
        <img src={media[0]} alt="post media" className="w-full object-cover" />
      )}
    </div>
  )
}
