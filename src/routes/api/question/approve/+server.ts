import type { RequestHandler } from "./$types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST: RequestHandler = async ({ request }) => {
  let req = await request.json();
  console.log("--------------");
  let question = await prisma.multipleChoiceQuestion.update({
    where: {
      id: req.id,
    },
    data: {
      isApproved: true,
    },
  });

  if (question) {
    return new Response(JSON.stringify({ status: "success" }));
  }
  return new Response(JSON.stringify({ status: "failed" }));
};