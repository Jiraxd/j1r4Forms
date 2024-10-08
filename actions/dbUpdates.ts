"use server";

import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { JsonObject } from "@prisma/client/runtime/library";

export const updateFormName = async (id: string, name: string) => {
  await db.savedForm.update({
    where: {
      formid: id,
    },
    data: {
      name: name,
    },
  });
};

export const updateTitleDesc = async (
  id: string,
  type: string,
  text: string
) => {
  switch (type) {
    case "title":
      await db.savedForm.update({
        where: {
          formid: id,
        },
        data: {
          formtitle: text,
        },
      });
    case "desc":
      await db.savedForm.update({
        where: {
          formid: id,
        },
        data: {
          formdescription: text,
        },
      });
      break;
  }
};

export const fieldUpdateTitle = async (
  id: string,
  position: number,
  text: string
) => {
  await db.formField.update({
    where: {
      formid: id,
      fieldID: position,
    },
    data: {
      fieldTitle: text,
    },
  });
};

export const addNewField = async (id: string, position: number) => {
  const form = await db.savedForm.update({
    where: {
      formid: id,
    },
    data: {
      fields: {
        create: {
          fieldTitle: "Untitled Field",
          fieldAnswerType: 0,
          position: position,
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
                {
                  answerName: "First Collumn",
                  answerType: 5,
                  answerPos: 0,
                },
                {
                  answerName: "First Row",
                  answerType: 6,
                  answerPos: 0,
                },
              ],
            },
          },
        },
      },
    },
    include: {
      fields: {
        include: {
          Answers: true,
        },
      },
    },
  });
  return form;
};

export const UpdateFieldAnswerType = async (
  id: string,
  position: number,
  type: number,
  fieldid: number
) => {
  await db.savedForm.update({
    where: {
      formid: id,
    },
    data: {
      fields: {
        update: {
          where: {
            position: position,
            fieldID: fieldid,
          },
          data: {
            fieldAnswerType: type,
          },
        },
      },
    },
  });
};

export const UpdateAnswerTitle = async (
  id: string,
  fieldid: number,
  answerTitle: string,
  answerid: string
) => {
  await db.savedForm.update({
    where: {
      formid: id,
    },
    data: {
      fields: {
        update: {
          where: {
            fieldID: fieldid,
          },
          data: {
            Answers: {
              update: {
                where: {
                  answerID: answerid,
                },
                data: {
                  answerName: answerTitle,
                },
              },
            },
          },
        },
      },
    },
  });
};

export const addNewAnswer = async (
  id: string,
  position: number,
  fieldid: number,
  answerPosx: number,
  answerTypex: number
) => {
  const answer = await db.savedForm.update({
    where: {
      formid: id,
    },
    data: {
      fields: {
        update: {
          where: {
            fieldID: fieldid,
          },
          data: {
            Answers: {
              create: {
                answerName: "Untitled Option",
                answerType: answerTypex,
                answerPos: answerPosx,
              },
            },
          },
        },
      },
    },
    include: {
      fields: {
        include: {
          Answers: true,
        },
      },
    },
  });
  return answer.fields
    .find((f) => f.position === position)
    ?.Answers.filter((f) => f.answerType === answerTypex);
};

export const removeAnswer = async (
  id: string,
  fieldid: number,
  answerPos: number,
  answerID: string
) => {
  await db.savedForm.update({
    where: {
      formid: id,
    },
    data: {
      fields: {
        update: {
          where: {
            fieldID: fieldid,
          },
          data: {
            Answers: {
              delete: {
                answerID: answerID,
                answerPos: answerPos,
              },
            },
          },
        },
      },
    },
  });
};

export const updatePositionField = async (
  updatePos: number,
  fieldID: number,
  fieldIDReplace: number,
  replacePos: number,
  formid: string
) => {
  await db.savedForm.update({
    where: {
      formid: formid,
    },
    data: {
      fields: {
        update: {
          where: {
            fieldID: fieldID,
          },
          data: {
            position: updatePos,
          },
        },
      },
    },
  });
  await db.savedForm.update({
    where: {
      formid: formid,
    },
    data: {
      fields: {
        update: {
          where: {
            fieldID: fieldIDReplace,
          },
          data: {
            position: replacePos,
          },
        },
      },
    },
  });
};

export const AddFormAnswer = async (
  formidx: string,
  answerJSON: Prisma.JsonObject,
  userid: string
) => {
  await db.savedForm.update({
    where: {
      formid: formidx,
    },
    data: {
      answersfromusers: {
        create: {
          answer: answerJSON,
          useranswerid: userid,
        },
      },
    },
  });
};

export const GetAnswered = async (formid: string, userid: string) => {
  const count = await db.savedForm.count({
    where: {
      formid: formid,
      answersfromusers: {
        some: {
          useranswerid: userid,
        },
      },
    },
  });
  if (count === 0) return false;
  return true;
};
