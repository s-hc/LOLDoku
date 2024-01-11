-- CreateTable
CREATE TABLE "Schedule" (
    "id" SERIAL NOT NULL,
    "date" DATE NOT NULL,
    "row1" TEXT NOT NULL,
    "row2" TEXT NOT NULL,
    "row3" TEXT NOT NULL,
    "col1" TEXT NOT NULL,
    "col2" TEXT NOT NULL,
    "col3" TEXT NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);
