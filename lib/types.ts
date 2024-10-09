import { Category, Companion } from "@prisma/client";

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
