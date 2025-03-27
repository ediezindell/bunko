'use server';

export const registerNotification = async (
  userId: string,
  isbn: string,
  title: string,
) => {
  console.log({
    userId,
    isbn,
    title,
  });
};
