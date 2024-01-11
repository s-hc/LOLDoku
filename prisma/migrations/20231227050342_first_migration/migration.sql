-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Champion" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" JSONB NOT NULL,
    "faction" TEXT NOT NULL,
    "tag1Id" INTEGER NOT NULL,
    "tag2Id" INTEGER NOT NULL,

    CONSTRAINT "Champion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "tag" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Champion_id_key" ON "Champion"("id");

-- AddForeignKey
ALTER TABLE "Champion" ADD CONSTRAINT "Champion_tag1Id_fkey" FOREIGN KEY ("tag1Id") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Champion" ADD CONSTRAINT "Champion_tag2Id_fkey" FOREIGN KEY ("tag2Id") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
