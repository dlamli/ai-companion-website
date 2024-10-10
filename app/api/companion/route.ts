import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { prismaDB } from "@/lib";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const user = await currentUser();

    const { src, name, description, instructions, seed, categoryId } = body;

    if (!user || !user.id || !user.firstName) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (
      !src ||
      !name ||
      !description ||
      !instructions ||
      !seed ||
      !categoryId
    ) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    const companion = await prismaDB.companion.create({
      data: {
        categoryId,
        userId: user.id,
        userName: user.firstName,
        src,
        name,
        description,
        instructions,
        seed,
      },
    });

    return NextResponse.json(companion);
  } catch (error) {
    console.log(`Companion POST - Error: ${error}`);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
