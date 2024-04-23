"use server";

import { db } from "@/lib/db";

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
            create: {
              answerName: "Untitled Answer",
              answerType: 0,
              answerPos: 0,
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
  answerPos: number,
  answerType: number
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
                answerType: answerType,
                answerPos: answerPos,
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
    ?.Answers.filter((f) => f.answerType === answerType);
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
