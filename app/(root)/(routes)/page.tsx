import SearchInput from "@/components/SearchInput";
import Categories from "@/components/Categories";
import { prismaDB } from "@/lib";

const RootPage = async () => {
  const categories = await prismaDB.category.findMany();

  return (
    <div className="h-full p-4 space-y-2">
      <SearchInput />
      <Categories data={categories} />
    </div>
  );
};

export default RootPage;
