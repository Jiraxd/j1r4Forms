-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "password" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedForm" (
    "formid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "authorID" TEXT NOT NULL,

    CONSTRAINT "SavedForm_pkey" PRIMARY KEY ("formid")
);

-- CreateTable
CREATE TABLE "FormField" (
    "fieldID" SERIAL NOT NULL,
    "fieldTitle" TEXT NOT NULL,
    "fieldAnswerType" INTEGER NOT NULL,
    "formid" TEXT NOT NULL,
    "savedFormFormid" TEXT,

    CONSTRAINT "FormField_pkey" PRIMARY KEY ("fieldID")
);

-- CreateTable
CREATE TABLE "FormAnswer" (
    "id" TEXT NOT NULL,
    "fieldid" INTEGER NOT NULL,
    "answerType" INTEGER NOT NULL,
    "answerName" TEXT NOT NULL,

    CONSTRAINT "FormAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAnswered" (
    "id" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "formid" TEXT NOT NULL,

    CONSTRAINT "UserAnswered_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnswersUserForm" (
    "id" TEXT NOT NULL,
    "answerIndex" INTEGER NOT NULL,
    "answer" TEXT NOT NULL,
    "userid" TEXT NOT NULL,

    CONSTRAINT "AnswersUserForm_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "SavedForm_authorID_key" ON "SavedForm"("authorID");

-- CreateIndex
CREATE UNIQUE INDEX "UserAnswered_userID_key" ON "UserAnswered"("userID");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormField" ADD CONSTRAINT "FormField_savedFormFormid_fkey" FOREIGN KEY ("savedFormFormid") REFERENCES "SavedForm"("formid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormAnswer" ADD CONSTRAINT "FormAnswer_fieldid_fkey" FOREIGN KEY ("fieldid") REFERENCES "FormField"("fieldID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAnswered" ADD CONSTRAINT "UserAnswered_formid_fkey" FOREIGN KEY ("formid") REFERENCES "SavedForm"("formid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnswersUserForm" ADD CONSTRAINT "AnswersUserForm_userid_fkey" FOREIGN KEY ("userid") REFERENCES "UserAnswered"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;
