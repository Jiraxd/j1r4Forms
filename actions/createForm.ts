"use server";

import { db } from "@/lib/db";
import cuid from "cuid";

export const createFormServer = async (id: string) => {
  const newFormId = cuid();
  await db.savedForm.create({
    data: {
      authorID: id,
      name: "Untitled Form",
      formid: newFormId,
      formtitle: "Form Title",
      formdescription: "This is your form!",
      fields: {
        create: {
          fieldTitle: "Untitled Field",
          fieldAnswerType: 0,
          position: 0,
          Answers: {
            createMany: {
              data: [
                {
                  answerName: "Untitled Answer 1",
                  answerType: 0,
                  answerPos: 0,
                },
                {
                  answerName: "Minimum",
                  answerType: 1,
                  answerPos: 0,
                },
                {
                  answerName: "Maximum",
                  answerType: 2,
                  answerPos: 0,
                },
                {
                  answerName: "1",
                  answerType: 3,
                  answerPos: 0,
                },
                {
                  answerName: "5",
                  answerType: 4,
                  answerPos: 0,
                },
              ],
            },
          },
        },
      },
    },
  });
  return newFormId;
};
