import { Category, Companion, Message } from "@prisma/client";
import { ChangeEvent, FormEvent } from "react";
import { ChatRequestOptions } from "ai";

export type CategoriesProps = {
  data: Category[];
};

export type CompanionIdPageProps = {
  params: {
    companionId: string;
  };
};

export type CompanionFormProps = {
  initialData: Companion | null;
  categories: Category[] | null;
};

export type ImageUploadProps = {
  value: string;
  onChange: (src: string) => void;
  disabled?: boolean;
};

export type RootPageProps = {
  searchParams: {
    categoryId?: string;
    name: string;
  };
};

export type CompanionProps = {
  data: (Companion & { _count: { messages: number } })[] | null;
};

export type ChatPageProps = {
  params: {
    chatId: string;
  };
};

export type ChatClientProps = {
  companion: Companion & {
    messages: Message[];
    _count: { messages: number };
  };
};

export type ChatHeaderProps = {
  companion: Companion & {
    messages: Message[];
    _count: { messages: number };
  };
};

export type BotAvatarProps = {
  src: string;
};

export type ChatFormProps = {
  input: string;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  onSubmit: (
    e: FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions | undefined
  ) => void;
  isLoading: boolean;
};

export type ChatMessagesProps = {
  messages: ChatMessageProps[];
  isLoading: boolean;
  companion: Companion;
};

export type ChatMessageProps = {
  role: "system" | "user";
  content?: string;
  isLoading?: boolean;
  src?: string;
};

export type CompanionKey = {
  companionName: string;
  modelName: string;
  userId: string;
};
