import clsx from 'clsx'

interface AvatarProps {
  src?: string
  alt?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'User avatar',
  size = 'md',
  className,
}) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-20 w-20',
  }[size]

  return (
    <div
      className={clsx(
        'rounded-full overflow-hidden bg-gray-200',
        sizeClasses,
        className,
      )}
    >
      {src ? (
        <img src={src} alt={alt} className="object-cover w-full h-full" />
      ) : (
        <div className="flex items-center justify-center h-full w-full text-gray-500 font-medium">
          {alt.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  )
}
