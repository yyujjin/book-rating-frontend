import StarIcon from "./icons/star-icon";

export default function Rating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <StarIcon
            key={i}
            className={`w-5 h-5 ${
              i < Math.floor(rating)
                ? "fill-yellow-300"
                : "fill-white stroke-muted-foreground"
            }`}
          />
        ))}
      </div>
      <div className="text-sm font-medium">{rating}</div>
    </div>
  );
}
