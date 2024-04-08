"use server";

import {db} from "@/lib/db";
import cuid from 'cuid';

export const createFormServer = async(id:string) => { 
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
              Answers:{
                create:{
                  answerName: "Untitled Answer",
                  answerType: 0,
                  answerPos: 0
                }
              }
            },
          },
        },
      });
      return newFormId;
}