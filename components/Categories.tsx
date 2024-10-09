"use client";

import qs from "query-string";
import { type CategoriesProps, cn } from "@/lib";
import { useRouter, useSearchParams } from "next/navigation";

const Categories = ({ data }: CategoriesProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryId = searchParams.get("categoryId");

  const handleClick = (id: string | undefined) => {
    const query = { categoryId: id };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );

    router.push(url);
  };

  return (
    <div className="w-full overflow-auto space-x-2 flex p-1 pb-4">
      <button
        onClick={() => handleClick(undefined)}
        className={cn(
          `flex items-center text-center text-xs px-2 md:px-4 py-2 md:px-4 rounded-md bg-primary/10 hover:opacity-75 transition`,
          !categoryId ? "bg-primary/25" : "bg-primary/10"
        )}
      >
        Newest
      </button>
      {data.map((category) => (
        <button
          onClick={() => handleClick(category.id)}
          key={category.id}
          className={cn(
            `flex items-center text-center text-xs px-2 md:px-4 py-2 md:py-4 rounded-md bg-primary/10 hover:opacity-75 transition`,
            category.id === categoryId ? "bg-primary/25" : "bg-primary/10"
          )}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default Categories;
