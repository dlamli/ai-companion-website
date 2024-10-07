"use client";

import { Menu, Sparkle } from "lucide-react";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { UserButton } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import MobileSidebar from "@/components/MobileSidebar";

const font = Poppins({
  weight: "600",
  subsets: ["latin"],
});

const NavBar = () => {
  return (
    <div className="fixed w-full z-50 flex justify-between items-center py-2 px-4 border-b border-primary/10 bg-secondary h-16">
      <div className="flex items-center">
        <MobileSidebar />
        <Link href="/">
          <h1
            className={cn(
              "hidden md:block text-xl md:text-3xl font-bold text-primary",
              font.className
            )}
          >
            CompanionAI
          </h1>
        </Link>
      </div>
      <div className="flex items-center gap-x-3">
        <Button
          variant="premium"
          size="sm"
          className="flex items-center gap-x-1"
        >
          Upgrade
          <Sparkle className="size-4 fill-white text-white" />
        </Button>
        <ModeToggle />
        <UserButton />
      </div>
    </div>
  );
};

export default NavBar;
