"use client";

import { type ChatClientProps } from "@/lib";

import ChatHeader from "@/components/ChatHeader";

export const ChatClient = ({ companion }: ChatClientProps) => {
  return (
    <div className="flex flex-col h-full p-4 space-y-2">
      <ChatHeader companion={companion} />
    </div>
  );
};
