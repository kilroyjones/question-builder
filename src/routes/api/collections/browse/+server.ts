import type { RequestHandler } from "./$types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST: RequestHandler = async ({ request }) => {
  let data = await request.json();

  let collections = await prisma.collection.findMany({
    where: {
      userId: data.userId,
    },
    include: {
      tags: true,
      _count: {
        select: { questions: true },
      },
    },
  });
  console.log(collections);

  return new Response(JSON.stringify(collections));
};
