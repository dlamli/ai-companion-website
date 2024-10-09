import { CompanionIdPageProps, prismaDB } from "@/lib";
import { CompanionForm } from "./components/CompanionForm";

const CompanionIdPage = async ({ params }: CompanionIdPageProps) => {
  //TODO: Check subscription

  const companion = await prismaDB.companion.findUnique({
    where: { id: params.companionId },
  });

  const categories = await prismaDB.category.findMany();

  return <CompanionForm initialData={companion} categories={categories} />;
};

export default CompanionIdPage;
