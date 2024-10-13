import { auth } from "@clerk/nextjs/server";

import { CompanionIdPageProps, prismaDB } from "@/lib";
import { CompanionForm } from "./components/CompanionForm";

const CompanionIdPage = async ({ params }: CompanionIdPageProps) => {
  const { userId } = auth();
  //TODO: Check subscription

  if (!userId) return auth().redirectToSignIn();

  const companion = await prismaDB.companion.findUnique({
    where: { id: params.companionId, userId },
  });

  const categories = await prismaDB.category.findMany();

  return <CompanionForm initialData={companion} categories={categories} />;
};

export default CompanionIdPage;
