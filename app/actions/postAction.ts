"use server"

import { z } from "zod";
import { formSchema } from "../post/create/page";
import prisma from "../../lib/prismaCliant";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const post = async ({
    category,
    username,
    title,
    information,
    photoUrl,
    content,
}: z.infer<typeof formSchema>) => {
    await prisma.post.create({
        data: {
            category,
            username,
            title,
            information,
            photoUrl,
            content,
        },
    });

    revalidatePath("/");
    redirect("/");
};