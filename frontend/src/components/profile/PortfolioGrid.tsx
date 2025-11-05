import Avatar from '@/components/Avatar'

export default function PortfolioGrid({ items = [] }: { items?: Array<any> }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {items.map((it) => (
        <div key={it.id} className="bg-white rounded shadow p-4">
          {it.imageUrls && it.imageUrls[0] && (
            <Avatar src={it.avatarUrl} alt={it.title} />
          )}
          <h3 className="font-semibold mt-3">{it.title}</h3>
          <p className="text-sm text-gray-600">{it.description}</p>
        </div>
      ))}
    </div>
  )
}
