import { NextResponse } from "next/server";
import prisma from "../../../lib/prismaCliant"

export async function GET(req: Request) {
    const allPosts = await prisma.post.findMany();
    return NextResponse.json(allPosts)
}