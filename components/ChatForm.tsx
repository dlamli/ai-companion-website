"use client";
import { SendHorizonal } from "lucide-react";

import { ChatFormProps } from "@/lib";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ChatForm = ({
  input,
  handleInputChange,
  onSubmit,
  isLoading,
}: ChatFormProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className="border-t flex border-primary/10 py-4 items-center gap-x-2"
    >
      <Input
        disabled={isLoading}
        value={input}
        onChange={handleInputChange}
        placeholder="Ask a question"
        className="rounded-lg bg-primary/10"
      />
      <Button disabled={isLoading} variant="ghost">
        <SendHorizonal className="size-6" />
      </Button>
    </form>
  );
};

export default ChatForm;
