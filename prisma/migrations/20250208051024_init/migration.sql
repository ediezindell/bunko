-- CreateTable
CREATE TABLE "Books" (
    "isbn" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "publisherName" TEXT NOT NULL,
    "isBunko" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "Mappings" (
    "originalIsbn" TEXT NOT NULL,
    "bunkoIsbn" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Notifications" (
    "userId" TEXT NOT NULL,
    "isbn" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "onPreOrder" BOOLEAN NOT NULL,
    "onSale" BOOLEAN NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Books_isbn_key" ON "Books"("isbn");

-- CreateIndex
CREATE UNIQUE INDEX "Mappings_originalIsbn_key" ON "Mappings"("originalIsbn");

-- CreateIndex
CREATE UNIQUE INDEX "Notifications_userId_isbn_key" ON "Notifications"("userId", "isbn");
