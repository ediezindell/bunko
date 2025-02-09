'use server';
import { PrismaClient } from '@prisma/client';

export const registerNotification = async (
  userId: string,
  isbn: string,
  title: string,
) => {
  const prisma = new PrismaClient();
  await prisma.notifications.upsert({
    where: {
      userId_isbn: {
        userId,
        isbn,
      },
    },
    create: {
      userId,
      isbn,
      title,
    },
    update: {
      title,
    },
  });
};
