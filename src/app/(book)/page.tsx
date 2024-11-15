/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/6xrMay5lJtg
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import SearchInput from "@/components/search-input";
import BookList from "@/components/book/book-list";
import BookAdd from "@/components/book/book-add";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";

export default function Home() {
  return (
    <>
      <div className="container mx-auto py-8 px-4 md:px-6">
        {/* TODO: */}
        {/* <div className="flex items-center justify-between mb-6">
          <SearchInput />
        </div> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="relative overflow-hidden rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2 transition-transform duration-300 ease-in-out cursor-pointer">
            <Link href="/add-book">
              <div className="flex items-center justify-center h-full">
                <Button
                  size="lg"
                  variant="ghost"
                  className="transition-transform duration-300 text-gray-700 hover:bg-primary/10 group-hover:scale-125 group-hover:text-gray-800"
                >
                  <PlusIcon className="w-6 h-6" />
                  Add Book
                </Button>
              </div>
            </Link>
          </div>

          <BookList />
        </div>
      </div>
    </>
  );
}
