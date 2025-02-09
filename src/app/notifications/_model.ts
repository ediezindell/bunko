import { PrismaClient } from '@prisma/client';

export const findAllNotifications = async (userId: string) => {
  const prisma = new PrismaClient();
  const notifications = await prisma.notifications.findMany({
    where: {
      userId,
    },
  });
  return notifications;
};
