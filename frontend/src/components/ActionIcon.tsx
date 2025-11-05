export function ActionIcon({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-xs">
        {label.charAt(0)}
      </div>
      <div className="hidden md:block text-xs">{label}</div>
    </div>
  )
}
