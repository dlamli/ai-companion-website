import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import { type ChatPageProps, prismaDB } from "@/lib";
import { ChatClient } from "./components/client";

const ChatPage = async ({ params }: ChatPageProps) => {
  const { userId } = auth();

  if (!userId) return auth().redirectToSignIn();

  const companion = await prismaDB.companion.findUnique({
    where: {
      id: params.chatId,
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
        where: {
          userId,
        },
      },
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });

  if (!companion) return redirect("/");

  return <ChatClient companion={companion} />;
};

export default ChatPage;
