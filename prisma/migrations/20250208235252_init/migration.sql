-- CreateTable
CREATE TABLE "Notifications" (
    "userId" TEXT NOT NULL,
    "isbn" TEXT NOT NULL,
    "title" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Notifications_userId_isbn_key" ON "Notifications"("userId", "isbn");
