import StarIcon from "./icons/star-icon";

export default function Rating({
  rating,
  valueShow = false,
}: {
  rating: number;
  valueShow?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <StarIcon
            key={i}
            className={`w-5 h-5 ${
              i < Math.floor(rating) ? "fill-amber-400" : "fill-gray-300"
            }`}
          />
        ))}
      </div>
      <div className="text-sm font-medium">{valueShow && rating}</div>
    </div>
  );
}
