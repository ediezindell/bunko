import { PrismaClient } from '@prisma/client';

export const findAllNotifications = async () => {
  const userId = '1';
  const prisma = new PrismaClient();
  const notifications = await prisma.notifications.findMany({
    where: {
      userId,
    },
  });
  return notifications;
};
