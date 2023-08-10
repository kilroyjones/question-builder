import type { QuestionStatus } from "$lib/models";
import type { MultipleChoiceQuestion, MultipleChoiceAnswer } from "@prisma/client";

export async function getCollections(userId: string) {
  return await fetch("http://localhost:5173/api/collections/browse", {
    method: "POST",
    body: JSON.stringify({
      userId: userId,
    }),
    headers: {
      "content-type": "application/json",
    },
  });
}

export async function getQuestion(
  userId: string,
  questionStatus: QuestionStatus,
  collectionId: number
) {
  return await fetch("http://localhost:5173/api/question/get", {
    method: "POST",
    body: JSON.stringify({
      userId: userId,
      questionStatus: questionStatus,
      collectionId: collectionId,
    }),
    headers: {
      "content-type": "application/json",
    },
  });
}

export async function deleteQuestions(
  questions: Array<MultipleChoiceQuestion & { answers: MultipleChoiceAnswer[] }>
) {
  // TODO: Handle errors
  let ids = questions.map(question => question.id);
  return await fetch("http://localhost:5173/api/question/delete", {
    method: "DELETE",
    body: JSON.stringify({
      ids: ids,
      collectionId: questions[0].collectionId,
    }),
    headers: {
      "content-type": "application/json",
    },
  });
}

export async function updateQuestion(
  question: MultipleChoiceQuestion & { answers: MultipleChoiceAnswer[] }
) {
  let resp = await fetch("http://localhost:5173/api/question/update", {
    method: "POST",
    body: JSON.stringify(question),
    headers: {
      "content-type": "application/json",
    },
  });
}

export async function approveQuestion(
  question: MultipleChoiceQuestion & { answers: MultipleChoiceAnswer[] }
) {
  return await fetch("http://localhost:5173/api/question/approve", {
    method: "POST",
    body: JSON.stringify(question),
    headers: {
      "content-type": "application/json",
    },
  });
}