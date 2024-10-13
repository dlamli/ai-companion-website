"use client";
import { useTheme } from "next-themes";
import { BeatLoader } from "react-spinners";
import { Copy } from "lucide-react";

import { ChatMessageProps, cn } from "@/lib";
import { useToast } from "@/hooks/use-toast";
import BotAvatar from "@/components/BotAvatar";
import UserAvatar from "@/components/UserAvatar";
import { Button } from "./ui/button";

const ChatMessage = ({ role, content, isLoading, src }: ChatMessageProps) => {
  const { toast } = useToast();
  const { theme } = useTheme();

  const handleCopy = () => {
    if (!content) return;

    navigator.clipboard.writeText(content);
    toast({
      description: "Message copied to clipboard",
    });
  };

  return (
    <div
      className={cn(
        "group flex items-center gap-x-3 py-4 w-full",
        role === "user" ? "justify-end" : "justify-start"
      )}
    >
      {role !== "user" && src && <BotAvatar src={src} />}
      <div className="rounded-md px-4 py-2 max-w-sm text-sm bg-primary/10">
        {isLoading ? (
          <BeatLoader size={5} color={theme === "light" ? "black" : "white"} />
        ) : (
          content
        )}
      </div>
      {role === "user" && <UserAvatar />}
      {role !== "user" && !isLoading && (
        <Button
          onClick={handleCopy}
          className="opacity-0 group-hover:opacity-100 transition"
          size="icon"
          variant="ghost"
        >
          <Copy className="size-4" />
        </Button>
      )}
    </div>
  );
};

export default ChatMessage;
