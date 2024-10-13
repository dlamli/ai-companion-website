"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@clerk/nextjs";

const UserAvatar = () => {
  const { user } = useUser();

  return (
    <Avatar className="size-12">
      <AvatarImage src={user?.imageUrl} className="object-cover" />
    </Avatar>
  );
};

export default UserAvatar;
