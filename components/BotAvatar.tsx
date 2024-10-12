import { type BotAvatarProps } from "@/lib";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const BotAvatar = ({ src }: BotAvatarProps) => {
  return (
    <Avatar className="size-12">
      <AvatarImage src={src} className="object-cover" />
    </Avatar>
  );
};

export default BotAvatar;
