import StarIcon from "./icons/star-icon";

export default function StarGroup({ rating }: { rating: number }) {
  return [...Array(5)].map((_, i) => (
    <StarIcon
      key={i}
      className={`w-5 h-5 ${
        i < Math.floor(rating)
          ? "fill-primary"
          : "fill-muted stroke-muted-foreground"
      }`}
    />
  ));
}
