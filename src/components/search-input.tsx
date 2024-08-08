import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function SearchInput() {
  return (
    <form className="flex items-center w-full max-w-md gap-2">
      <Input
        type="search"
        placeholder="Search books..."
        className="flex-1 bg-white rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <Button
        type="submit"
        className="bg-slate-600 transition text-white rounded-r-md px-4 py-2 hover:bg-primary-foreground"
      >
        Search
      </Button>
    </form>
  );
}
