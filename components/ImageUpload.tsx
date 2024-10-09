"use client";

import { useEffect, useState } from "react";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";

import { ImageUploadProps } from "@/lib";

const ImageUpload = ({ value, onChange }: ImageUploadProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="space-y-4 w-full flex flex-col justify-center items-center">
      <CldUploadButton
        onSuccess={(result: any) => onChange(result?.info?.secure_url)}
        options={{ maxFiles: 1 }}
        uploadPreset="jyvgullx"
      >
        <div className="p-4 border-4 border-dashed border-primary/10 rounded-lg hover:opacity-75 transition flex flex-col space-y-2 items-center justify-center">
          <div className="relative size-40">
            <Image
              fill
              alt="Upload image"
              className="rounded-lg object-cover"
              src={value || "/placeholder.svg"}
            />
          </div>
        </div>
      </CldUploadButton>
    </div>
  );
};

export default ImageUpload;
