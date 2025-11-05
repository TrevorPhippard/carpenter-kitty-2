export default function ReviewsList({
  reviews = [],
}: {
  reviews?: Array<any>
}) {
  return (
    <div className="space-y-3">
      {reviews.map((r) => (
        <div key={r.id} className="bg-white rounded shadow p-3">
          <div className="flex justify-between items-center">
            <div className="font-medium">{r.reviewerName}</div>
            <div className="text-sm">⭐ {r.rating}</div>
          </div>
          <p className="text-sm text-gray-700 mt-2">{r.text}</p>
        </div>
      ))}
    </div>
  )
}
