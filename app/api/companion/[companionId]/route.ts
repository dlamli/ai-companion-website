import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { prismaDB } from "@/lib";

export const PATCH = async (
  req: Request,
  { params }: { companionId: string }
) => {
  try {
    const body = await req.json();
    const user = await currentUser();

    const { src, name, description, instructions, seed, categoryId } = body;

    if (!params.companionId) {
      return new NextResponse("Companion ID is required", { status: 400 });
    }

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

    const companion = await prismaDB.companion.update({
      where: {
        id: params.companionId,
      },
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

export const DELETE = async (
  req: Request,
  { params }: { companionId: string }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const companion = await prismaDB.companion.delete({
      where: {
        userId,
        id: params.companionId,
      },
    });

    return NextResponse.json(companion);
  } catch (error) {
    console.log(`Companion DELETE - Error: ${error}`);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
